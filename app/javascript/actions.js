const ACTIONS = {};
[
  'ADD_POST',
  'NEW_POST_FORM_EXPAND',
  'NEW_POST_SOURCE_CHANGED',
].forEach(sym => { ACTIONS[sym] = sym })

export default ACTIONS

export function addPost() {
  return (dispatch, getState) => {
    const postBody = getState().newPostForm.source
    if (!postBody) return
    dispatch({
      type: ACTIONS.ADD_POST,
      payload: {
        body: postBody,
        timestamp: new Date(),
      },
    })
  }
}

export function newPostFormOpen() {
  return {
    type: ACTIONS.NEW_POST_FORM_EXPAND,
    payload: true,
  }
}

export function newPostFormClose() {
  return {
    type: ACTIONS.NEW_POST_FORM_EXPAND,
    payload: false,
  }
}

export function newPostSourceChanged(payload) {
  return {
    type: ACTIONS.NEW_POST_SOURCE_CHANGED,
    payload,
  }
}
