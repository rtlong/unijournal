import EnzymeReactAdapter from 'enzyme-adapter-react-16'
import { configure as configureEnzyme } from 'enzyme'
import test from 'blue-tape'
import { JSDOM } from 'jsdom'

configureEnzyme({ adapter: new EnzymeReactAdapter() })

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .reduce((result, prop) => ({
          ...result,
          [prop]: Object.getOwnPropertyDescriptor(src, prop),
        }), {})
  Object.defineProperties(target, props)
}

export function jsdomInit() {
  if (global.document) return

  const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
  const { window } = jsdom

  global.window = window
  global.document = window.document
  global.navigator = {
    userAgent: 'node.js',
  }
  copyProps(window, global)
}

export function mock() {
  let m = function () {
    m.called = true
    m.args = Array.from(arguments)
  }
  m.called = false
  m.args = null
  return m
}

export { test }
