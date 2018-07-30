import { Map } from "immutable"

export const empty = new Map()

function nextId(state) {
  return state.size === 0 ? 0 : state.keySeq().max() + 1
}
export function all(state) {
  return state.valueSeq().toJS()
}

export function get(state, id) {
  if (!state.has(id)) throw new Error(`Post ${id} not found`)
  return state.get(id)
}

export function add(state, post) {
  const newPost = {
    id: nextId(state),
    ...post,
  }
  return state.set(newPost.id, newPost)
}

export function update(state, id, post) {
  if (!state.has(id)) throw new Error(`Post ${id} not found`)
  return state.set(id, post)
}

export function load(collection) {
  return collection.reduce(add, empty)
}
