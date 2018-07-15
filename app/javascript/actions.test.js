import { test } from '../../test-helper'
import ACTIONS, {
  addPost,
  newPostFormOpen,
  newPostFormClose,
  newPostSourceChanged,
} from './actions'

test('actions', suite => {
  suite.test('addPost', t => {
    let action

    action = addPost()
    t.equal(action.type, ACTIONS.ADD_POST)
    t.equal(action.body, null)
    t.ok(action.timestamp instanceof Date)

    action = addPost('body arg')
    t.equal(action.type, ACTIONS.ADD_POST)
    t.equal(action.body, 'body arg')
    t.ok(action.timestamp instanceof Date)

    t.end()
  })


  suite.test('newPostFormClose', t => {
    const action = newPostFormClose()
    t.equal(action.type, ACTIONS.NEW_POST_FORM_EXPAND)
    t.equal(action.value, false)
    t.end()
  })

  suite.test('newPostFormOpen', t => {
    const action = newPostFormOpen()
    t.equal(action.type, ACTIONS.NEW_POST_FORM_EXPAND)
    t.equal(action.value, true)
    t.end()
  })

  suite.test('newPostSourceChanged', t => {
    const action = newPostSourceChanged('foo bar')
    t.equal(action.type, ACTIONS.NEW_POST_SOURCE_CHANGED)
    t.equal(action.value, 'foo bar')
    t.end()
  })
})
