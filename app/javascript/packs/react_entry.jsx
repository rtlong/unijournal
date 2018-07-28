import React from "react"
import ReactDOM from "react-dom"
import { createStore, compose, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"
import { Provider } from "react-redux"

import App from "../app"
import reducer from "../reducer"
import * as actions from "../actions"

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, undefined, composeEnhancers(applyMiddleware(ReduxThunk)))

global.actions = actions
global.store = store

global.apiEndpoint = document.querySelector('meta[name="api-endpoint"]').getAttribute("content")

store.dispatch(actions.fetchPosts())

const mountApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div")),
  )
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp)
} else {
  mountApp()
}
