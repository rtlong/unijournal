import { empty, all, get, add, update, deserialize, load } from "./posts"

const unknownId = -1

/* eslint-disable-next-line no-underscore-dangle */
let _id = 0
function nextId() {
  _id += 1
  return _id
}

function buildPost({ id = nextId(), body, timestamp = new Date() }) {
  return {
    id,
    body,
    timestamp,
  }
}

/* eslint-disable-next-line camelcase */
function buildSerializedPost({ id = nextId(), body, created_at = new Date().toString() }) {
  return {
    id,
    body,
    created_at,
  }
}

describe("entities/posts", () => {
  const postFoo = buildPost({ body: "foo" })
  const postBar = buildPost({ body: "bar" })

  const stateA = add(empty, postFoo)
  const stateB = add(stateA, postBar)

  describe(all, () => {
    const cases = []
    cases.push(["empty", empty, []])
    cases.push(["stateA", stateA, [postFoo]])
    cases.push(["stateB", stateB, [postFoo, postBar]])

    test.each(cases)("%s", (name, state, expected) => {
      expect(all(state)).toEqual(expected)
    })
  })

  describe(add, () => {
    const postWithoutId = buildPost({ body: "foo" })
    delete postWithoutId.id

    const cases = []
    cases.push(["add(empty, postFoo)", add(empty, postFoo), [postFoo]])
    cases.push([
      "add(empty, postWithoutId)",
      add(empty, postWithoutId),
      [{ id: expect.any(Number), ...postWithoutId }],
    ])
    cases.push([
      "add(stateA, postWithoutId)",
      add(stateA, postWithoutId),
      [postFoo, { id: postFoo.id + 1, ...postWithoutId }],
    ])

    test.each(cases)("%s", (name, state, expected) => {
      expect(all(state)).toEqual(expected)
    })
  })

  test("get", () => {
    expect(get(stateB, postBar.id)).toEqual(postBar)
    expect(get(stateB, postFoo.id)).toEqual(postFoo)
    expect(() => get(stateB, unknownId)).toThrow(/not found/)
  })

  describe(update, () => {
    const cases = []
    cases.push([
      "update(stateA, postFoo.id, postBar)",
      update(stateA, postFoo.id, postBar),
      [postBar],
    ])

    const postFooModified = {
      ...postFoo,
      body: "something new",
    }
    cases.push([
      "update(stateB, postFoo.id, postFooModified)",
      update(stateB, postFoo.id, postFooModified),
      [postFooModified, postBar],
    ])

    test.each(cases)("%s", (name, state, expected) => {
      expect(all(state)).toEqual(expected)
    })

    test("errors if ID not found", () => {
      expect(() => update(stateB, unknownId, postFooModified)).toThrow(/not found/)
    })
  })

  describe(deserialize, () => {
    test("returns the input with .created_at parsed and at .timestamp", () => {
      const serializedPost = buildSerializedPost({ body: "foo bar" })

      expect(deserialize(serializedPost)).toEqual({
        id: serializedPost.id,
        timestamp: new Date(serializedPost.created_at),
        body: serializedPost.body,
      })
    })
  })

  describe(load, () => {
    test("works", () => {
      const collection = [
        buildSerializedPost({ body: "bar" }),
        buildSerializedPost({ body: "foo" }),
      ]
      const output = load(collection)
      expect(all(output)).toEqual(collection.map(sp => deserialize(sp)))
    })
  })
})
