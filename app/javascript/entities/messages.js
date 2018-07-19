export const empty = {
  by_id: {},
  ids: [],
}

export function all(messages) {
  return messages.ids.map(id => messages.by_id[id])
}

/* export function get(messages, id) {
 *   return messages.by_id[id]
 * } */

export function add(messages, message) {
  const { id } = message
  return {
    ...messages,
    next_id: messages.next_id + 1,
    by_id: {
      ...messages.by_id,
      [id]: {
        ...message,
        id,
      },
    },
    ids: [...messages.ids, id],
  }
}

export function del(messages, id) {
  if (messages.ids.indexOf(id) === -1) throw new Error(`Message ${id} not found`)
  return {
    ...messages,
    ids: messages.ids.filter(e => e !== id),
  }
}
