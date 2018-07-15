import React from 'react'
import PropTypes from 'prop-types'

import PostList from './containers/post-list'
import NewPost from './containers/new-post'

const App = props => (
  <div>
    <h1>
      Journal
    </h1>
    <NewPost />
    <PostList />
  </div>
)

export default App
