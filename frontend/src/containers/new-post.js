import { connect } from "react-redux"

import { newPostFormClose, newPostFormOpen, newPostSourceChanged } from "../actions"
import { createPost } from "../action-thunks/posts"
import NewPost from "../components/new-post"

function mapStateToProps(state) {
  return state.newPostForm
}

export default connect(
  mapStateToProps,
  {
    onOpen: newPostFormOpen,
    onCancel: newPostFormClose,
    onSubmit: createPost,
    onChange: newPostSourceChanged,
  },
)(NewPost)
