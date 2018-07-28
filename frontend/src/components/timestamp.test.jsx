import expect from "expect"
import React from "react"
import { shallow } from "enzyme"
import moment from "moment"

import Timestamp from "./timestamp"

describe("components/Timestamp", () => {
  const component = props => <Timestamp {...props} />

  describe("displays the moment.js relative string", () => {
    ;[
      moment(),
      moment().subtract(1, "minutes"),
      moment().subtract(2, "minutes"),
      moment().subtract(1, "hours"),
      moment().subtract(5, "hours"),
      moment().subtract(5, "days"),
    ].forEach(timestamp => {
      test(timestamp.fromNow(), () => {
        const wrapper = shallow(component({ timestamp }), {
          disableLifecycleMethods: true,
        })
        const el = wrapper.find("abbr.timestamp")
        expect(el).toBeTruthy()
        expect(el.render().attr("title")).toBe(timestamp.toString())
        expect(wrapper.text()).toBe(timestamp.fromNow())
      })
    })
  })

  test("handles updates to props", () => {
    const timestamp0 = new Date()
    const timestamp1 = new Date(Date.now() - 60000) // 60 seconds ago
    const wrapper = shallow(component({ timestamp: timestamp0 }))

    expect(wrapper.text()).toBe("a few seconds ago")
    wrapper.setProps({
      timestamp: timestamp1,
    })
    expect(wrapper.text()).toBe("a minute ago")
  })

  test("updates itself", () => {
    jest.useFakeTimers()
    let now = Date.now()
    jest.spyOn(Date, "now").mockImplementation(() => now)

    const thresh = moment.relativeTimeThreshold("s")
    const timestamp = moment(now).subtract(thresh - 1, "seconds")
    const wrapper = shallow(component({ timestamp }))

    const text = wrapper.text()

    const tickLength = 1000
    now += tickLength // advance time by 1s
    jest.advanceTimersByTime(tickLength) // run the timeouts the component sets up
    wrapper.update() // force update Enzyme's view of component

    expect(wrapper.text()).not.toBe(text)
  })

  test("cleans up it's timers at unmount", () => {
    const timestamp = new Date()
    const wrapper = shallow(component({ timestamp }))

    jest.spyOn(global, "clearTimeout")
    const { timerId } = wrapper.instance()
    wrapper.unmount()
    expect(global.clearTimeout).toHaveBeenCalledTimes(1)
    expect(global.clearTimeout).toHaveBeenCalledWith(timerId)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.useRealTimers()
  })
})
