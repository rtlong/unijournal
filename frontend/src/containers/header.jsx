import React from "react"
import { connect } from "react-redux"

import StorageInfo from "./storage-info"
import UserInfo from "./user-info"

const Header = () => (
  <div className="header">
    <h1>Journal</h1>
    <UserInfo />
    <StorageInfo />
  </div>
)

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(Header)
