import React from "react"
import PropTypes from "prop-types"

/* eslint-disable react/button-has-type */
// See https://github.com/yannickcr/eslint-plugin-react/issues/1846

const Button = ({ label, type, onClick }) => (
  <button type={type} onClick={onClick}>
    {label}
  </button>
)

Button.defaultProps = {
  type: "button",
  onClick: () => {},
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["submit", "reset", "button"]),
  onClick: PropTypes.func,
}

export default Button
