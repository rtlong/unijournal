import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import { test } from '../../../test-helper'
import { initialState } from '../reducer'
import PostListContainer from './post-list'

const middlewares = []
const mockStore = configureStore(middlewares)

test('containers/PostList', suite => {
  suite.test('state', t => {
    const store = mockStore(Object.assign({}, initialState, {
      posts: [
        {
          body: 'foo bar',
          timestamp: new Date(),
        },
      ]
    }))

    const wrapper = shallow(<PostListContainer/>, { context: { store } })
    const component = wrapper.find('PostList')
    t.ok(component)

    const state = store.getState()
    t.deepEqual(component.prop('posts'), state.posts)

    t.end()
  })
})
