const ACTIONS = {};
[
  'ADD_POST',
  'NEW_POST_FORM_EXPAND',
  'NEW_POST_SOURCE_CHANGED',
].forEach(sym => ACTIONS[sym] = sym)

export default ACTIONS

export function addPost(body=null) {
  return {
    type: ACTIONS.ADD_POST,
    body,
    timestamp: new Date(),
  }
}

export function newPostFormOpen() {
  return {
    type: ACTIONS.NEW_POST_FORM_EXPAND,
    value: true,
  }
}

export function newPostFormClose() {
  return {
    type: ACTIONS.NEW_POST_FORM_EXPAND,
    value: false,
  }
}

export function newPostSourceChanged(value) {
  return {
    type: ACTIONS.NEW_POST_SOURCE_CHANGED,
    value,
  }
}
