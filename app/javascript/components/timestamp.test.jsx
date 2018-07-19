import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import delay from 'delay'

import Timestamp from './timestamp'

describe('components/Timestamp', () => {
  test('displays the moment.js relative string', () => {
    const cases = [
      moment(),
      moment().subtract(1, 'minutes'),
      moment().subtract(2, 'minutes'),
      moment().subtract(1, 'hours'),
      moment().subtract(5, 'hours'),
      moment().subtract(5, 'days'),
    ]

    cases.forEach(timestamp => {
      test(timestamp.fromNow(), () => {
        expect.assertions(3)
        const component = shallow(
          <Timestamp timestamp={timestamp} />,
          { disableLifecycleMethods: true },
        )
        const el = component.find('abbr.timestamp')
        expect(el).toBeTruthy()
        expect(el.render().attr('title')).toBe(timestamp.toString())
        expect(component.text()).toBe(timestamp.fromNow())
      })
    })
  })

  test('updates itself', async () => {
    const thresh = moment.relativeTimeThreshold('s')
    const timestamp = moment().subtract(thresh - 1, 'seconds')

    const component = shallow(<Timestamp timestamp={timestamp} />)

    const text0 = component.text()

    await delay(1100) // wait over a second. moment output will be different and tick() should have occured to update the component
    component.update() // ask Enzyme to update it's rendered state, which seems neccesary for some reason

    expect(text0).not.toBe(component.text())

    component.unmount() // unmount to clearInterval so test doesn't hang
  })
})
