import React from "react"
import { connect } from "react-redux"
import { authRequest } from "../actions"
import Button from "../components/button"

const UserInfo = ({ username }) => {
  return username ? <div>Welcome @{username}</div> : <Button onClick={authRequest} label="Login" />
}

function mapStateToProps(state) {
  return state.auth.user
}

export default connect(mapStateToProps)(UserInfo)
