import EnzymeReactAdapter from 'enzyme-adapter-react-16'
import { configure as configureEnzyme } from 'enzyme'
import { JSDOM } from 'jsdom'
import configureStore from 'redux-mock-store'
import ReduxThunk from 'redux-thunk'

beforeAll(() => {
  configureEnzyme({ adapter: new EnzymeReactAdapter() })
})


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
  const m = function mockedFunc(...args) {
    m.called = true
    m.args = args
  }
  m.called = false
  m.args = null
  return m
}

export function mockStore(getState) {
  return configureStore([ReduxThunk])(getState)
}
