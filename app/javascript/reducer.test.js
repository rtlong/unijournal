import { test } from '../../test-helper'
import reducer from './reducer'
import ACTIONS from './actions'
import * as Posts from './entities/posts'
import * as Messages from './entities/messages'

test('reducer', suite => {
  const initialState = reducer(undefined, { type: 'INIT' })

  suite.test('initialState', t => {
    t.deepEqual(initialState, {
      newPostForm: {
        source: '',
        expanded: false,
      },
      posts: Posts.empty,
      messages: Messages.empty,
    })

    t.end()
  })

  suite.test('NEW_POST_SOURCE_CHANGED', t => {
    const state0 = { ...initialState }
    state0.newPostForm.source = ''

    const action = {
      type: ACTIONS.NEW_POST_SOURCE_CHANGED,
      payload: 'foo',
    }

    t.deepEqual(reducer(state0, action), {
      ...state0,
      newPostForm: {
        ...state0.newPostForm,
        source: 'foo',
      },
    })

    t.end()
  })

  suite.test('NEW_POST_FORM_EXPAND', t => {
    const state0 = { ...initialState }
    state0.newPostForm.expanded = true

    const action = {
      type: ACTIONS.NEW_POST_FORM_EXPAND,
      payload: false,
    }

    t.deepEqual(reducer(state0, action), {
      ...state0,
      newPostForm: {
        ...state0.newPostForm,
        expanded: false,
      },
    })

    t.end()
  })

  suite.test('ADD_POST', t => {
    const state0 = { ...initialState }
    state0.newPostForm.source = 'some text to make sure we clear'

    const action1 = {
      type: ACTIONS.ADD_POST,
      payload: {
        body: 'bar foo',
        timestamp: new Date(),
      },
    }
    const state1 = reducer(state0, action1)
    t.equal(state1.newPostForm.source, '')
    t.deepEqual(Posts.all(state1.posts), [
      {
        ...action1.payload,
        id: 0,
      },
    ])

    const action2 = {
      type: ACTIONS.ADD_POST,
      payload: {
        body: 'foo bar',
        timestamp: new Date(),
      },
    }
    const state2 = reducer(state1, action2)
    t.equal(state2.newPostForm.source, '')
    t.deepEqual(Posts.all(state2.posts), [
      {
        ...action1.payload,
        id: 0,
      },
      {
        ...action2.payload,
        id: 1,
      },
    ])
    t.end()
  })
})
