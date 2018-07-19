import test from 'tape'
import { mockStore } from '../../test-helper'
import ACTIONS, {
  addPost,
  newPostFormOpen,
  newPostFormClose,
  newPostSourceChanged,
  createPost,
} from './actions'
import reducer from './reducer'

const initialState = reducer(undefined, { type: '@@redux/INIT-test' })

test('actions', suite => {
  suite.test('createPost', { skip: true }, t => {
    t.test('when newPostForm.source empty', async st => {
      const store = mockStore(initialState)

      await store.dispatch(createPost())
      const actions = store.getActions()
      st.equal(actions.length, 0, 'does nothing when no source')
    })

    t.test('when newPostForm.source has content', async st => {
      const state = { ...initialState }
      state.newPostForm.source = 'foo bar'
      const store = mockStore(state)

      await store.dispatch(createPost())
      const actions = store.getActions()

      st.equal(actions.length, 1)

      const { type, payload: { body, timestamp } } = actions[0]

      st.equal(type, ACTIONS.ADD_POST)
      st.equal(body, 'foo bar')
      st.ok(timestamp instanceof Date)
    })
  })

  function testSimpleActionCreator(actionCreator, expectedAction) {
    suite.test(actionCreator.name, async t => {
      const store = mockStore(initialState)
      await store.dispatch(actionCreator())
      const actions = store.getActions()
      t.equal(actions.length, 1)
      const action = actions[0]
      t.deepEqual(action, expectedAction)
    })
  }

  testSimpleActionCreator(() => addPost({ body: 'foo' }),
                          { type: ACTIONS.POSTS_ADD, payload: { body: 'foo' } })
  testSimpleActionCreator(newPostFormClose, { type: ACTIONS.NEW_POST_FORM_EXPAND, payload: false })
  testSimpleActionCreator(newPostFormOpen, { type: ACTIONS.NEW_POST_FORM_EXPAND, payload: true })
  testSimpleActionCreator(() => newPostSourceChanged('foo bar'),
                          { type: ACTIONS.NEW_POST_SOURCE_CHANGED, payload: 'foo bar' })
})
