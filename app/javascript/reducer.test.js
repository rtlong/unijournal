import expect from "expect"
import reducer from "./reducer"
import ACTIONS from "./actions"
import * as Posts from "./entities/posts"
import * as Messages from "./entities/messages"

describe("reducer", () => {
  const initialState = reducer(undefined, { type: "INIT" })

  test("initialState", () => {
    expect(initialState).toEqual({
      newPostForm: {
        source: "",
        expanded: false,
      },
      posts: Posts.empty,
      messages: Messages.empty,
    })
  })

  test("NEW_POST_SOURCE_CHANGED", () => {
    const state0 = { ...initialState }
    state0.newPostForm.source = ""

    const action = {
      type: ACTIONS.NEW_POST_SOURCE_CHANGED,
      payload: "foo",
    }

    expect(reducer(state0, action)).toEqual({
      ...state0,
      newPostForm: {
        ...state0.newPostForm,
        source: "foo",
      },
    })
  })

  test("NEW_POST_FORM_EXPAND", () => {
    const state0 = { ...initialState }
    state0.newPostForm.expanded = true

    const action = {
      type: ACTIONS.NEW_POST_FORM_EXPAND,
      payload: false,
    }

    expect(reducer(state0, action)).toEqual({
      ...state0,
      newPostForm: {
        ...state0.newPostForm,
        expanded: false,
      },
    })
  })

  test("ADD_POST", () => {
    const state0 = { ...initialState }
    state0.newPostForm.source = "some text to make sure we clear"

    const action1 = {
      type: ACTIONS.ADD_POST,
      payload: {
        body: "bar foo",
        timestamp: new Date(),
      },
    }
    const state1 = reducer(state0, action1)
    expect(state1.newPostForm.source).toBe("")
    expect(Posts.all(state1.posts)).toEqual([
      {
        ...action1.payload,
        id: 0,
      },
    ])

    const action2 = {
      type: ACTIONS.ADD_POST,
      payload: {
        body: "foo bar",
        timestamp: new Date(),
      },
    }
    const state2 = reducer(state1, action2)
    expect(state2.newPostForm.source).toBe("")
    expect(Posts.all(state2.posts)).toEqual([
      {
        ...action1.payload,
        id: 0,
      },
      {
        ...action2.payload,
        id: 1,
      },
    ])
  })
})
