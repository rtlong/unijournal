import expect from 'expect'
import React from 'react'
import { shallow, mount } from 'enzyme'

import { mock, jsdomInit } from '../../../test-helper'
import NewPost from './new-post'

function buildComponentProps(opts) {
  return Object.assign({
    expanded: false,
    source: '',
    onSubmit: mock(),
    onOpen: mock(),
    onCancel: mock(),
    onChange: mock(),
  }, opts)
}

describe('components/NewPost', () => {
  describe('[expanded=false]', () => {
          const props = buildComponentProps({ expanded: false })
          const component = shallow(<NewPost {...props} />)
          expect(component.is('Button')).toBeTruthy()
          expect(component.prop('onClick')).toBe(props.onOpen)
  })

  test('[expanded=true]', () => {
          const source = 'Foo'
          const props = buildComponentProps({
            expanded: true,
            source,
          })
          jsdomInit()
          const component = mount(<NewPost {...props} />)

          const markdown = component.find('ReactMarkdown')
          expect(markdown.length).toBe(1)
          expect(markdown.prop('source')).toBe(source)

          const button = component.find('Button')
          expect(button.prop('onClick')).toBe(props.onCancel)

          const textarea = component.find('textarea')
          expect(textarea.length).toBe(1)
          expect(textarea.prop('value')).toBe(source)

          expect(props.onChange.called).toBeFalsy()
          // set a different value to ensure the handler gets the actual value in the input:
          const newTextareaValue = 'Bar'
          textarea.getDOMNode().value = newTextareaValue
          textarea.simulate('change')
          expect(props.onChange.called).toBeTruthy()
          expect(props.onChange.args).toEqual([newTextareaValue])

          const form = component.find('form')
          expect(props.onSubmit.called).toBeFalsy()
          const evt = {
            preventDefault: mock(),
          }
          form.simulate('submit', evt)
          expect(props.onSubmit.called).toBeTruthy()
          expect(evt.preventDefault.called).toBeTruthy()
  })
})
