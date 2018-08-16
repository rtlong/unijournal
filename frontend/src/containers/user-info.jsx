import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { authRequest } from "../actions"
import Button from "../components/button"

const UserInfo = ({ username }) => {
  return username ? <div>Welcome @{username}</div> : <Button onClick={authRequest} label="Login" />
}

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
}

const mapStateToProps = state => state.auth.user || {}

export default connect(mapStateToProps)(UserInfo)
