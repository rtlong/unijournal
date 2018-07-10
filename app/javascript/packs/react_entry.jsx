import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './app'
import reducer from './reducer'
import { addPost } from './actions'

const store = createStore(reducer)

store.dispatch(addPost('foo'))
store.dispatch(addPost('bar'))

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App posts={store.getState().posts}/>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
