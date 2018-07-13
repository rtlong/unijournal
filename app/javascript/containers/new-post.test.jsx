import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import { test } from '../../../test-helper'
import {
  addPost,
  newPostFormOpen,
  newPostFormClose,
  newPostSourceChanged,
} from '../actions'
import reducer, { initialState } from '../reducer'
import NewPostContainer from './new-post'

const middlewares = []
const mockStore = configureStore(middlewares)

test('containers/NewPost / dispatch', t => {
  const store = mockStore(initialState)

  const wrapper = shallow(<NewPostContainer/>, { context: { store } })
  const component = wrapper.find('NewPost')
  t.ok(component)

  component.prop('onOpen')()
  t.deepEqual(store.getActions(), [newPostFormOpen()])
  store.clearActions()

  component.prop('onCancel')()
  t.deepEqual(store.getActions(), [newPostFormClose()])
  store.clearActions()

  component.prop('onSubmit')()
  t.deepEqual(store.getActions(), [addPost()])
  store.clearActions()

  const body = 'Foo bar baz'
  component.prop('onChange')(body)
  t.deepEqual(store.getActions(), [newPostSourceChanged(body)])
  store.clearActions()

  t.end()
})

test('containers/NewPost / state', t => {
  const store = mockStore(buildState(initialState, [
    newPostFormOpen(),
    newPostSourceChanged('foo')
  ]))

  const wrapper = shallow(<NewPostContainer/>, { context: { store } })
  const component = wrapper.find('NewPost')
  t.ok(component)

  const state = store.getState()
  t.comment(JSON.stringify(state))
  t.equal(component.prop('expanded'), true)
  t.equal(component.prop('source'), 'foo')

  t.end()
})

function buildState(initialState, actions) {
  return actions.reduce(reducer, initialState)
}
