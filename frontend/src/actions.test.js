import util from "util"

import expect from "expect"
import fetch from "cross-fetch"

import mockStore from "../test/mock_store"
import {
  MESSAGES_ADD,
  MESSAGES_DEL,
  NEW_POST_FORM_EXPAND,
  NEW_POST_FORM_SOURCE_CHANGED,
  POSTS_ADD,
  POSTS_UPDATE,
  POSTS_REQUEST,
  POSTS_RECEIVE,
} from "./action_types"
import {
  addPost,
  addMessage,
  createPost,
  deleteMessage,
  fetchPosts,
  newPostFormClose,
  newPostFormOpen,
  newPostSourceChanged,
  requestPosts,
  receivePosts,
  showMessage,
  updatePost,
} from "./actions"
import reducer from "./reducer"
import postJSON from "./util/post_json"

jest.mock("cross-fetch")
jest.mock("./util/post_json")

const initialState = reducer(undefined, { type: "@@redux/INIT-test" })

describe("actions", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe(createPost, () => {
    test("when newPostForm.source empty", async () => {
      const store = mockStore(initialState)

      await store.dispatch(createPost())
      const actions = store.getActions()
      expect(actions.length).toBe(0)
    })

    test("when newPostForm.source has content", async () => {
      const body = "Foo bar baz foo"
      const parsedJson = { id: 32, body, created_at: "2018-09-03T03:45:23Z" }
      postJSON.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(parsedJson),
      })

      const state = { ...initialState }
      state.newPostForm.source = body
      const store = mockStore(state)

      await store.dispatch(createPost())
      jest.runAllTimers()
      expect(postJSON).toHaveBeenCalledWith("/posts", { body })
      const dispatchedActions = store.getActions()
      const idMatcher = expect.any(Number)
      expect(dispatchedActions).toEqual([
        addPost({
          id: parsedJson.id,
          body: parsedJson.body,
          timestamp: new Date(parsedJson.created_at),
        }),
        addMessage(idMatcher, "info", expect.stringMatching(/saved/i)),
        deleteMessage(idMatcher),
      ])
      // ensure the IDs used are the same
      expect(dispatchedActions[1].payload.id).toEqual(dispatchedActions[2].payload.id)
    })

    describe("on error", () => {
      test("response: it dispatches MESSAGES_ADD with error message", async () => {
        postJSON.mockResolvedValue({
          ok: false,
        })

        const state = { ...initialState }
        state.newPostForm.source = "foo bar"
        const store = mockStore(state)

        await store.dispatch(createPost())
        jest.runAllTimers()
        const dispatchedActions = store.getActions()

        expect(dispatchedActions).toEqual([
          addMessage(expect.any(Number), "error", expect.stringMatching(/error/i)),
          deleteMessage(expect.any(Number)),
        ])

        // ensure the IDs used are the same
        expect(dispatchedActions[0].payload.id).toEqual(dispatchedActions[1].payload.id)
      })

      test("exception: it dispatches MESSAGES_ADD with error message", async () => {
        postJSON.mockRejectedValue(new Error("Some exception message"))

        const state = { ...initialState }
        state.newPostForm.source = "foo bar"
        const store = mockStore(state)

        await store.dispatch(createPost())
        jest.runAllTimers()
        const dispatchedActions = store.getActions()

        expect(dispatchedActions).toEqual([
          addMessage(expect.any(Number), "error", expect.stringMatching(/Some exception message/i)),
          deleteMessage(expect.any(Number)),
        ])

        // ensure the IDs used are the same
        expect(dispatchedActions[0].payload.id).toEqual(dispatchedActions[1].payload.id)
      })
    })
  })

  describe(showMessage, () => {
    test("with timeout=0", async () => {
      const store = mockStore(initialState)
      const message = "Some message"
      const type = "info"

      await store.dispatch(showMessage(message, type, 0))
      jest.runAllTimers()

      expect(store.getActions()).toEqual([addMessage(expect.any(Number), type, message)])
    })

    test("with timeout!=0", async () => {
      const store = mockStore(initialState)
      const message = "Some message"

      await store.dispatch(showMessage(message))
      jest.runAllTimers()
      const dispatchedActions = store.getActions()

      expect(dispatchedActions).toEqual([
        addMessage(expect.any(Number), "info", message),
        deleteMessage(expect.any(Number)),
      ])

      // ensure the IDs used are the same
      expect(dispatchedActions[0].payload.id).toEqual(dispatchedActions[1].payload.id)
    })
  })

  describe(fetchPosts, () => {
    beforeEach(() => {
      fetch.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            posts: [1, 2],
          }),
      })
    })

    test("it GETs /posts", async () => {
      const store = mockStore(initialState)
      await store.dispatch(fetchPosts())
      expect(fetch).toHaveBeenCalledWith("/posts", { method: "GET" })
    })

    test("it dispatches POSTS_RECEIVE with response value", async () => {
      const store = mockStore(initialState)
      await store.dispatch(fetchPosts())
      expect(store.getActions()).toEqual([
        receivePosts({
          posts: [1, 2],
        }),
      ])
    })

    describe("on error", () => {
      test("it dispatches MESSAGES_ADD with error message", async () => {
        fetch.mockResolvedValue({
          ok: false,
        })
        const store = mockStore(initialState)

        await store.dispatch(fetchPosts())
        jest.runAllTimers()
        const dispatchedActions = store.getActions()

        expect(dispatchedActions).toEqual([
          addMessage(expect.any(Number), "error", expect.stringMatching(/error/i)),
          deleteMessage(expect.any(Number)),
        ])

        // ensure the IDs used are the same
        expect(dispatchedActions[0].payload.id).toEqual(dispatchedActions[1].payload.id)
      })
    })
  })

  describe("Factories", () => {
    const factories = [
      {
        factory: addPost,
        cases: [
          {
            args: [{ body: "foo" }],
            expected: {
              type: POSTS_ADD,
              payload: { body: "foo" },
            },
          },
        ],
      },

      {
        factory: newPostFormOpen,
        cases: [
          {
            args: [],
            expected: {
              type: NEW_POST_FORM_EXPAND,
              payload: true,
            },
          },
        ],
      },

      {
        factory: newPostFormClose,
        cases: [
          {
            args: [],
            expected: {
              type: NEW_POST_FORM_EXPAND,
              payload: false,
            },
          },
        ],
      },

      {
        factory: newPostSourceChanged,
        cases: [
          {
            args: ["foo bar"],
            expected: {
              type: NEW_POST_FORM_SOURCE_CHANGED,
              payload: "foo bar",
            },
          },
        ],
      },

      {
        factory: updatePost,
        cases: [
          {
            args: [123, { body: "foo" }],
            expected: {
              type: POSTS_UPDATE,
              payload: {
                id: 123,
                post: {
                  body: "foo",
                },
              },
            },
          },
        ],
      },

      {
        factory: requestPosts,
        cases: [
          {
            args: [],
            expected: {
              type: POSTS_REQUEST,
            },
          },
        ],
      },

      {
        factory: receivePosts,
        cases: [
          {
            args: ["value"],
            expected: {
              type: POSTS_RECEIVE,
              payload: "value",
            },
          },
        ],
      },

      {
        factory: addMessage,
        cases: [
          {
            args: [1234, "info", "some message"],
            expected: {
              type: MESSAGES_ADD,
              payload: {
                id: 1234,
                type: "info",
                message: "some message",
              },
            },
          },
        ],
      },

      {
        factory: deleteMessage,
        cases: [
          {
            args: [1234],
            expected: {
              type: MESSAGES_DEL,
              payload: {
                id: 1234,
              },
            },
          },
        ],
      },
    ]

    factories.forEach(({ factory, cases }) => {
      describe(factory.name, () => {
        cases.forEach(({ args, expected }) => {
          const argsListStr = util.format("%O", args).replace(/^\[\s*(.*?)\s*\]$/, "$1")
          test(`${factory.name}(${argsListStr})`, async () => {
            const store = mockStore(initialState)
            await store.dispatch(factory(...args))
            expect(store.getActions()).toEqual(Array.of(expected))
          })
        })
      })
    })
  })
})
