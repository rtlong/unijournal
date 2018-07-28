import { POSTS_ADD, NEW_POST_FORM_SOURCE_CHANGED, NEW_POST_FORM_EXPAND } from "../action_types"

const initial = { source: "", expanded: false }

export default function newPostFormReducer(state = initial, action) {
  switch (action.type) {
    case POSTS_ADD:
      return {
        ...state,
        source: "",
      }

    case NEW_POST_FORM_EXPAND:
      return {
        ...state,
        expanded: action.payload,
      }

    case NEW_POST_FORM_SOURCE_CHANGED:
      return {
        ...state,
        source: action.payload,
      }

    default:
      return state
  }
}
