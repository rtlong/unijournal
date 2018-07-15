import { test } from '../../test-helper'
import reducer, { initialState } from './reducer'
import ACTIONS from './actions'

test('reducer', suite => {
  suite.test('NEW_POST_SOURCE_CHANGED', t => {
    const state0 = { ...initialState }
    state0.newPostForm.source = ''

    const action = {
      type: ACTIONS.NEW_POST_SOURCE_CHANGED,
      value: 'foo',
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
      value: false,
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
    const state0 = {
      ...initialState,
      posts: [],
    }
    state0.newPostForm.source = 'some text that was entered'

    const action1 = {
      type: ACTIONS.ADD_POST,
      body: null,
      timestamp: new Date(),
    }
    const state1 = reducer(state0, action1)
    t.deepEqual(state1, {
      ...state0,
      posts: [
        {
          body: state0.newPostForm.source,
          timestamp: action1.timestamp,
        },
      ],
      newPostForm: {
        ...state0.newPostForm,
        source: '',
      },
    })

    const action2 = {
      type: ACTIONS.ADD_POST,
      body: 'some value explicitly provided to the action',
      timestamp: new Date(),
    }
    const state2 = reducer(state1, action2)
    t.deepEqual(state2, {
      ...state0,
      posts: [
        {
          body: state0.newPostForm.source,
          timestamp: action1.timestamp,
        },
        {
          body: action2.body,
          timestamp: action2.timestamp,
        },
      ],
      newPostForm: {
        ...state0.newPostForm,
        source: '',
      },
    })

    t.end()
  })
})
