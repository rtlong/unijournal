import { test } from '../../test-helper'
import ACTIONS, {
  addPost,
  newPostFormSetExpanded,
  newPostFormOpen,
  newPostFormClose,
  newPostSourceChanged,
} from './actions'

test('addPost', t => {
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

test('newPostFormClose', t => {
  const action = newPostFormClose()
  t.equal(action.type, ACTIONS.NEW_POST_FORM_EXPAND)
  t.equal(action.value, false)
  t.end()
})

test('newPostFormOpen', t => {
  const action = newPostFormOpen()
  t.equal(action.type, ACTIONS.NEW_POST_FORM_EXPAND)
  t.equal(action.value, true)
  t.end()
})

test('newPostSourceChanged', t => {
  let action

  action = newPostSourceChanged('foo bar')
  t.equal(action.type, ACTIONS.NEW_POST_SOURCE_CHANGED)
  t.equal(action.value, 'foo bar')

  t.end()
})
