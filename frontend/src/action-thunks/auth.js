import fetch from "cross-fetch"
import Cookie from "js-cookie"

import { showMessage, showError } from "./messages"
import { authReceiveCredentials, authReceiveUserInfo, logOut } from "../actions"
import { openDB } from "./repo"

async function gitlabRequest({ path, headers = {}, method = "GET", body, config = {} }) {
  const url = new URL(path, "https://gitlab.com/")
  const _config = {
    ...config,
    method,
    headers,
  }
  if (method !== "GET" && body) {
    _config.body = JSON.stringify(body)
  }
  const response = await fetch(url, _config)
  if (!response.ok) {
    throw new Error("response unsuccessful")
  }
  return response.json()
}

async function gitlabAPIRequest({ path, method = "GET", token, body }) {
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

export function authFailed(err) {
  return async dispatch => {
    dispatch(showError(`Failed getting userInfo from Gitlab: ${err}`))
    Cookie.remove("gitlab_token")
    dispatch(logOut())
  }
}

export function authReturn({ token }) {
  return async dispatch => {
    dispatch(showMessage(`logged in`))
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
      dispatch(openDB())
    } catch (e) {
      dispatch(authFailed(e))
      throw e
    }
  }
}

export function authLogOut() {
  return async dispatch => {
    Cookie.remove("gitlab_token")
    dispatch(logOut())
    dispatch(showMessage(`Logged out`))
    window.location.reload()
  }
}

export function authLogIn() {
  const gitlabAppId = "4c908e2756054d83de294e38ad15bd59207e4a9806188dcddd1f68db93e34bf0"
  window.location.assign(
    `https://gitlab.com/oauth/authorize?client_id=${gitlabAppId}&response_type=token&redirect_uri=http://localhost:3001`,
  )
}

function parseAuthHash(hash) {
  return hash
    .slice(1)
    .split("&")
    .reduce((obj, part) => {
      const [key, value] = part.split("=", 2)
      obj[key] = value
      return obj
    }, {})
}

function getAuthFromURL(dispatch) {
  if (!window.location.hash) return false

  const hash = parseAuthHash(window.location.hash)
  const { token_type: type, access_token: token, state } = hash

  if (!token) {
    return false
  } // proceed only if we have token

  window.location.hash = "" // clear token out of hash

  console.log({ parsed_hash: { token, state, type } })

  if (type !== "bearer") {
    dispatch(showError("Auth: Invalid. Not bearer"))
    return false
  }

  Cookie.set("gitlab_token", token)

  dispatch(
    authReturn({
      token: hash.access_token,
    }),
  )
  return true
}

function getAuthFromCookie(dispatch) {
  const token = Cookie.get("gitlab_token")
  if (!token) return false
  dispatch(
    authReturn({
      token,
    }),
  )
  return true
}

export function loadAuthFromEnvironment() {
  return async dispatch => {
    getAuthFromCookie(dispatch) || getAuthFromURL(dispatch)
  }
}
