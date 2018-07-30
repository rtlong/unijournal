import { AUTH_RECEIVE_CREDENTIALS, AUTH_RECEIVE_USER_INFO } from "../action_types"

const emptyState = {
  token: null,
  provider: null,
  user: null,
}

export default function authReducer(state = emptyState, { type, payload }) {
  switch (type) {
    case AUTH_RECEIVE_USER_INFO:
      return {
        ...state,
        user: payload,
      }
    case AUTH_RECEIVE_CREDENTIALS:
      const { token, provider } = payload
      return {
        ...state,
        token,
        provider,
      }
    default:
      return state
  }
}
