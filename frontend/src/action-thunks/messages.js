import { addMessage, deleteMessage } from "../actions"

export function showMessage(message, type = "info", timeout = 10000) {
  return dispatch => {
    const id = new Date().getTime()

    dispatch(addMessage(id, type, message))

    if (timeout) {
      setTimeout(() => dispatch(deleteMessage(id)), timeout)
    }
  }
}

export function showError(err, timeout = 10000) {
  return showMessage(err, "error", timeout)
}
