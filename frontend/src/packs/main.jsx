import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import * as git from "isomorphic-git"
import fs from "fs"
import pify from "pify"

import createStore from "../store"
import App from "../app"
import * as actions from "../actions"

function mountApp(store) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app"),
  )
}

function configureBrowserFS(dispatch) {
  /* global BrowserFS */
  BrowserFS.configure(
    {
      fs: "IndexedDB",
      options: {},
    },
    err => {
      if (err) {
        dispatch(
          actions.showError(
            `Error configuring BrowserFS for indexedDB: ${err}. Maybe your browser doesn't support indexedDB?`,
            0,
          ),
        )
        return
      }
      dispatch(actions.showMessage("BrowserFS ready"))
      dispatch(actions.loadLocalStorage())
    },
  )
}

const store = createStore()

const pfs = pify(fs)

global.d = {
  actions,
  store,
  fs,
  git,
  pfs,

  async commitAll() {
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
  },
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => mountApp(store))
} else {
  mountApp(store)
}
configureBrowserFS(store.dispatch)
