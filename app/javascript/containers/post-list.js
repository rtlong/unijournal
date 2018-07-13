import React from 'react'
import { connect } from 'react-redux'

import PostList from '../components/post-list'

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  }
}

export default connect(mapStateToProps)(PostList)
