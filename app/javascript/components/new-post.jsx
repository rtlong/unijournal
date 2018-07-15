import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

import Link from './link'

const NewPost = props => {
  let input
  const onSubmit = e => {
    e.preventDefault()
    props.onSubmit()
  }

  return props.expanded ? (
    <div>
      <Link label="Close" onClick={props.onCancel} />
      <div>
        <form onSubmit={onSubmit}>
          <textarea value={props.source} onChange={e => props.onChange(e.target.value)} />
          <input type="submit" />
        </form>
        <Markdown source={props.source} />
      </div>
    </div>
  ) : (
    <Link label="New Post" onClick={props.onOpen} />
  )
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
