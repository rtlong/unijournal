import React from 'react'
import { shallow } from 'enzyme'
import Markdown from 'react-markdown'

import { test } from '../../../test-helper'
import Post from './post'

test('components/Post', suite => {
  const body = 'some text'
  const timestamp = new Date()
  const component = shallow(<Post body={body} timestamp={timestamp} />)

  suite.test('renders @body using <ReactMarkdown/>', t => {
    const markdown = component.find(Markdown)
    const mdSrc = markdown.prop('source') || markdown.prop('children')
    t.equal(mdSrc, body,
            'renders @body as @source in a <ReactMarkdown />')
    t.end()
  })

  suite.test('renders timestamp using <Timestamp />', t => {
    t.equal(component.find('Timestamp').prop('timestamp'), timestamp,
            'gives @timestamp as @timestamp to a <Timestamp>')
    t.end()
  })
})
