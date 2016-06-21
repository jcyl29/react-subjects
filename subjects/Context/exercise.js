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
import React from 'react'
import { render } from 'react-dom'

const Form = React.createClass({
  render() {
    return <div>{this.props.children}</div>
  }
})

const SubmitButton = React.createClass({

  contextTypes: {
    onSubmit: React.PropTypes.func,
    onChange: React.PropTypes.func
  },

  render() {
    return <button onClick={this.context.onSubmit}>{this.props.children}</button>
  }
})

const TextInput = React.createClass({

  contextTypes: {
    onSubmit: React.PropTypes.func
  },

    handleChange(event) {
      if (this.context.onChange) {
        this.context.onChange
      }
    },
  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ')
      this.context.onSubmit()
  },


  render() {
    return (
      <input
        type="text"
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    )
  }
})

const App = React.createClass({
  handleSubmit() {
    alert('YOU WIN!')
  },

  childContextTypes: {
    onSubmit: React.PropTypes.func
  },

  getInitialState() {
    return {
      value: {}
    }
  },

  getChildContext() {
    return {
      onSubmit: this.handleSubmit,
      onChange: this.handleChange
    }
  },

  handleChange(name, value) {
    const nextState = {
      ...this.state.values,
      [name]: value
    }

    this.setState(nextState, () => {
      if (this.prop.onChange) {
        this.props.onChange(this.state)
      }
    })
  },


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
        </Form>
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))
