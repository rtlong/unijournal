import * as Posts from "../entities/posts"
import { POSTS_ADD, POSTS_RECEIVE } from "../action_types"

function postsReducer(state = Posts.empty, { type, payload }) {
  switch (type) {
    case POSTS_ADD:
      return Posts.add(state, payload)
    case POSTS_RECEIVE:
      return Posts.load(payload)
    default:
      return state
  }
}

export default postsReducer
