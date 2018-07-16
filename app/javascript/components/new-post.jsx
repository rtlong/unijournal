import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

import Button from './button'

const NewPost = ({ expanded, source, onOpen, onCancel, onChange, onSubmit }) => {
  let input
  const submit = e => {
    e.preventDefault()
    onSubmit()
  }

  return expanded ? (
    <div>
      <Button label="Close" onClick={onCancel} />
      <div>
        <form onSubmit={submit}>
          <textarea value={source} onChange={({ target }) => onChange(target.value)} />
          <input type="submit" />
        </form>
        <Markdown source={source} />
      </div>
    </div>
  ) : (
    <Button label="New Post" onClick={onOpen} />
  )
}

NewPost.defaultProps = {
  source: '',
}

NewPost.propTypes = {
  expanded: PropTypes.bool.isRequired,
  source: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NewPost
