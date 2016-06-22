////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition`a a "higher-order component" that sends the mouse
// position to the component as props.
//
// hint: use `event.clientX` and `event.clientY`

import React from 'react'
import {render} from 'react-dom'

const withMousePosition = (Component) => {
  return React.createClass({
    getInitialState() {
      return {
        mouse: {x: 0, y: 0}
      }
    },

    handleMouseMove(event) {
      this.setState({
        mouse: {
          x: event.clientX,
          y: event.clientY
        }
      })
    },
    componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove)
    },

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove)
    },

    render() {
      return <Component mouse={this.state.mouse}/>
    }
  })
}

const App = React.createClass({

  propTypes: {
    mouse: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    })
  },

  render() {
    return (
      <div>
        <h1>With the mouse!</h1>
        <pre>{JSON.stringify(this.props.mouse || null, null, 2)}</pre>
      </div>
    )
  }

})

const AppWithMouse = withMousePosition(App)

render(<AppWithMouse/>, document.getElementById('app'))

