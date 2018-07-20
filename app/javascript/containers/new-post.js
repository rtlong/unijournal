import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { createPost, newPostFormClose, newPostFormOpen, newPostSourceChanged } from "../actions"
import NewPost from "../components/new-post"

function mapStateToProps(state) {
  return state.newPostForm
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onOpen: newPostFormOpen,
      onCancel: newPostFormClose,
      onSubmit: createPost,
      onChange: newPostSourceChanged,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPost)
