import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

const Post = ({ body, timestamp }) => (
  <div className="Post">
    <Markdown>{body}</Markdown>
    <div>{timestamp.toString()}</div>
  </div>
)

Post.propTypes = {
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date).isRequired,
}

export default Post
