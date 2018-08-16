import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import Cookie from "js-cookie"
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
  if (!window.location.hash) return false
  const hash = parseAuthHash(window.location.hash)
  window.location.hash = ""
  const { token_type: type, access_token: token, state } = hash
  console.log({ token, state, type })

  if (type !== "bearer") {
    store.dispatch(actions.showError("Auth: Invalid. Not bearer"))
    return false
  }

  Cookie.set("gitlab_token", token)
  store.dispatch(
    actions.authReturn({
      token: hash.access_token,
    }),
  )
  return true
}

function getAuthFromCookie(store) {
  const token = Cookie.get("gitlab_token")
  if (!token) return false
  store.dispatch(
    actions.authReturn({
      token,
    }),
  )
  return true
}

const store = createStore()

configureBrowserFS(store.dispatch)
if (!getAuthFromCookie(store)) getAuthFromURL(store)

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
  Cookie,

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
