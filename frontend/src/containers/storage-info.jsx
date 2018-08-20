import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

import { unlockRepo, lockRepo } from "../action-thunks/repo"
import Button from "../components/button"

const StorageInfo = ({ locked, dbName, unlockRepo, lockRepo }) => {
  const onSubmit = evt => {
    evt.preventDefault()
    const password = evt.target.password.value
    if (!password) return
    unlockRepo(password)
  }

  return (
    <div className="storage-info">
      Database: {dbName} {locked ? "(locked)" : "(unlocked)"}
      {locked ? (
        <form onSubmit={onSubmit}>
          <label>
            Enter DB password to unlock: <input type="password" name="password" />
          </label>
        </form>
      ) : (
        <Button onClick={lockRepo} label="lock" />
      )}
    </div>
  )
}

StorageInfo.propTypes = {
  locked: PropTypes.bool.isRequired,
  dbName: PropTypes.string.isRequired,
  unlockRepo: PropTypes.func.isRequired,
  lockRepo: PropTypes.func.isRequired,
}

const StorageInfoContainer = props => (props.dbName ? <StorageInfo {...props} /> : "")

export default connect(
  state => state.repo,
  { unlockRepo, lockRepo },
)(StorageInfoContainer)
