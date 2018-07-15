import { combineReducers } from 'redux'

import ACTIONS from './actions'

export const initialState = {
  posts: [],
  newPostForm: {
    source: '',
    expanded: false,
  },
}

function complexReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            body: action.body || state.newPostForm.source,
            timestamp: action.timestamp,
          },
        ],
      }
    default:
      return state
  }
}

function posts(state = initialState.posts, action) {
  switch (action.type) {
    default:
      return state
  }
}

function newPostForm(state = initialState.newPostForm, action) {
  switch (action.type) {
    case ACTIONS.ADD_POST:
      return {
        ...state,
        source: '',
      }

    case ACTIONS.NEW_POST_FORM_EXPAND:
      return {
        ...state,
        expanded: action.value,
      }

    case ACTIONS.NEW_POST_SOURCE_CHANGED:
      return {
        ...state,
        source: action.value,
      }

    default:
      return state
  }
}

export default function reducer(state, action) {
  return [
    complexReducer,
    combineReducers({
      posts,
      newPostForm,
    }),
  ].reduce((s, r) => r(s, action), state)
}
