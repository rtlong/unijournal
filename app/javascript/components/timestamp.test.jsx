import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import delay from 'delay'

import { test } from '../../../test-helper'
import Timestamp from './timestamp'

test('components/Timestamp', suite => {
  suite.test('displays the moment.js relative string', t => {
    const cases = [
      moment(),
      moment().subtract(1, 'minutes'),
      moment().subtract(2, 'minutes'),
      moment().subtract(1, 'hours'),
      moment().subtract(5, 'hours'),
      moment().subtract(5, 'days'),
    ]

    cases.forEach(timestamp => {
      t.test(timestamp.fromNow(), st => {
        st.plan(3)
        const component = shallow(
          <Timestamp timestamp={timestamp} />,
          { disableLifecycleMethods: true },
        )
        const el = component.find('abbr.timestamp')
        st.ok(el,
              'should have correct element')
        st.equal(el.render().attr('title'), timestamp.toString(),
                 '@title should equal exact timestamp')
        st.equal(component.text(), timestamp.fromNow(),
                 'text should be moment.js fromNow()')
      })
    })
  })

  suite.test('updates itself', async t => {
    const thresh = moment.relativeTimeThreshold('s')
    const timestamp = moment().subtract(thresh - 1, 'seconds')

    const component = shallow(<Timestamp timestamp={timestamp} />)

    const text0 = component.text()

    await delay(1100) // wait over a second. moment output will be different and tick() should have occured to update the component
    component.update() // ask Enzyme to update it's rendered state, which seems neccesary for some reason

    t.notEqual(text0, component.text(),
               'updates text over time')

    component.unmount() // unmount to clearInterval so test doesn't hang
  })
})
