import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import * as git from "isomorphic-git"
import fs from "fs"
import pify from "pify"

import createStore from "../store"
import App from "../app"
import * as actions from "../actions"

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

function parseAuthHash(hash) {
  return hash
    .slice(1)
    .split("&")
    .reduce((obj, part) => {
      const [key, value] = part.split("=", 2)
      obj[key] = value
      return obj
    }, {})
}

function getAuthFromURL(store) {
  if (window.location.pathname !== "/auth") return
  const hash = parseAuthHash(window.location.hash)
  store.dispatch(
    actions.authReturn({
      token: hash.access_token,
      state: hash.state,
      type: hash.token_type,
    }),
  )
}

const store = createStore()

configureBrowserFS(store.dispatch)
getAuthFromURL(store)

const mountApp = ({ store }) => {
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  )
  ReactDOM.render(app, document.getElementById("app"))
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => mountApp({ store }))
} else {
  mountApp({ store })
}

// Export a global `d` object for debug purposes:
const pfs = pify(fs)
global.d = {
  actions,
  store,
  fs,
  git,
  pfs,
  /* authRequest, */

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
