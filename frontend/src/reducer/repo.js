const emptyState = {
  dir: "default-journal",
}

export default function postReducer(state = emptyState, { type, payload }) {
  switch (type) {
    default:
      return state
  }
}
