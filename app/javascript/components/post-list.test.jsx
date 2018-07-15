import React from 'react'
import { shallow } from 'enzyme'

import { test } from '../../../test-helper'
import PostList from './post-list'

test('components/PostList', suite => {
  suite.test('looks correct', t => {
    const posts = [
      {
        body: 'foo bar',
        timestamp: new Date(),
      },
      {
        body: 'bar crawl',
        timestamp: new Date(),
      },
    ]
    const component = shallow(<PostList posts={posts}/>)
    const postComponents = component.find('Post')

    t.equal(postComponents.length, posts.length)

    for(let i = 0; i < posts.length; i++) {
      const post = postComponents.at(i)
      t.equal(post.key(), i.toString())
      t.deepEqual(post.props(), posts[i])
    }

    t.end()
  })
})
