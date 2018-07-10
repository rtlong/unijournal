import React from 'react'
import PropTypes from 'prop-types'
import Post from './post'

const PostList = props => (
  <div>
    {props.posts.map((post, id) =>
                     <Post key={id} {...post} />
                    )}
  </div>
)

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}

export default PostList