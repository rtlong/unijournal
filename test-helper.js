import { JSDOM } from "jsdom"
import configureStore from "redux-mock-store"
import ReduxThunk from "redux-thunk"

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === "undefined")
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {},
    )
  Object.defineProperties(target, props)
}

export function jsdomInit() {
  if (global.document) return

  const jsdom = new JSDOM("<!doctype html><html><body></body></html>")
  const { window } = jsdom

  global.window = window
  global.document = window.document
  global.navigator = {
    userAgent: "node.js",
  }
  copyProps(window, global)
}

export function mockStore(getState) {
  return configureStore([ReduxThunk])(getState)
}
