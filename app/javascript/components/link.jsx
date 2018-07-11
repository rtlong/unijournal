import React from 'react'
import PropTypes from 'prop-types'

const Link = props => (
  <a onClick={e => { e.preventDefault(); props.onClick(e) }}>{props.label}</a>
)

Link.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Link
