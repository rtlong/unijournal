import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
import test from 'blue-tape'

configure({ adapter: new Adapter() })

export default test
