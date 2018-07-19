import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'

import Markdown from 'react-markdown'
import Post from './post'

describe('components/Post', () => {
  const body = 'some text'
  const timestamp = new Date()
  const component = shallow(<Post body={body} timestamp={timestamp} />)

  test('renders @body using <ReactMarkdown/>', () => {
    const markdown = component.find(Markdown)
    const mdSrc = markdown.prop('source') || markdown.prop('children')
    expect(mdSrc).toBe(body)
  })

  test('renders timestamp using <Timestamp />', () => {
    expect(component.find('Timestamp').prop('timestamp')).toBe(timestamp)
  })
})
