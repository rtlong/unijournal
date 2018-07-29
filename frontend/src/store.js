import { createStore, compose, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"

import reducer from "./reducer"

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default state => createStore(reducer, state, composeEnhancers(applyMiddleware(ReduxThunk)))
