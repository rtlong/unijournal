import { combineReducers } from "redux"

import postsReducer from "./reducer/posts"
import messagesReducer from "./reducer/messages"
import newPostFormReducer from "./reducer/new_post_form"
import repoReducer from "./reducer/repo"

export default combineReducers({
  messages: messagesReducer,
  posts: postsReducer,
  newPostForm: newPostFormReducer,
  repo: repoReducer,
})
