import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class Timestamp extends React.Component {
  constructor(props) {
    super(props)
    let mo = moment(this.props.timestamp)
    this.state = {
      moment: mo,
      text: mo.fromNow(),
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 30000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick() {
    this.setState({
      text: this.state.moment.fromNow(),
    })
  }

  render() {
    return (
      <abbr title={this.props.timestamp.toString()} className="timestamp">{this.state.text}</abbr>
    )
  }
}

export default Timestamp
