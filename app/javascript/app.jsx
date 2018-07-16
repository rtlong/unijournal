import React from 'react'

import PostList from './containers/post-list'
import NewPost from './containers/new-post'

const App = () => (
  <div>
    <h1>
      Journal
    </h1>
    <NewPost />
    <PostList />
  </div>
)

export default App
