import { Map } from "immutable"

export const empty = new Map()

function nextId(posts) {
  return posts.size === 0 ? 0 : posts.keySeq().max() + 1
}
export function all(posts) {
  return posts.valueSeq().toJS()
}

export function get(posts, id) {
  if (!posts.has(id)) throw new Error(`Post ${id} not found`)
  return posts.get(id)
}

export function add(posts, post) {
  const newPost = {
    id: nextId(posts),
    ...post,
  }
  return posts.set(newPost.id, newPost)
}

export function update(posts, id, post) {
  if (!posts.has(id)) throw new Error(`Post ${id} not found`)
  return posts.set(id, post)
}

// naming this is stumping me... it takes in *an Object* (already deserialized from JSON coming from Rails) and converts to the shape that we use in the state
export function deserialize(serializedPost) {
  const p = Object.assign({}, serializedPost)
  p.timestamp = new Date(serializedPost.created_at)
  delete p.created_at
  return p
}

export function load(collection) {
  return collection.reduce(
    (posts, serializedPost) => add(posts, deserialize(serializedPost)),
    empty,
  )
}
