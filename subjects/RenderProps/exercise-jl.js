////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a child render callback that passes
//   to <App> the latitude and longitude state
// - When you're done, <App> should no longer have anything but
//   a render method
//
// Got extra time?
//
// - Now create a <GeoAddress> component that also uses a render
//   callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address, it returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render it
// - Make sure <GeoAddress> supports the user moving positions
import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import LoadingDots from './utils/LoadingDots'
import getAddressFromCoords from './utils/getAddressFromCoords'

class GeoPosition extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null
  }

  geoId = null

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      },
      (error) => {
        this.setState({error})
      }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId)
  }

  render() {
    return this.props.children(this.state)
  }
}

class GeoAddress extends React.Component {
  static propTypes = {
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    children: PropTypes.func
  }

  state = {address: null}

  fetch() {
    const {longitude, latitude} = this.props
    getAddressFromCoords(latitude, longitude)
      .then(address => this.setState({address}))
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.longitude !== this.props.longitude ||
      prevProps.latitude !== this.props.latitude
    )
      this.fetch()
  }

  render() {
    console.log(this.state)
    return this.props.children(this.state.address)
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Geolocation</h1>
        <GeoPosition>
          {(state) => state.error ? (
              <div>Error: {state.error.message}</div>
            ) : (
              <dl>
                <dt>Latitude</dt>
                <dd>{state.coords.latitude || <LoadingDots/>}</dd>
                <dt>Longitude</dt>
                <dd>{state.coords.longitude || <LoadingDots/>}</dd>
                <pre>GeoPosition state: {JSON.stringify(state, null, 2)}</pre>
              </dl>

            )}
        </GeoPosition>

        <h2>GeoPosition and GeoAddress composition</h2>
        <GeoPosition>
          {(state) => state.error ? (
              <div>Error: {state.error.message}</div>
            ) : (
              <dl>
                <dt>Latitude</dt>
                <dd>{state.coords.latitude || <LoadingDots/>}</dd>
                <dt>Longitude</dt>
                <dd>{state.coords.longitude || <LoadingDots/>}</dd>

                <GeoAddress longitude={state.coords.longitude}
                            latitude={state.coords.latitude}>
                  {(address) => (
                    <span>
                      <dt>Address</dt>
                      <dd>{address || <LoadingDots/>}</dd>
                      <pre>GeoAddress state: {JSON.stringify({address}, null, 2)}</pre>
                    </span>
                  )}
                </GeoAddress>
              </dl>
            )}
        </GeoPosition>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
