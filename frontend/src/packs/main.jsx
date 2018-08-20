import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import createStore from "../store"
import App from "../app"
import { loadAuthFromEnvironment } from "../action-thunks/auth"

const mountApp = ({ store }) => {
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  )
  ReactDOM.render(app, document.getElementById("app"))
}

const store = createStore()
store.dispatch(loadAuthFromEnvironment())

window.d = {
  store,
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => mountApp({ store }))
} else {
  mountApp({ store })
}
