import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

import PostList from "./post-list"
import NewPost from "./new-post"

const Journal = ({ unlocked }) =>
  unlocked ? (
    <React.Fragment>
      <NewPost />
      <PostList />
    </React.Fragment>
  ) : (
    ""
  )

Journal.propTypes = {
  unlocked: PropTypes.bool.isRequired,
}

export default connect(state => ({ unlocked: !state.repo.locked }))(Journal)
