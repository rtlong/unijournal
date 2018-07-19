
import { connect } from 'react-redux'

import MessagesList from '../components/messages-list'
import * as Messages from '../entities/messages'

function mapStateToProps(state) {
  return {
    items: Messages.all(state.messages),
  }
}

export default connect(mapStateToProps)(MessagesList)
