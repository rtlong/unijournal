import React from "react"
import { hot } from "react-hot-loader"

import PostList from "./containers/post-list"
import NewPost from "./containers/new-post"
import Messages from "./containers/messages"

const App = () => (
  <div>
    <h1>Journal</h1>
    <Messages />
    <NewPost />
    <PostList />
  </div>
)

export default hot(module)(App)
