import { EventEmitter } from "events"
import { Buffer } from "buffer"

import PouchDB from "pouchdb"
import PouchBox from "pouch-box"
import nacl from "tweetnacl"
import naclUtil from "tweetnacl-util"
import pify from "pify"
import { pbkdf2 } from "pbkdf2"

nacl.util = naclUtil
PouchDB.plugin(PouchBox)

const converters = {
  toDB({ id, timestamp, body, tags }) {
    return {
      _id: id,
      type: "post",
      timestamp,
      box: {
        body,
        tags,
      },
    }
  },

  fromDB(doc) {
    const { body, tags } = doc.box
    return {
      ...doc,
      id: doc._id,
      timestamp: new Date(doc.timestamp),
      body,
      tags,
    }
  },
}
export default class Storage extends EventEmitter {
  constructor({ dbName }) {
    super()
    this.db = new PouchDB(dbName)
    this.prepareProm = null
    this.locked = true
  }

  async open(password) {
    const salt = Buffer.from(nacl.hash(Uint8Array.from(this.db.name, c => c.codePointAt(0))))
    const secretKey = await pify(pbkdf2)(password, salt, 10000, 32, "sha256")
    const keypair = nacl.box.keyPair.fromSecretKey(secretKey)
    this.prepareProm = this.db.box(keypair).then(permit => {
      this.emit("unlocked", null)
      this.locked = false
      return permit
    })
    return this.prepareProm
  }

  close() {
    this.db.closeBox()
    this.locked = true
    this.prepareProm = null
    this.emit("locked", null)
  }

  async prepare() {
    if (!this.prepareProm) throw new Error("DB is locked")
    return this.prepareProm
  }

  async deletePost(post) {
    await this.prepare()
    return this.db.put({ ...post, _deleted: true })
  }

  async loadPosts() {
    const permit = await this.prepare()

    const docs = await this.db.query("box/receivers", {
      key: permit.receiver(),
      reduce: false,
      include_docs: true,
    })

    return docs.rows.reduce((collection, { doc }) => {
      if (!doc.type || doc.type !== "post") return collection

      collection.push(converters.fromDB(doc))
      return collection
    }, [])
  }

  async storePost({ id, body, timestamp, tags }) {
    await this.prepare()
    return this.db.put(converters.toDB({ id, body, timestamp, tags }))
  }

  async allTags() {
    // await this.prepare()
    // return this.db.
  }

  startSync(remote) {
    if (this.sync) throw new Error("sync already started")

    this.sync = this.db
      .sync(remote, {
        live: true,
        retry: true,
      })
      .on("complete", () => {
        this.sync = undefined
      })

    return this.sync
  }

  stopSync() {
    if (!this.sync) return false
    return this.sync.cancel()
  }
}
