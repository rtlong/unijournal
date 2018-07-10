export const ADD_POST = 'ADD_POST'
export const NEW_POST_FORM_EXPAND = 'NEW_POST_FORM_EXPAND'
export const NEW_POST_SOURCE_CHANGED = 'NEW_POST_SOURCE_CHANGED'

export function addPost(body=null) {
  return {
    type: ADD_POST,
    body,
    timestamp: new Date(),
  }
}

export function newPostFormSetExpanded(value) {
  return {
    type: NEW_POST_FORM_EXPAND,
    value,
  }
}

export function newPostSourceChanged(value) {
  return {
    type: NEW_POST_SOURCE_CHANGED,
    value,
  }
}
