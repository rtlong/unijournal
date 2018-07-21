import expect from "expect"
import reducer from "./reducer"
import {
  NEW_POST_FORM_EXPAND,
  NEW_POST_FORM_SOURCE_CHANGED,
  POSTS_ADD,
  POSTS_RECEIVE,
  POSTS_REQUEST,
  POSTS_UPDATE,
  MESSAGES_ADD,
  MESSAGES_DEL,
} from "./action_types"
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

  test(NEW_POST_FORM_SOURCE_CHANGED, () => {
    const state0 = { ...initialState }
    state0.newPostForm.source = ""

    const action = {
      type: NEW_POST_FORM_SOURCE_CHANGED,
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

  test(NEW_POST_FORM_EXPAND, () => {
    const state0 = { ...initialState }
    state0.newPostForm.expanded = true

    const action = {
      type: NEW_POST_FORM_EXPAND,
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

  test(POSTS_ADD, () => {
    const state0 = { ...initialState }
    state0.newPostForm.source = "some text to make sure we clear"

    const action1 = {
      type: POSTS_ADD,
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
      type: POSTS_ADD,
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

  test(POSTS_RECEIVE, () => {
    const state0 = {
      ...initialState,
      posts: Posts.add(Posts.empty, { body: "bar", timestamp: new Date() }), // should replace this
    }

    expect(Posts.all(state0.posts)).toEqual([
      {
        id: 0,
        body: "bar",
        timestamp: expect.any(Date),
      },
    ])
    const action1 = {
      type: POSTS_RECEIVE,
      payload: [
        {
          id: 123,
          body: "foo",
          created_at: "2018-03-04T03:42:32Z",
        },
      ],
    }
    const state1 = reducer(state0, action1)
    expect(Posts.all(state1.posts)).toEqual([
      {
        id: 123,
        body: "foo",
        timestamp: new Date(action1.payload[0].created_at),
      },
    ])
  })

  test.skip(POSTS_REQUEST, () => {})
  test.skip(POSTS_UPDATE, () => {})
  test.skip(MESSAGES_ADD, () => {})
  test.skip(MESSAGES_DEL, () => {})
})
