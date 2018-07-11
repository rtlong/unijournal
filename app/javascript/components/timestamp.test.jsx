import renderer from 'react-test-renderer'
import test from 'ava'
import Timestamp from './timestamp'

test('it looks correct', t => {
  const ts = new Date()
  const component = renderer.create(<Timestamp timestamp={ts} />)

  let tree = component.toJSON()
  t.is(tree)
})
