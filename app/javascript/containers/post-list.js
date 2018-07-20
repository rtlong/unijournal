import { connect } from "react-redux"

import PostList from "../components/post-list"
import * as Posts from "../entities/posts"

function mapStateToProps(state) {
  return {
    posts: Posts.all(state.posts),
  }
}

export default connect(mapStateToProps)(PostList)
