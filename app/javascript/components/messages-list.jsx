import React from 'react'
import PropTypes from 'prop-types'

export default function MessagesList(props) {
  const { items } = props
  return (
    <ul>
      {items.map(message => (
        <li key={message.id} className={message.type}>
          {message.message}
        </li>
      ))}
    </ul>
  )
}

MessagesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}
