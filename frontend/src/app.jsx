import React from "react"
import { hot } from "react-hot-loader"

import PostList from "./containers/post-list"
import NewPost from "./containers/new-post"
import Messages from "./containers/messages"
import Header from "./containers/header"

const App = () => (
  <div>
    <Header />
    <Messages />
    <NewPost />
    <PostList />
  </div>
)

export default hot(module)(App)
