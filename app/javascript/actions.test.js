import { test, mockStore } from '../../test-helper'
import ACTIONS, {
  addPost,
  newPostFormOpen,
  newPostFormClose,
  newPostSourceChanged,
} from './actions'
import reducer from './reducer'

const initialState = reducer(undefined, { type: '@@redux/INIT-test' })

test('actions', suite => {
  suite.test('addPost', t => {
    t.test('when newPostForm.source empty', st => {
      const store = mockStore(initialState)

      store.dispatch(addPost())
      const actions = store.getActions()
      st.equal(actions.length, 0, 'does nothing when no source')

      st.end()
    })


    t.test('when newPostForm.source has content', st => {
      const state = { ...initialState }
      state.newPostForm.source = 'foo bar'
      const store = mockStore(state)

      store.dispatch(addPost())
      const actions = store.getActions()
      st.equal(actions.length, 1)
      const action = actions[0]
      st.equal(action.type, ACTIONS.ADD_POST)
      const { body, timestamp } = action.payload
      st.equal(body, 'foo bar')
      st.ok(timestamp instanceof Date)

      st.end()
    })
  })


  suite.test('newPostFormClose', t => {
    const action = newPostFormClose()
    t.equal(action.type, ACTIONS.NEW_POST_FORM_EXPAND)
    t.equal(action.payload, false)

    t.end()
  })

  suite.test('newPostFormOpen', t => {
    const action = newPostFormOpen()
    t.equal(action.type, ACTIONS.NEW_POST_FORM_EXPAND)
    t.equal(action.payload, true)

    t.end()
  })

  suite.test('newPostSourceChanged', t => {
    const action = newPostSourceChanged('foo bar')
    t.equal(action.type, ACTIONS.NEW_POST_SOURCE_CHANGED)
    t.equal(action.payload, 'foo bar')

    t.end()
  })
})
