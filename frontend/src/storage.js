import { basename } from "path"
import fs from "fs" // provided by browserfs
import { init, add, commit } from "isomorphic-git"

import pify from "pify"

const pfs = pify(fs)

async function pathExists(path) {
  try {
    await pfs.stat(path)
    return true
  } catch (err) {
    return false
  }
}

export default class Storage {
  constructor({ dir }) {
    this.dir = dir
    this.repo = { dir: this.dir, fs }
  }

  async prepare() {
    await this.init()
    const postsPath = this.path("posts")
    if (!(await pathExists(postsPath))) await pfs.mkdir(postsPath)
  }

  async init() {
    if (await pathExists(this.path(".git"))) return

    console.log(`git init ${this.dir}`)

    await init(this.repo)
    await commit({
      ...this.repo,
      message: "init",
      author: {
        name: "unijournal",
        email: "unijournal@rtlong.com",
      },
    })
  }

  async loadPosts(cb = () => {}) {
    const entries = await pfs.readdir(this.path("posts"))
    await Promise.all(
      entries.map(async filename => {
        const path = this.path(`posts/${filename}`)
        const stat = await pfs.stat(path)
        const content = await pfs.readFile(path, "utf-8")
        const post = {
          id: basename(filename, ".md"),
          body: content,
          timestamp: stat.ctime,
        }
        cb(post)
        return post
      }),
    )
  }

  async storePost({ id, body }) {
    const path = this.path(`posts/${id}.md`)
    await pfs.writeFile(path, body)
    const stat = await pfs.stat(path)
    await add({ ...this.repo, filepath: path })
    await commit({
      ...this.repo,
      message: `add new entry ${id}`,
      author: {
        name: "unijournal",
        email: "unijournal@rtlong.com",
      },
    })
    return {
      id,
      body,
      timestamp: stat.ctime,
    }
  }

  path(relPath) {
    return `${this.dir}/${relPath}`
  }
}
