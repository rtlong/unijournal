import { repoSetState, receivePosts } from "../actions"
import { loadLocalStorage } from "./posts"
import Storage from "../storage"

export function openDB() {
  return async (dispatch, getState) => {
    const storage = new Storage({ dbName: getState().repo.dbName })
    dispatch(repoSetState({ storage, locked: true }))
    storage.on("unlocked", () => {
      dispatch(repoSetState({ locked: false }))
      dispatch(loadLocalStorage())
    })
    storage.on("locked", () => {
      dispatch(repoSetState({ locked: true }))
      dispatch(receivePosts([]))
    })
  }
}

export function unlockRepo(password) {
  return async (dispatch, getState) => {
    const {
      repo: { storage },
    } = getState()
    await storage.open(password)
  }
}

export function lockRepo(password) {
  return async (dispatch, getState) => {
    const {
      repo: { storage },
    } = getState()
    await storage.close()
  }
}
