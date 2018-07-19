import React from 'react'
import { shallow, mount } from 'enzyme'

import test from 'tape'
import { jsdomInit } from '../../../test-helper'
import Button from './button'

test('components/Button', suite => {
  suite.test('looks correct', t => {
    const text = 'Some text.'
    const component = shallow(<Button label={text} />)
    t.equal(component.text(), text, 'text() matches @label')
    t.end()
  })

  suite.test('registers the onClick handler', t => {
    const text = 'Some text.'
    let clicked = false
    const onClick = e => { clicked = e }

    jsdomInit()
    const component = mount(<Button label={text} onClick={onClick} />)

    t.false(clicked,
            'onClick has not fired before being clicked')

    component.find('button').simulate('click')

    t.true(clicked,
           'onClick has fired after being clicked')

    t.equal(clicked.target.outerHTML, component.html(),
            'onClick is fired with the event')

    t.end()
  })

  suite.test('accepts a @type', t => {
    const text = 'Some text.'

    let component = shallow(<Button label={text} type="submit" />)
    t.equal(component.text(), text, 'text() matches @label')
    t.equal(component.find('button').prop('type'), 'submit')

    component = shallow(<Button label={text} type="reset" />)
    t.equal(component.text(), text, 'text() matches @label')
    t.equal(component.find('button').prop('type'), 'reset')

    component = shallow(<Button label={text} type="button" />)
    t.equal(component.text(), text, 'text() matches @label')
    t.equal(component.find('button').prop('type'), 'button')

    t.end()
  })
})
