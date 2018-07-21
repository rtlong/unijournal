import fetch from "cross-fetch"

import postJSON from "./util/post_json"
import * as Posts from "./entities/posts"
import {
  NEW_POST_FORM_EXPAND,
  NEW_POST_FORM_SOURCE_CHANGED,
  MESSAGES_ADD,
  MESSAGES_DEL,
  POSTS_ADD,
  POSTS_REQUEST,
  POSTS_RECEIVE,
  POSTS_UPDATE,
} from "./action_types"

export function newPostFormOpen() {
  return {
    type: NEW_POST_FORM_EXPAND,
    payload: true,
  }
}

export function newPostFormClose() {
  return {
    type: NEW_POST_FORM_EXPAND,
    payload: false,
  }
}

export function newPostSourceChanged(payload) {
  return {
    type: NEW_POST_FORM_SOURCE_CHANGED,
    payload,
  }
}

export function showMessage(message, type = "info", timeout = 10000) {
  return dispatch => {
    const id = new Date().getTime()

    dispatch({
      type: MESSAGES_ADD,
      payload: {
        id,
        type,
        message,
      },
    })

    if (timeout) {
      const deleteMessage = () =>
        dispatch({
          type: MESSAGES_DEL,
          payload: {
            id,
          },
        })
      setTimeout(deleteMessage, timeout)
    }
  }
}

export function showError(err, timeout = 10000) {
  return showMessage(err, "error", timeout)
}

export function requestPosts() {
  return {
    type: POSTS_REQUEST,
  }
}

export function receivePosts(json) {
  return {
    type: POSTS_RECEIVE,
    payload: json,
  }
}

export function addPost(post) {
  return {
    type: POSTS_ADD,
    payload: post,
  }
}

export function updatePost(id, post) {
  return {
    type: POSTS_UPDATE,
    payload: {
      id,
      post,
    },
  }
}

export function fetchPosts() {
  return async dispatch => {
    const response = await fetch("/posts", { method: "GET" })
    const json = await response.json()
    dispatch(receivePosts(json))
  }
}

export function createPost() {
  return async (dispatch, getState) => {
    const postBody = getState().newPostForm.source
    if (!postBody) return

    try {
      const response = await postJSON("/posts", {
        body: postBody,
      })
      if (!response.ok) {
        dispatch(showError("Error during POST /posts"))
        return
      }
      const json = await response.json()
      dispatch(addPost(Posts.deserialize(json)))
    } catch (err) {
      dispatch(showError(`Error during POST /posts: ${err}`))
    }
  }
}
