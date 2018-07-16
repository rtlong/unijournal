import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'

import App from '../app'
import reducer from '../reducer'

// given window.pageState, convert values as needed
function convertPageState(pageState) {
  return Object.assign({}, pageState, {
    posts: pageState.posts.map(p => ({
      ...p,
      timestamp: new Date(p.timestamp),
    })),
  })
}

function setupStore() {
  const state = convertPageState(window.pageState)

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(reducer, state, composeEnhancers(applyMiddleware(ReduxThunk)))
}
document.addEventListener('DOMContentLoaded', () => {
  const store = setupStore()
  ReactDOM.render(
    <Provider store={store}>
      <App posts={store.getState().posts} />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
