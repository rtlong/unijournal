import { combineReducers } from 'redux'

import ACTIONS from './actions'
import * as Posts from './entities/posts'
import * as Messages from './entities/messages'

function posts(state = Posts.empty, { type, payload }) {
  switch (type) {
    case ACTIONS.POSTS_ADD:
      return Posts.add(state, payload)
    case ACTIONS.POSTS_RECEIVE:
      return Posts.load(payload)
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

function messages(state = Messages.empty, { type, payload }) {
  switch (type) {
    case ACTIONS.MESSAGES_ADD:
      return Messages.add(state, payload)

    case ACTIONS.MESSAGES_DEL:
      return Messages.del(state, payload.id)

    default:
      return state
  }
}

export default combineReducers({
  messages,
  posts,
  newPostForm,
})
/* export default function reducer(state, action) {
 *   return [
 *   ].reduce((s, r) => r(s, action), state)
 * } */
