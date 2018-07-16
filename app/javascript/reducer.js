import { combineReducers } from 'redux'

import ACTIONS from './actions'
import * as Posts from './entities/posts'

function posts(state = Posts.empty, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_POST:
      return Posts.add(state, payload)
    default:
      return state
  }
}

function newPostForm(state = { source: '', expanded: false }, action) {
  switch (action.type) {
    case ACTIONS.ADD_POST:
      return {
        ...state,
        source: '',
      }

    case ACTIONS.NEW_POST_FORM_EXPAND:
      return {
        ...state,
        expanded: action.payload,
      }

    case ACTIONS.NEW_POST_SOURCE_CHANGED:
      return {
        ...state,
        source: action.payload,
      }

    default:
      return state
  }
}

export default combineReducers({
  posts,
  newPostForm,
})
/* export default function reducer(state, action) {
 *   return [
 *   ].reduce((s, r) => r(s, action), state)
 * } */
