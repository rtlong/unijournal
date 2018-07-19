import expect from 'expect'
import React from 'react'

import { shallow, mount } from 'enzyme'
import { jsdomInit } from '../../../test-helper'
import Button from './button'

describe('components/Button', () => {
  test('looks correct', () => {
    const text = 'Some text.'
    const component = shallow(<Button label={text} />)
    expect(component.text()).toBe(text)
  })

  test('registers the onClick handler', () => {
    const text = 'Some text.'
    let clicked = false
    const onClick = e => { clicked = e }

    jsdomInit()
    const component = mount(<Button label={text} onClick={onClick} />)

    expect(clicked).toBeFalsy()

    component.find('button').simulate('click')

    expect(clicked).toBeTruthy()

    expect(clicked.target.outerHTML).toBe(component.html())
  })

  test('accepts a @type', () => {
    const text = 'Some text.'

    let component = shallow(<Button label={text} type="submit" />)
    expect(component.text()).toBe(text)
    expect(component.find('button').prop('type')).toBe('submit')

    component = shallow(<Button label={text} type="reset" />)
    expect(component.text()).toBe(text)
    expect(component.find('button').prop('type')).toBe('reset')

    component = shallow(<Button label={text} type="button" />)
    expect(component.text()).toBe(text)
    expect(component.find('button').prop('type')).toBe('button')
  })
})
