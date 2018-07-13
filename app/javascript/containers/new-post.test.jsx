import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import { test } from '../../../test-helper'
import {
  addPost,
  newPostFormSetExpanded,
  newPostSourceChanged,
} from '../actions'
import { initialState } from '../reducer'
import NewPostContainer from './new-post'

const middlewares = []
const mockStore = configureStore(middlewares)

test('containers/NewPost / dispatch', t => {
  const store = mockStore(initialState)

  const wrapper = shallow(<NewPostContainer/>, { context: { store } })
  const component = wrapper.find('NewPost')
  t.ok(component)

  component.prop('onOpen')()
  t.deepEqual(store.getActions(), [newPostFormSetExpanded(true)])
  store.clearActions()

  component.prop('onCancel')()
  t.deepEqual(store.getActions(), [newPostFormSetExpanded(false)])
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
  const store = mockStore(Object.assign({}, initialState, {
    newPostFormExpanded: true,
    newPostSource: 'blah bhhoo',
  }))

  const wrapper = shallow(<NewPostContainer/>, { context: { store } })
  const component = wrapper.find('NewPost')
  t.ok(component)

  const state = store.getState()
  t.equal(component.prop('expanded'), state.newPostFormExpanded)
  t.equal(component.prop('source'), state.newPostSource)

  t.end()
})
