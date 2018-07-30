import { combineReducers } from "redux"

import postsReducer from "./reducer/posts"
import messagesReducer from "./reducer/messages"
import newPostFormReducer from "./reducer/new_post_form"
import repoReducer from "./reducer/repo"
import authReducer from "./reducer/auth"

export default combineReducers({
  messages: messagesReducer,
  posts: postsReducer,
  newPostForm: newPostFormReducer,
  repo: repoReducer,
  auth: authReducer,
})
