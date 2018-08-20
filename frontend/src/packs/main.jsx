import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import Cookie from "js-cookie"
import PouchDB from "pouchdb"

import createStore from "../store"
import Storage from "../storage"
import App from "../app"
import * as actions from "../actions"
import * as auth from "../action-thunks/auth"
import * as messaging from "../action-thunks/messages"
import * as posts from "../action-thunks/posts"

const store = createStore()

store.dispatch(auth.loadAuthFromEnvironment())

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
global.d = {
  actions,
  actionThunks: {
    posts,
    auth,
    messaging,
  },
  store,
  Cookie,
  Storage,
  PouchDB,
}
