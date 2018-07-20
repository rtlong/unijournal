import expect from "expect"
import React from "react"
import { shallow } from "enzyme"
import PostList from "./post-list"

describe("components/PostList", () => {
  test("looks correct", () => {
    const posts = [
      {
        id: 0,
        body: "foo bar",
        timestamp: new Date(),
      },
      {
        id: 1,
        body: "bar crawl",
        timestamp: new Date(),
      },
    ]

    const component = shallow(<PostList posts={posts} />)
    const postComponents = component.find("Post")

    expect(postComponents.length).toBe(posts.length)

    posts.forEach((post, i) => {
      const postComponent = postComponents.at(i)
      expect(postComponent.key()).toBe(post.id.toString())
      expect(postComponent.props()).toEqual(post)
    })
  })
})
