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

  static defaultProps = {
    updateInterval: 30000,
  }

  static propTypes = {
    updateInterval: PropTypes.number.isRequired,
    timestamp: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
    ]).isRequired,
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), this.props.updateInterval)
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
      <abbr title={this.props.timestamp.toString()} className="timestamp">
        {this.state.text}
      </abbr>
    )
  }
}

export default Timestamp
