import fetch from "cross-fetch"
import uuid from "uuid/v4"
import Cookie from "js-cookie"

import Storage from "./storage"
import {
  NEW_POST_FORM_EXPAND,
  NEW_POST_FORM_SOURCE_CHANGED,
  MESSAGES_ADD,
  MESSAGES_DEL,
  POSTS_ADD,
  POSTS_REQUEST,
  POSTS_RECEIVE,
  POSTS_UPDATE,
  AUTH_RECEIVE_CREDENTIALS,
  AUTH_RECEIVE_USER_INFO,
} from "./action_types"
import postJSON from "./util/post_json"

function logMessage({ type, message }) {
  /* eslint-disable no-console */
  switch (type) {
    case "error":
      console.error(message)
      break
    case "debug":
      console.debug(message)
      break
    case "info":
      console.info(message)
      break
    default:
      console.log(message)
  }
}

function buildActionFactory(type, payloadFunc = p => p) {
  return (...args) => ({
    type,
    payload: payloadFunc(...args),
  })
}

// Action Factories
export const newPostFormOpen = buildActionFactory(NEW_POST_FORM_EXPAND, () => true)
export const newPostFormClose = buildActionFactory(NEW_POST_FORM_EXPAND, () => false)
export const newPostSourceChanged = buildActionFactory(NEW_POST_FORM_SOURCE_CHANGED)
export const deleteMessage = buildActionFactory(MESSAGES_DEL, id => ({ id }))
export const addMessage = buildActionFactory(MESSAGES_ADD, (id, type, message) => {
  const payload = { id, type, message }
  logMessage(payload)
  return payload
})
export const requestPosts = buildActionFactory(POSTS_REQUEST)
export const receivePosts = buildActionFactory(POSTS_RECEIVE)
export const addPost = buildActionFactory(POSTS_ADD)
export const updatePost = buildActionFactory(POSTS_UPDATE, (id, post) => ({ id, post }))
export const authReceiveCredentials = buildActionFactory(AUTH_RECEIVE_CREDENTIALS)
export const authReceiveUserInfo = buildActionFactory(AUTH_RECEIVE_USER_INFO)

// More complex actions (what are these?? they're dispatchable thanks to redux-thunk but they're not themselves actions)
export function showMessage(message, type = "info", timeout = 10000) {
  return dispatch => {
    const id = new Date().getTime()

    dispatch(addMessage(id, type, message))

    if (timeout) {
      setTimeout(() => dispatch(deleteMessage(id)), timeout)
    }
  }
}

export function showError(err, timeout = 10000) {
  return showMessage(err, "error", timeout)
}

export function createPost() {
  return async (dispatch, getState) => {
    const postBody = getState().newPostForm.source
    if (!postBody) return

    try {
      const {
        repo: { dir },
      } = getState()
      const storage = new Storage({ dir })
      const id = uuid()
      const post = await storage.storePost({
        id,
        body: postBody,
      })
      dispatch(addPost(post))
      dispatch(showMessage("New post saved"))
    } catch (err) {
      dispatch(showError(`Error saving post: ${err}`))
    }
  }
}

export function loadLocalStorage() {
  return async (dispatch, getState) => {
    dispatch(showMessage("Loading local data"))

    try {
      const {
        repo: { dir },
      } = getState()
      const storage = new Storage({ dir })
      await storage.prepare()
      await storage.loadPosts(post => {
        dispatch(addPost(post))
      })
    } catch (err) {
      dispatch(showError(`loadLocalStorage: ${err}`))
    }
  }
}

export function authReturn({ token }) {
  return async (dispatch, getState) => {
    dispatch(showMessage(`Auth: Success. Token = ${token}`))
    dispatch(
      authReceiveCredentials({
        provider: "gitlab",
        token,
      }),
    )

    try {
      // This endpoint doesn't support CORS :-(
      // const tokenInfo = await gitlabRequest({ path: `/oauth/token/info?access_token=${token}` })

      const userInfo = await gitlabAPIRequest({ path: "user", token })
      dispatch(authReceiveUserInfo(userInfo))
    } catch (e) {
      dispatch(authFailed(e))
    }
  }
}

export function authFailed(err) {
  return async (dispatch, getState) => {
    dispatch(showError(`Failed getting userInfo from Gitlab: ${err}`))
    Cookie.remove("gitlab_token")
    dispatch(authReceiveCredentials({}))
  }
}

export async function gitlabRequest({ path, headers = {}, method = "GET", body, config = {} }) {
  const url = new URL(path, "https://gitlab.com/")
  config = {
    ...config,
    method,
    headers,
  }
  if (method !== "GET" && body) {
    config.body = JSON.stringify(body)
  }
  const response = await fetch(url, config)
  if (!response.ok) {
    throw new Error("response unsuccessful")
  }
  return response.json()
}

export async function gitlabAPIRequest({ path, method = "GET", token, body }) {
  const url = `/api/v4/${path}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  return gitlabRequest({
    path: url,
    headers,
    method,
    body,
  })
}

export function authRequest() {
  const gitlabAppId = "4c908e2756054d83de294e38ad15bd59207e4a9806188dcddd1f68db93e34bf0"
  window.location.assign(
    `https://gitlab.com/oauth/authorize?client_id=${gitlabAppId}&response_type=token&redirect_uri=http://localhost:3001`,
  )
}
