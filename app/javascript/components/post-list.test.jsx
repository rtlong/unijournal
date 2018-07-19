import React from 'react'
import { shallow } from 'enzyme'
import test from 'tape'
import PostList from './post-list'

test('components/PostList', suite => {
  suite.test('looks correct', t => {
    const posts = [
      {
        id: 0,
        body: 'foo bar',
        timestamp: new Date(),
      },
      {
        id: 1,
        body: 'bar crawl',
        timestamp: new Date(),
      },
    ]

    const component = shallow(<PostList posts={posts} />)
    const postComponents = component.find('Post')

    t.equal(postComponents.length, posts.length)

    posts.forEach((post, i) => {
      const postComponent = postComponents.at(i)
      t.equal(postComponent.key(), post.id.toString())
      t.deepEqual(postComponent.props(), post)
    })

    t.end()
  })
})
