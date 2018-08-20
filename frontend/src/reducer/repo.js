import { AUTH_RECEIVE_USER_INFO, LOGOUT, REPO_SET_STATE } from "../action_types"

const emptyState = {
  dbName: null,
  storage: null,
  locked: true,
}

export default function repoReducer(state = emptyState, { type, payload }) {
  switch (type) {
    case LOGOUT:
      return emptyState

    case AUTH_RECEIVE_USER_INFO: {
      const { username } = payload
      return {
        ...state,
        dbName: username,
      }
    }

    case REPO_SET_STATE: {
      return {
        ...state,
        ...payload,
      }
    }

    default:
      return state
  }
}
