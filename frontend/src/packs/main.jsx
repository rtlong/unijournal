import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import createStore from "../store"
import App from "../app"
import * as actions from "../actions"

const store = createStore()

global.actions = actions
global.store = store

const mountApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app"),
  )
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp)
} else {
  mountApp()
}

/* global BrowserFS */
BrowserFS.configure(
  {
    fs: "IndexedDB",
    options: {},
  },
  err => {
    if (err) {
      store.dispatch(
        actions.showError(
          `Error configuring BrowserFS for indexedDB: ${err}. Maybe your browser doesn't support indexedDB?`,
          0,
        ),
      )
      return
    }
    store.dispatch(actions.showMessage("BrowserFS ready"))
    store.dispatch(actions.loadLocalStorage())
  },
)

const git = (global.git = require("isomorphic-git"))
const fs = (global.fs = require("fs"))
const pfs = (global.pfs = require("pify")(fs))

global.commitAll = async () => {
  const repo = {
    dir: store.getState().repo.dir,
    fs,
  }

  const dir = `${repo.dir}/posts`
  const entries = await pfs.readdir(dir)
  await Promise.all(
    entries.map(name =>
      git.add({
        ...repo,
        filepath: `posts/${name}`,
      }),
    ),
  )
  await git.commit({
    ...repo,
    message: "autocommit",
    author: {
      name: "unijournal",
      email: "unijournal@rtlong.com",
    },
  })
}
