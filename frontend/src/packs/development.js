import Cookie from "js-cookie"
import PouchDB from "pouchdb"
import Storage from "../storage"
import * as actions from "../actions"
import * as auth from "../action-thunks/auth"
import * as messaging from "../action-thunks/messages"
import * as posts from "../action-thunks/posts"
import * as repo from "../action-thunks/repo"

window.lib = {
  actions,
  actionThunks: {
    posts,
    auth,
    messaging,
    repo,
  },
  Cookie,
  Storage,
  PouchDB,
}
