import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

import Link from './link'

const NewPost = props => {
  let input
  let onSubmit = e => {
    e.preventDefault()
    props.onNewPostSubmit()
  }

  return props.expanded ? (
    <div>
      <Link label="Close" onClick={props.onNewPostCancel} />
      <div>
        <form onSubmit={onSubmit}>
          <textarea value={props.source} onChange={e => props.onNewPostChanged(e.target.value)}/>
          <input type="submit"/>
        </form>
        <Markdown source={props.source}/>
      </div>
    </div>
  ) : (
    <Link label="New Post" onClick={props.onNewPostOpen} />
  )
}

NewPost.propTypes = {
  expanded: PropTypes.bool.isRequired,
  source: PropTypes.string,
  onNewPostSubmit: PropTypes.func.isRequired,
  onNewPostOpen: PropTypes.func.isRequired,
  onNewPostCancel: PropTypes.func.isRequired,
  onNewPostChanged: PropTypes.func.isRequired,
}

export default NewPost
