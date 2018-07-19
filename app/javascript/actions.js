import fetch from 'cross-fetch'

import { csrfToken } from './rails'
import * as Posts from './entities/posts'

const ACTIONS = {
  ADD_POST: 'POSTS_ADD',
};
[
  'MESSAGES_ADD',
  'MESSAGES_DEL',
  'POSTS_ADD',
  'POSTS_UPDATE',
  'POSTS_REQUEST',
  'POSTS_RECEIVE',
  'NEW_POST_FORM_EXPAND',
  'NEW_POST_SOURCE_CHANGED',
].forEach(sym => { ACTIONS[sym] = sym })

export default ACTIONS


export function newPostFormOpen() {
  return {
    type: ACTIONS.NEW_POST_FORM_EXPAND,
    payload: true,
  }
}

export function newPostFormClose() {
  return {
    type: ACTIONS.NEW_POST_FORM_EXPAND,
    payload: false,
  }
}

export function newPostSourceChanged(payload) {
  return {
    type: ACTIONS.NEW_POST_SOURCE_CHANGED,
    payload,
  }
}

function postJSON(url, data) {
  // Default options are marked with *
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-CSRF-Token': csrfToken(),
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match 'Content-Type' header
  })
}

export function showMessage(message, type = 'info', timeout = 10000) {
  return dispatch => {
    const id = new Date().getTime()

    dispatch({
      type: ACTIONS.MESSAGES_ADD,
      payload: {
        id,
        type,
        message,
      },
    })

    if (timeout) {
      setTimeout(() => dispatch({
        type: ACTIONS.MESSAGES_DEL,
        payload: {
          id,
        },
      }), timeout)
    }
  }
}

export function showError(err, timeout = 10000) {
  return showMessage(err, 'error', timeout)
}

export function requestPosts() {
  return {
    type: ACTIONS.POSTS_REQUEST,
  }
}

export function receivePosts(json) {
  return {
    type: ACTIONS.POSTS_RECEIVE,
    payload: json,
  }
}

export function addPost(post) {
  return {
    type: ACTIONS.POSTS_ADD,
    payload: post,
  }
}

export function updatePost(id, post) {
  return {
    type: ACTIONS.POSTS_UPDATE,
    payload: {
      id,
      post,
    },
  }
}

export function fetchPosts() {
  return async dispatch => {
    const response = await fetch('/posts', { method: 'GET' })
    const json = await response.json()
    dispatch(receivePosts(json))
  }
}

export function createPost() {
  return async (dispatch, getState) => {
    const postBody = getState().newPostForm.source
    if (!postBody) return

    try {
      const response = await postJSON('/posts', {
        body: postBody,
      })
      if (!response.ok) {
        dispatch(showError('Error during POST /posts'))
        return
      }
      const json = await response.json()
      dispatch(addPost(Posts.deserialize(json)))
    } catch (err) {
      dispatch(showError(`Error during POST /posts: ${err}`))
    }
  }
}
