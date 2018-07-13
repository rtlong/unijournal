import { test } from '../../test-helper'
import * as actions from './actions'

test('addPost', t => {
  let action

  action = actions.addPost()
  t.equal(action.type, actions.ADD_POST)
  t.equal(action.body, null)
  t.ok(action.timestamp instanceof Date)

  action = actions.addPost('body arg')
  t.equal(action.type, actions.ADD_POST)
  t.equal(action.body, 'body arg')
  t.ok(action.timestamp instanceof Date)

  t.end()
})

test('newPostFormSetExpanded', t => {
  let action

  action = actions.newPostFormSetExpanded(false)
  t.equal(action.type, actions.NEW_POST_FORM_EXPAND)
  t.equal(action.value, false)

  action = actions.newPostFormSetExpanded(true)
  t.equal(action.type, actions.NEW_POST_FORM_EXPAND)
  t.equal(action.value, true)

  t.end()
})

test('newPostSourceChanged', t => {
  let action

  action = actions.newPostSourceChanged('foo bar')
  t.equal(action.type, actions.NEW_POST_SOURCE_CHANGED)
  t.equal(action.value, 'foo bar')

  t.end()
})
