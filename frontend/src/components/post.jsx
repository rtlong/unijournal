import React from "react"
import PropTypes from "prop-types"
import Markdown from "react-markdown"

import Timestamp from "./timestamp"
import Button from "./button"

const style = {
  borderTop: "1px solid black",
  margin: "1em 0 1em 0",
  padding: "1em 0 0 0",
}

const Post = ({ body, timestamp, tags, pending, onDelete }) => (
  <div className="post" style={style}>
    <Markdown source={body} />
    <Timestamp timestamp={timestamp} />
    <div>
      <div>{pending ? "Saving..." : ""}</div>
      <div>tags: {JSON.stringify(tags)}</div>
      <Button onClick={onDelete} label="Delete" />
    </div>
  </div>
)

Post.propTypes = {
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date).isRequired,
  tags: PropTypes.arrayOf(String).isRequired,
  pending: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
}
Post.defaultProps = {
  pending: false,
}

export default Post
