export const empty = {
  next_id: 0,
  by_id: {},
  ids: [],
}

export function all(posts) {
  return posts.ids.map(id => posts.by_id[id])
}

export function get(posts, id) {
  return posts.by_id[id]
}

export function add(posts, post) {
  const id = post.id || posts.next_id
  return {
    ...posts,
    next_id: Math.max(posts.next_id, id + 1),
    by_id: {
      ...posts.by_id,
      [id]: {
        ...post,
        id,
      },
    },
    ids: [...posts.ids, id],
  }
}

export function update(posts, id, post) {
  if (posts.ids.indexOf(id) === -1) throw new Error(`Post ${id} not found`)
  return {
    ...posts,
    by_id: {
      [id]: post,
    },
  }
}

export function replace(collection) {
  return collection.reduce((posts, serializedPost) => add(posts, {
    ...serializedPost,
    timestamp: new Date(serializedPost.timestamp),
  }), empty)
}
