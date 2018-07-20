import React from "react"
import PropTypes from "prop-types"
import Post from "./post"

const PostList = ({ posts }) => <div>{posts.map(post => <Post key={post.id} {...post} />)}</div>

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}

export default PostList
