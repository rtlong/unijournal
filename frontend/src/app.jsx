import React from "react"
import { hot } from "react-hot-loader"

import Messages from "./containers/messages"
import Journal from "./containers/journal"
import Header from "./containers/header"

const App = () => (
  <div>
    <Header />
    <Messages />
    <Journal />
  </div>
)

export default hot(module)(App)
