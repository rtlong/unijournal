import {
  AUTH_RECEIVE_CREDENTIALS,
  AUTH_RECEIVE_USER_INFO,
  LOGOUT,
  MESSAGES_ADD,
  MESSAGES_DEL,
  NEW_POST_FORM_EXPAND,
  NEW_POST_FORM_SOURCE_CHANGED,
  POSTS_ADD,
  POSTS_RECEIVE,
  POSTS_REQUEST,
  POSTS_UPDATE,
  REPO_SET_STATE,
} from "./action_types"

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
export const addMessage = buildActionFactory(MESSAGES_ADD, (id, type, message) => ({
  id,
  type,
  message,
}))
export const requestPosts = buildActionFactory(POSTS_REQUEST)
export const receivePosts = buildActionFactory(POSTS_RECEIVE)
export const addPost = buildActionFactory(POSTS_ADD)
export const updatePost = buildActionFactory(POSTS_UPDATE, (id, post) => ({
  id,
  post,
}))
export const authReceiveCredentials = buildActionFactory(AUTH_RECEIVE_CREDENTIALS)
export const authReceiveUserInfo = buildActionFactory(AUTH_RECEIVE_USER_INFO)
export const logOut = buildActionFactory(LOGOUT)
export const repoSetState = buildActionFactory(REPO_SET_STATE)

// More complex actions (what are these?? they're dispatchable thanks to redux-thunk but they're not themselves actions)
