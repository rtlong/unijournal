import configureStore from "redux-mock-store"
import ReduxThunk from "redux-thunk"

export default function mockStore(getState) {
  return configureStore([ReduxThunk])(getState)
}
