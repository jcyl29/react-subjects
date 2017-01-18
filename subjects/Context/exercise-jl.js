/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> "submits" the form
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onChange> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
//
////////////////////////////////////////////////////////////////////////////////
import React, {PropTypes} from 'react'
import ReactDOM, {findDOMNode} from 'react-dom'

class Form extends React.Component {
  // declare childContextTypes to be used by the child components
  // of <Form>. In this example, it will be <TextInput>
  static childContextTypes = {
    onChange: PropTypes.func,
    onReset: PropTypes.func,
    isFormReset: PropTypes.func
  }

  getChildContext() {
    return {
      onChange: this.onChange,
      onReset: this.onReset,
      isFormReset: this.isFormReset
    }
  }

  state = {
    isFormReset: false
  }

  isFormReset = () => {
    return this.state.isFormReset
  }

  onReset = () => {
    this.setState({isFormReset: true})
  }

  onChange = (data) => {
    this.setState(
      {
        [data.key]: data.value,
        isFormReset: false
      })
  }

  render() {
    return <div>{this.props.children}
      <pre>{JSON.stringify(this.state, null, 2)}</pre>
    </div>
  }
}

class SubmitButton extends React.Component {
  // need to declare contextTypes to "expose" this context data
  // to the component

  static contextTypes = {
    handleSubmit: PropTypes.func
  }

  render() {
    return <button onClick={this.context.handleSubmit}>{this.props.children}</button>
  }
}

class ResetButton extends React.Component {

  static contextTypes = {
    onReset: PropTypes.func
  }

  render() {
    return <button onClick={this.context.onReset}>{this.props.children}</button>
  }
}


class TextInput extends React.Component {
  static contextTypes = {
    handleSubmit: PropTypes.func,
    onChange: PropTypes.func,
    isFormReset: PropTypes.func
  }

  handleChange = (e) => {
    this.context.onChange({key: e.target.name, value: e.target.value})
  }

  handleKeyDown = (e) => {
    const ENTER_KEY = 13

    if (e.which === ENTER_KEY) {
      this.context.handleSubmit()
    }
  }

  clearInputField = (node) => {
    node.value = ''
  }

  componentDidUpdate() {
    if (this.context.isFormReset()) {
      this.clearInputField(findDOMNode(this))
    }
  }

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
      />
    )
  }
}

class App extends React.Component {
  handleSubmit = () => {
    alert('YOU WIN!')
  }

  static childContextTypes = {
    handleSubmit: PropTypes.func
  }

  getChildContext() {
    return {
      handleSubmit: this.handleSubmit
    }
  }


  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
          <p>
            <ResetButton>Reset Text Inputs</ResetButton>
          </p>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
