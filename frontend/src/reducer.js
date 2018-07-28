import { combineReducers } from "redux"

import postsReducer from "./reducer/posts"
import messagesReducer from "./reducer/messages"
import newPostFormReducer from "./reducer/new_post_form"

export default combineReducers({
  messages: messagesReducer,
  posts: postsReducer,
  newPostForm: newPostFormReducer,
})
