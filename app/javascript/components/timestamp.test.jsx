import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import delay from 'delay'

import { test } from '../../../test-helper'
import Timestamp from './timestamp'

test('Timestamp / displays the moment.js relative string', t => {
  const cases = [
    moment(),
    moment().subtract(1, 'minutes'),
    moment().subtract(2, 'minutes'),
    moment().subtract(1, 'hours'),
    moment().subtract(5, 'hours'),
    moment().subtract(5, 'days'),
  ]

  cases.forEach(timestamp => {
    t.test(t.name + ' / ' + timestamp.fromNow(), st => {
      st.plan(3)
      const component = shallow(
        <Timestamp timestamp={timestamp}/>,
        { disableLifecycleMethods: true })
      const el = component.find('abbr.timestamp')
      st.ok(el,
            'should have correct element')
      st.equal(el.render().attr('title'), timestamp.toString(),
               '@title should equal exact timestamp')
      st.equal(component.text(), timestamp.fromNow(),
               'text should be moment.js fromNow()')
    })
  })

  t.end()
})

test('Timestamp / updates itself', async t => {
  const timestamp = moment().subtract(44, 'seconds') // moment splits from 'a few seconds ago' to 'a minute ago' at 45 seconds
  const component = shallow(<Timestamp timestamp={timestamp} updateInterval={250}/>)
  const el = component.find('abbr.timestamp')
  t.equal(component.text(), 'a few seconds ago',
          'shows "a few seconds ago" for 44 seconds ago')
  await delay(1100) // wait over a second. moment output will be different and several tick()'s should have occured to update the component
  component.update() // ask Enzyme to update it's rendered state, which seems neccesary for some reason
  t.equal(component.text(), 'a minute ago',
          'updates self to "a minute ago" for 45 seconds ago')

  component.unmount() // unmount to clearInterval so test doesn't hang
})
