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

export function deleteMessage(id) {
  return {
    type: MESSAGES_DEL,
    payload: {
      id,
    },
  }
}

export function addMessage(id, type, message) {
  return {
    type: MESSAGES_ADD,
    payload: {
      id,
      type,
      message,
    },
  }
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

export function fetchPosts() {
  return async dispatch => {
    try {
      const response = await fetch(`${global.apiEndpoint}/posts`, { method: "GET" })
      if (!response.ok) {
        dispatch(showError("Error loading posts"))
        return
      }
      const json = await response.json()
      dispatch(receivePosts(json))
    } catch (err) {
      dispatch(showError(`Error loading posts: ${err}`))
    }
  }
}

export function createPost() {
  return async (dispatch, getState) => {
    const postBody = getState().newPostForm.source
    if (!postBody) return

    try {
      const response = await postJSON(`${global.apiEndpoint}/posts`, {
        body: postBody,
      })
      if (!response.ok) {
        dispatch(showError("Error during POST /posts"))
        return
      }
      const json = await response.json()
      dispatch(addPost(Posts.deserialize(json)))
      dispatch(showMessage("New post saved"))
    } catch (err) {
      dispatch(showError(`Error during POST /posts: ${err}`))
    }
  }
}