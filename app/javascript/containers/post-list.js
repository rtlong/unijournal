import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PostList from '../components/post-list'

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  }
}

export default connect(mapStateToProps)(PostList)
