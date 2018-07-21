import expect from "expect"
import { mockStore } from "../../test-helper"
import {
  MESSAGES_ADD,
  NEW_POST_FORM_EXPAND,
  NEW_POST_FORM_SOURCE_CHANGED,
  POSTS_ADD,
  POSTS_UPDATE,
  POSTS_REQUEST,
  POSTS_RECEIVE,
} from "./action_types"
import {
  addPost,
  createPost,
  fetchPosts,
  newPostFormClose,
  newPostFormOpen,
  newPostSourceChanged,
  requestPosts,
  receivePosts,
  showMessage,
  showError,
  updatePost,
} from "./actions"
import reducer from "./reducer"
import postJSON from "./util/post_json"

jest.mock("./util/post_json")

const initialState = reducer(undefined, { type: "@@redux/INIT-test" })

function testSimpleActionCreator(actionCreator, actionCreatorArgs, expectedAction) {
  let args = actionCreatorArgs
  const expected = expectedAction || actionCreatorArgs
  if (!expectedAction) {
    args = []
  }
  test(actionCreator.name, async () => {
    const store = mockStore(initialState)
    await store.dispatch(actionCreator(...args))
    expect(store.getActions()).toEqual(Array.of(expected))
  })
}

describe("actions", () => {
  describe("createPost", () => {
    test("when newPostForm.source empty", async () => {
      const store = mockStore(initialState)

      await store.dispatch(createPost())
      const actions = store.getActions()
      expect(actions.length).toBe(0)
    })

    test("when newPostForm.source has content", async () => {
      const state = { ...initialState }
      state.newPostForm.source = "foo bar"
      const store = mockStore(state)

      postJSON.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({ id: 32, body: "foo bar", created_at: "2018-09-03T03:45:23Z" }),
      })
      await store.dispatch(createPost())
      expect(postJSON).toHaveBeenCalledWith("/posts", { body: "foo bar" })
      expect(store.getActions()).toEqual([
        {
          type: POSTS_ADD,
          payload: {
            id: 32,
            body: "foo bar",
            timestamp: new Date("2018-09-03T03:45:23Z"),
          },
        },
      ])
    })
  })

  testSimpleActionCreator(addPost, [{ body: "foo" }], {
    type: POSTS_ADD,
    payload: { body: "foo" },
  })

  testSimpleActionCreator(newPostFormClose, {
    type: NEW_POST_FORM_EXPAND,
    payload: false,
  })

  testSimpleActionCreator(newPostFormOpen, {
    type: NEW_POST_FORM_EXPAND,
    payload: true,
  })

  testSimpleActionCreator(newPostSourceChanged, ["foo bar"], {
    type: NEW_POST_FORM_SOURCE_CHANGED,
    payload: "foo bar",
  })

  testSimpleActionCreator(updatePost, [123, { body: "foo" }], {
    type: POSTS_UPDATE,
    payload: {
      id: 123,
      post: {
        body: "foo",
      },
    },
  })

  testSimpleActionCreator(requestPosts, {
    type: POSTS_REQUEST,
  })

  testSimpleActionCreator(receivePosts, ["value"], {
    type: POSTS_RECEIVE,
    payload: "value",
  })

  testSimpleActionCreator(showMessage, ["some message", "info", 0], {
    type: MESSAGES_ADD,
    payload: {
      id: expect.any(Number),
      type: "info",
      message: "some message",
    },
  })

  testSimpleActionCreator(showError, ["some message", 0], {
    type: MESSAGES_ADD,
    payload: {
      id: expect.any(Number),
      type: "error",
      message: "some message",
    },
  })

  test.skip(fetchPosts.name, () => {})
})
