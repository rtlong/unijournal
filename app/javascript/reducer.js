import {
  ADD_POST,
  NEW_POST_FORM_EXPAND,
  NEW_POST_SOURCE_CHANGED,
} from './actions'

export const initialState = {
  posts: [],
  newPostFormExpanded: false,
  newPostSource: '',
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case ADD_POST:
    return {
      ...state,
      posts: [
        ...state.posts,
        {
          body: action.body || state.newPostSource,
          timestamp: action.timestamp,
        },
      ],
      newPostSource: '',
    }

  case NEW_POST_FORM_EXPAND:
    return {
      ...state,
      newPostFormExpanded: action.value,
    }

  case NEW_POST_SOURCE_CHANGED:
    return {
      ...state,
      newPostSource: action.value,
    }

  default:
    return state
  }
}

reducer.initialState = initialState
