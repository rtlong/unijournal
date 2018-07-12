import React from 'react'
import { connect } from 'react-redux'

import {
  addPost,
  newPostFormSetExpanded,
  newPostSourceChanged,
} from '../actions'
import NewPost from '../components/new-post'

const mapStateToProps = (state) => {
  return {
    expanded: state.newPostFormExpanded,
    source: state.newPostSource,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOpen: () => dispatch(newPostFormSetExpanded(true)),
    onCancel: () => dispatch(newPostFormSetExpanded(false)),
    onSubmit: () => dispatch(addPost()),
    onChange: body => dispatch(newPostSourceChanged(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
