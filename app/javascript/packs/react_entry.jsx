import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from '../app'
import reducer from '../reducer'

// given window.pageState, convert values as needed
function convertPageState(pageState) {
  return Object.assign({}, pageState, {
    posts: pageState.posts.map(p => ({
      ...p,
      timestamp: new Date(p.timestamp),
    }))
  })
}

let store

document.addEventListener('DOMContentLoaded', () => {
  let initialState = Object.assign({}, reducer.initialState, convertPageState(window.pageState))
  store = createStore(reducer, initialState,
                      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  ReactDOM.render(
    <Provider store={store}>
      <App posts={store.getState().posts}/>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
