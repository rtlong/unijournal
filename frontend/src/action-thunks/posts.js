import uuid from "uuid/v4"

import { receivePosts, addPost } from "../actions"
import { showMessage, showError } from "./messages"

export function loadLocalStorage() {
  return async (dispatch, getState) => {
    try {
      const {
        repo: { storage, locked },
      } = getState()

      if (locked || !storage) {
        dispatch(receivePosts([]))
        return
      }

      const posts = await storage.loadPosts()
      dispatch(receivePosts(posts))
    } catch (err) {
      dispatch(showError(`loadLocalStorage: ${err}`))
    }
  }
}

function parseTags(str) {
  const pattern = /#(\S+)/g
  let match = pattern.exec(str)
  const tags = []
  while (match !== null) {
    tags.push(match[1])
    match = pattern.exec(str)
  }
  return tags
}

export function createPost() {
  return async (dispatch, getState) => {
    const {
      newPostForm: { source: postBody },
      repo: { storage },
    } = getState()
    if (!postBody) return

    try {
      const post = {
        id: uuid(),
        body: postBody,
        timestamp: new Date(),
        tags: parseTags(postBody),
      }
      dispatch(addPost({ ...post, pending: true }))

      await storage.storePost(post)
      dispatch(showMessage("New post saved"))

      const posts = await storage.loadPosts()
      dispatch(receivePosts(posts))
    } catch (err) {
      dispatch(showError(`Error saving post: ${err}`))
    }
  }
}

export function deletePost(post) {
  return async (dispatch, getState) => {
    try {
      const {
        repo: { storage },
      } = getState()

      await storage.deletePost(post)
      dispatch(showMessage("Post Deleted"))

      const posts = await storage.loadPosts()
      dispatch(receivePosts(posts))
    } catch (err) {
      dispatch(showError(`Error deleting post: ${err}`))
    }
  }
}
