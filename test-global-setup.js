import { configure as configureEnzyme } from 'enzyme'
import EnzymeReactAdapter from 'enzyme-adapter-react-16'

configureEnzyme({ adapter: new EnzymeReactAdapter() })
