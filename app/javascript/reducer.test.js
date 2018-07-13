import { test } from '../../test-helper'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

test('reducer / NEW_POST_SOURCE_CHANGED', t => {
  let state0 = {
    ...initialState,
    newPostSource: '',
  }

  let action = {
    type: actions.NEW_POST_SOURCE_CHANGED,
    value: 'foo',
  }

  t.deepEqual(reducer(state0, action), {
    ...state0,
    newPostSource: 'foo',
  })

  t.end()
})

test('reducer / NEW_POST_FORM_EXPAND', t => {
  let state0 = {
    ...initialState,
    newPostFormExpanded: true,
  }

  let action = {
    type: actions.NEW_POST_FORM_EXPAND,
    value: false,
  }

  t.deepEqual(reducer(state0, action), {
    ...state0,
    newPostFormExpanded: false,
  })

  t.end()
})

test('reducer / ADD_POST', t => {
  let state0 = {
    ...initialState,
    posts: [],
    newPostSource: 'some text that was entered',
  }

  let action1 = {
    type: actions.ADD_POST,
    body: null,
    timestamp: new Date(),
  }

  let action2 = {
    type: actions.ADD_POST,
    body: 'some value explicitly provided to the action',
    timestamp: new Date(),
  }

  let state1 = reducer(state0, action1)
  t.deepEqual(state1, {
    ...state0,
    posts: [
      {
        body: state0.newPostSource,
        timestamp: action1.timestamp,
      },
    ],
    newPostSource: ''
  })

  let state2 = reducer(state1, action2)
  t.deepEqual(state2, {
    ...state0,
    posts: [
      {
        body: state0.newPostSource,
        timestamp: action1.timestamp,
      },
      {
        body: action2.body,
        timestamp: action2.timestamp,
      },
    ],
    newPostSource: ''
  })

  t.end()
})
