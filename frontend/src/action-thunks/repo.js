import { repoSetState, receivePosts } from "../actions"
import { showMessage, showError } from "./messages"
import { loadLocalStorage } from "./posts"
import Storage from "../storage"

function remoteDBurl(dbName) {
  const hostname = window.location.hostname
  return `http://${hostname}:5984/unijournal-${dbName}`
}

export function openDB() {
  return async (dispatch, getState) => {
    const {
      repo: { dbName },
    } = getState()
    const storage = new Storage({ dbName })
    dispatch(repoSetState({ storage, locked: true }))
    storage.on("unlocked", () => {
      dispatch(repoSetState({ locked: false }))
      dispatch(loadLocalStorage())
    })
    storage.on("locked", () => {
      dispatch(repoSetState({ locked: true }))
      dispatch(loadLocalStorage())
    })

    storage
      .startSync(remoteDBurl(dbName))
      .on("error", err => dispatch(showError(`DB sync: error ${err}`)))
      .on("complete", () => dispatch(showMessage(`DB sync: complete`)))
      .on("active", () => dispatch(showMessage(`DB sync: resume`)))
      .on("denied", err =>
        dispatch(showError(`DB sync: error saving document ${JSON.stringify(err)}`)),
      )
      .on("change", info => {
        const {
          direction,
          change: { ok, docs_read, docs_written, doc_write_failures },
        } = info
        dispatch(
          showMessage(
            `DB sync: change ${
              ok ? "OK" : "ERR"
            } dir=${direction} read=${docs_read} written=${docs_written} write_failures=${doc_write_failures}`,
          ),
        )
        dispatch(loadLocalStorage())
      })
      .on("pause", err => dispatch(showMessage(`DB sync: paused ${err}`)))
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
