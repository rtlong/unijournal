import * as Messages from "../entities/messages"
import { MESSAGES_ADD, MESSAGES_DEL } from "../action_types"

export default function messagesReducer(state = Messages.empty, { type, payload }) {
  switch (type) {
    case MESSAGES_ADD:
      return Messages.add(state, payload)

    case MESSAGES_DEL:
      return Messages.del(state, payload.id)

    default:
      return state
  }
}
