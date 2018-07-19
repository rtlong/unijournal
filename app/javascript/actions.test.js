import expect from 'expect'
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

function testSimpleActionCreator(actionCreator, expectedAction) {
  test(actionCreator.name, async () => {
    const store = mockStore(initialState)
    await store.dispatch(actionCreator())
    const actions = store.getActions()
    expect(actions.length).toBe(1)
    const action = actions[0]
    expect(action).toEqual(expectedAction)
  })
}

describe('actions', () => {
  describe.skip('createPost', () => {
    test('when newPostForm.source empty', async () => {
      const store = mockStore(initialState)

      await store.dispatch(createPost())
      const actions = store.getActions()
      expect(actions.length).toBe(0)
    })

    test('when newPostForm.source has content', async () => {
      const state = { ...initialState }
      state.newPostForm.source = 'foo bar'
      const store = mockStore(state)

      await store.dispatch(createPost())
      const actions = store.getActions()

      expect(actions.length).toBe(1)

      const { type, payload: { body, timestamp } } = actions[0]

      expect(type).toBe(ACTIONS.ADD_POST)
      expect(body).toBe('foo bar')
      expect(timestamp instanceof Date).toBeTruthy()
    })
  })

  testSimpleActionCreator(() => addPost({ body: 'foo' }),
                          { type: ACTIONS.POSTS_ADD, payload: { body: 'foo' } })

  testSimpleActionCreator(newPostFormClose,
                          { type: ACTIONS.NEW_POST_FORM_EXPAND, payload: false })

  testSimpleActionCreator(newPostFormOpen,
                          { type: ACTIONS.NEW_POST_FORM_EXPAND, payload: true })

  testSimpleActionCreator(() => newPostSourceChanged('foo bar'),
                          { type: ACTIONS.NEW_POST_SOURCE_CHANGED, payload: 'foo bar' })
})
