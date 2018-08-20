import { connect } from "react-redux"

import PostList from "../components/post-list"
import * as Posts from "../entities/posts"
import { deletePost } from "../action-thunks/posts"

function mapStateToProps(state) {
  return {
    posts: Posts.all(state.posts),
  }
}

export default connect(
  mapStateToProps,
  {
    deletePost,
  },
)(PostList)
