////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Hints to get started:
//
// - <RadioGroup> will need some state
// - It then needs to pass that state to the <RadioOption>s so they know
//   whether or not they are active
//
// Got extra time?
//
// Implement a `value` prop and allow this to work like a "controlled input"
// (https://facebook.github.io/react/docs/forms.html#controlled-components)
//
// - Add a button to <App> that sets `this.state.radioValue` to a pre-determined
//   value, like "tape"
// - Make the <RadioGroup> update accordingly
//
// Implement keyboard controls on the <RadioGroup> (you'll need tabIndex="0" on
// the <RadioOption>s so the keyboard will work)
//
// - Enter and space bar should select the option
// - Arrow right, arrow down should select the next option
// - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class RadioGroup extends React.Component {
  static propTypes = {
    currentValue: PropTypes.string.isRequired
  }

  state = {
    selectedValue: this.props.currentValue
  }

  select = (selectedValue) => {
    console.log("select", "this.state.selectedValue", this.state.selectedValue, "selectedValue", selectedValue)
    this.setState({selectedValue}, () => {
      // onChange refers to an arrow function defined in <App/> as RadioGroup's prop,
      // we are simply going to invoke it here
      this.props.onChange(selectedValue)
    })
  }

  componentWillReceiveProps(nextProps){
    // synchronize currentValue to this.state.selectedValue

    if (this.props.currentValue !== nextProps.currentValue) {
      this.setState({selectedValue:nextProps.currentValue})
    }
  }

  render() {
    // children are the RadioOption components
    const children = React.Children.map(this.props.children, (child) => {
      const props = {
        isSelected: this.state.selectedValue === child.props.value,
        onClick: () => this.select(child.props.value)
      }
      return React.cloneElement(child, props)
    })
    return (
      <div>
        {children}
        <pre>RadioGroup State: {JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}

class RadioOption extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired
  }

  render() {
    return (
      <div onClick={this.props.onClick}>
        <RadioIcon isSelected={this.props.isSelected}/> {this.props.children}
      </div>
    )
  }
}

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div
        style={{
          borderColor: '#ccc',
          borderWidth: 3,
          borderStyle: this.props.isSelected ? 'inset' : 'outset',
          height: 16,
          width: 16,
          display: 'inline-block',
          cursor: 'pointer',
          background: this.props.isSelected ? 'rgba(0, 0, 0, 0.05)' : ''
        }}
      />
    )
  }
}

class App extends React.Component {
  state = {
    radioValue: 'aux'
  }

  render() {
    return (
      <div>
        <h1>♬ It's about time that we all turned off the radio ♫</h1>
        <h2>Radio Value = {this.state.radioValue}</h2>

        <RadioGroup onChange={(newValue) => this.setState({radioValue: newValue})} currentValue={this.state.radioValue}>
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>
        <button onClick={() => {(this.setState({radioValue:'tape'}))} }>Choose Tape</button>
        <button onClick={() => {(this.setState({radioValue:'am'}))} }>Choose AM</button>

        <pre>App State: {JSON.stringify(this.state, null, 2)}</pre>
      </div>

    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
