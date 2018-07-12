import React from 'react'
import { shallow, mount } from 'enzyme'

import { test, jsdomInit } from '../../../test-helper'
import Link from './link'

test('Link / looks correct', t => {
  const text = 'Some text.'
  const onClick = () => {}
  const component = shallow(<Link label={text} onClick={onClick}/>)
  t.equal(component.text(), text, 'text() matches @label')
  t.end()
})

test('Link / registers the onClick handler', t => {
  const text = 'Some text.'
  let clicked = false
  const onClick = e => { clicked = e }

  jsdomInit()
  const component = mount(<Link label={text} onClick={onClick}/>)

  t.false(clicked,
          'onClick has not fired before being clicked')

  component.find('a').simulate('click')

  t.true(clicked,
         'onClick has fired after being clicked')

  t.equal(clicked.target.outerHTML, component.html(),
          'onClick is fired with the event')

  t.true(clicked.defaultPrevented,
         'onClick prevents default behavior')

  t.end()
})
