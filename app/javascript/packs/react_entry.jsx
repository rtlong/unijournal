import React from "react"
import ReactDOM from "react-dom"
import { createStore, compose, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"
import { Provider } from "react-redux"

import App from "../app"
import reducer from "../reducer"
import * as Posts from "../entities/posts"

import * as actions from "../actions"

global.actions = actions

// given window.pageState, convert values as needed
function convertPageState(pageState = undefined) {
  if (!pageState) return undefined
  return {
    ...pageState,
    posts: Posts.load(pageState.posts),
  }
}

function setupStore() {
  const state = convertPageState(window.pageState)

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(reducer, state, composeEnhancers(applyMiddleware(ReduxThunk)))
}

document.addEventListener("DOMContentLoaded", () => {
  const store = setupStore()
  global.store = store

  store.dispatch(actions.fetchPosts())

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div")),
  )
})
