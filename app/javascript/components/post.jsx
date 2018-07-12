import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

import Timestamp from './timestamp'

const style = {
  borderTop: '1px solid black',
  margin: '1em 0 1em 0',
  padding: '1em 0 0 0',
}

const Post = ({ body, timestamp }) => (
  <div className="post" style={style}>
    <Markdown source={body} />
    <Timestamp timestamp={timestamp}/>
  </div>
)

Post.propTypes = {
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date).isRequired,
}

export default Post
