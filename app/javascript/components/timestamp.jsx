import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'

class Timestamp extends React.Component {
  static propTypes = {
    updateInterval: PropTypes.number,
    timestamp: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(Moment),
    ]).isRequired,
  }

  static defaultProps = {
    updateInterval: 30000,
  }

  constructor(props) {
    super(props)
    this.moment = Moment(props.timestamp)
    this.state = {
      text: this.moment.fromNow(),
    }
  }

  componentDidMount() {
    const { updateInterval } = this.props
    this.timerId = setInterval(() => this.tick(), updateInterval)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick() {
    this.setState({
      text: this.moment.fromNow(),
    })
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
