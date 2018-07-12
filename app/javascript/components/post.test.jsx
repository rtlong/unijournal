import React from 'react'
import { shallow, mount } from 'enzyme'
import Markdown from 'react-markdown'

import { test } from '../../../test-helper'
import Post from './post'

test('Post / renders @body using <ReactMarkdown/>', t => {
  const body = 'some text'
  const timestamp = new Date()
  const component = shallow(<Post body={body} timestamp={timestamp}/>)
  const markdown = component.find(Markdown)
  const mdSrc = markdown.prop('source') || markdown.prop('children')
  t.equal(mdSrc, body,
          'renders @body as @source in a <ReactMarkdown />')
  t.end()
})

test('Post / renders timestamp using <Timestamp />', t => {
  const body = 'some text'
  const timestamp = new Date()
  const component = shallow(<Post body={body} timestamp={timestamp}/>)
  t.equal(component.find('Timestamp').prop('timestamp'), timestamp,
          'gives @timestamp as @timestamp to a <Timestamp>')
  t.end()
})
