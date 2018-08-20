import React from "react"
import PropTypes from "prop-types"
import Post from "./post"

const sort = posts => posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

const PostList = ({ posts, deletePost }) => (
  <div>
    {sort(posts).map(post => <Post key={post.id} {...post} onDelete={() => deletePost(post)} />)}
  </div>
)

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}

export default PostList
