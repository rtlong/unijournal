import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'

Moment.relativeTimeThreshold('ss', 3) // make it count up seconds until 45s

function computeTextFromDate(date) {
  const moment = Moment(date)
  return moment.fromNow()
}

class Timestamp extends React.Component {
  static propTypes = {
    timestamp: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(Moment),
    ]).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      text: computeTextFromDate(props.timestamp),
    }
  }

  componentDidMount() {
    this.scheduleNextTick()
  }

  componentDidUpdate(prevProps) {
    const { timestamp } = this.props
    if (timestamp !== prevProps.timestamp) {
      clearTimeout(this.timerId)
      this.tick()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  tick() {
    const { timestamp } = this.props
    this.setState({
      text: computeTextFromDate(timestamp),
    })
    this.scheduleNextTick()
  }

  scheduleNextTick() {
    const { moment } = this.state
    const diff = Moment().diff(moment)
    const nextInterval = diff < 60000 ? 1000 : 10000
    this.timerId = setTimeout(() => this.tick(), nextInterval)
  }

  render() {
    const { timestamp } = this.props
    const { text } = this.state
    return (
      <abbr title={timestamp.toString()} className="timestamp">
        {text}
      </abbr>
    )
  }
}

export default Timestamp
