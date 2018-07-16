import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'

Moment.relativeTimeThreshold('ss', 3) // make it count up seconds until 45s

class Timestamp extends React.Component {
  static propTypes = {
    timestamp: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(Moment),
    ]).isRequired,
  }

  constructor(props) {
    super(props)
    this.moment = Moment(props.timestamp)
    this.state = {
      text: this.computeText(),
    }
  }

  componentDidMount() {
    this.scheduleNextTick()
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  computeText() {
    return this.moment.fromNow()
  }

  tick() {
    const text = this.computeText()
    this.setState({
      text,
    })
    this.scheduleNextTick()
  }

  scheduleNextTick() {
    const diff = Moment().diff(this.moment)
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
