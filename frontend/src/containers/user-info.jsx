import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { authLogIn, authLogOut } from "../action-thunks/auth"
import Button from "../components/button"

const LoginButton = ({ onClick }) => <Button onClick={onClick} label="Login" />
LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

const SessionInfo = ({ username, onLogOut }) => (
  <div>
    Logged in: @{username}
    <Button onClick={onLogOut} label="Log Out" />
  </div>
)
SessionInfo.propTypes = {
  username: PropTypes.string.isRequired,
  onLogOut: PropTypes.func.isRequired,
}

const UserInfo = ({ user, logOut }) =>
  user ? (
    <SessionInfo onLogOut={logOut} username={user.username} />
  ) : (
    <LoginButton onClick={authLogIn} />
  )

UserInfo.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  logOut: PropTypes.func.isRequired,
  /* logIn: PropTypes.func.isRequired, */
}
UserInfo.defaultProps = {
  user: null,
}

const mapStateToProps = state => ({ user: state.auth.user })

export default connect(
  mapStateToProps,
  {
    logOut: authLogOut,
  },
)(UserInfo)
