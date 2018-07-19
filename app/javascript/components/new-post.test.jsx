import React from 'react'
import { shallow, mount } from 'enzyme'
import test from 'tape'

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

test('components/NewPost', () => {
  test('[expanded=false]', t => {
    const props = buildComponentProps({ expanded: false })
    const component = shallow(<NewPost {...props} />)
    t.ok(component.is('Button'),
         'is a <Button>')
    t.equal(component.prop('onClick'), props.onOpen,
            'Button\'s onClick is onOpen')
    t.end()
  })

  test('[expanded=true]', t => {
    const source = 'Foo'
    const props = buildComponentProps({
      expanded: true,
      source,
    })
    jsdomInit()
    const component = mount(<NewPost {...props} />)

    const markdown = component.find('ReactMarkdown')
    t.equal(markdown.length, 1,
            'has 1 <ReactMarkdown>')
    t.equal(markdown.prop('source'), source,
            'contains a <ReactMarkdown> whose @source is @source')

    const button = component.find('Button')
    t.equal(button.prop('onClick'), props.onCancel,
            '@onCancel is attached to a <Button>')

    const textarea = component.find('textarea')
    t.equal(textarea.length, 1,
            'has 1 <textarea>')
    t.equal(textarea.prop('value'), source,
            'contains a <textarea> whose @value is @source')

    t.false(props.onChange.called,
            '@onChange not called before <textarea> changed')
    // set a different value to ensure the handler gets the actual value in the input:
    const newTextareaValue = 'Bar'
    textarea.getDOMNode().value = newTextareaValue
    textarea.simulate('change')
    t.true(props.onChange.called,
           '@onChange was called after <textarea> changed')
    t.deepEqual(props.onChange.args, [newTextareaValue],
                '@onChange called with <textarea> .value')

    const form = component.find('form')
    t.false(props.onSubmit.called,
            '@onSubmit not called before <form> sumitted')
    const evt = {
      preventDefault: mock(),
    }
    form.simulate('submit', evt)
    t.true(props.onSubmit.called,
           '@onSubmit was called after <form> sumitted')
    t.true(evt.preventDefault.called,
           '<form> onSubmit handler preventsDefault')

    t.end()
  })
})
