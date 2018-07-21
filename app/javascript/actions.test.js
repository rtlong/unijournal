import expect from "expect"
import { mockStore } from "../../test-helper"
import { POSTS_ADD, NEW_POST_FORM_EXPAND, NEW_POST_FORM_SOURCE_CHANGED } from "./action_types"
import {
  addPost,
  newPostFormOpen,
  newPostFormClose,
  newPostSourceChanged,
  createPost,
} from "./actions"
import reducer from "./reducer"

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
    const actions = store.getActions()
    expect(actions.length).toBe(1)
    const action = actions[0]
    expect(action).toEqual(expected)
  })
}

describe("actions", () => {
  describe.skip("createPost", () => {
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

      await store.dispatch(createPost())
      expect(store.getActions()).toBe([
        {
          type: POSTS_ADD,
          payload: {
            body: "foo bar",
            timestamp: expect.any(Date),
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
})
