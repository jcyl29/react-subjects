import React from 'react'
import ReactDOM from 'react-dom'
import serializeForm from 'form-serialize'

////////////////////////////////////////////////////////////////////////////////
// Here's a simple <form>:

class Forms extends React.Component {
  render() {
    return (
      <div>
        <h1>Forms</h1>
        <form>
          <input type="text"/>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<Forms/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Give the <input> a default value.
//class Forms extends React.Component {
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form>
//          <input type="text" defaultValue="lol"/>
//        </form>
//      </div>
//    )
//  }
//}

////////////////////////////////////////////////////////////////////////////////
// Access the value using event.target.
// class Forms extends React.Component {
//  handleChange = (event) => {
//    console.log(event.target.value)
//  }
//
//  handleSubmit = (event) => {
//    event.preventDefault()
//    console.log("on submit?", event.target)
//  }
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form onSubmit={this.handleSubmit}>
//          <input type="text" defaultValue="lol" onChange={this.handleChange}/>
//        </form>
//      </div>
//    )
//  }
// }
//
// ReactDOM.render(<Forms/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Or use a ref.
//class Forms extends React.Component {
//  handleChange = () => {
//    console.log(this.input.value)
//  }
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form>
//          <input type="text" onChange={this.handleChange} ref={node => this.input = node}/>
//        </form>
//      </div>
//    )
//  }
//}

////////////////////////////////////////////////////////////////////////////////
// Or you can "control" the <input> and have its value in state.
// What happens if we don't have an `onChange` but provide a value?

// Answer: you will not be able to change the text value in the input element
// From React documentation:
// In the React rendering lifecycle, the value attribute on form elements
// will override the value in the DOM. With an uncontrolled component, you
// often want React to specify the initial value, but leave subsequent updates uncontrolled.
// To handle this case, you can specify a defaultValue attribute instead of value.

// A form element becomes “controlled” if you set its value via a prop.

// if you have both a value and defaultValue and do not have the onChange handler, the browser
// will complain with this message:
//   Forms is changing an uncontrolled input of type text to be controlled.
//   Input elements should not switch from uncontrolled to controlled (or vice versa).
//   Decide between using a controlled or uncontrolled input element for the lifetime of the component.
//     More info: https://fb.me/react-controlled-components


//class Forms extends React.Component {
//  state = {
//    inputValue: 'lol'
//  }
//
//  handleChange = () => {
//    this.setState({
//      inputValue: this.input.value
//    })
//  }
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form>
//          <input
//            ref={node => this.input = node }
//            value={this.state.inputValue}
//            type="text"
//            onChange={this.handleChange}
//          />
//        </form>
//        <pre>{JSON.stringify(this.state, null, 2)}</pre>
//      </div>
//    )
//  }
//}

////////////////////////////////////////////////////////////////////////////////
// When it's controlled, we can set state elsewhere and it stays in sync
// class Forms extends React.Component {
//  state = {
//    inputValue: 'lol'
//  }
//
//  handleChange = () => {
//    this.setState({
//      inputValue: this.input.value
//    })
//  }
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form onSubmit={(e) => e.preventDefault()}>
//          <button onClick={() => this.setState({ someInputValue: 'changed!' })}>
//            Change the value
//          </button>
//          <input
//            ref={node => this.input = node }
//            value={this.state.inputValue}
//            type="text"
//            onChange={this.handleChange}
//          />
//        </form>
//        <pre>{JSON.stringify(this.state, null, 2)}</pre>
//      </div>
//    )
//  }
// }


////////////////////////////////////////////////////////////////////////////////
// Some forms are transactional, so modeling in state isn't necessary, just
// use DOM APIs to access the data, like when you need to save off some data
// somewhere and reset the form, but the values in the form are never
// important to `render`.
//class Forms extends React.Component {
//  handleSubmit = (event) => {
//    event.preventDefault()
//    const values = serializeForm(event.target, { hash: true })
//    console.log(values)
//  }
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form onSubmit={this.handleSubmit}>
//          <p>
//            <label>First Name: <input
//              name="firstName"
//              defaultValue="Ryan"
//              type="text"
//            /></label>
//          </p>
//
//          <p>
//            <label>Last Name: <input
//              name="lastName"
//              defaultValue="Florence"
//              type="text"
//            /></label>
//          </p>
//
//          <p>
//            <button type="submit">Save</button>
//          </p>
//        </form>
//      </div>
//    )
//  }
//}

////////////////////////////////////////////////////////////////////////////////
// If we did want it all in state, we don't have to link up every single
// element to state, can use <form onChange>. However, updates won't be
// synchronized when other parts of the app manipulate the state like the
// button we had earlier.
//class Forms extends React.Component {
//  state = {
//    firstName: 'Ryan',
//    lastName: 'Florence'
//  }
//
//  handleFormChange = (event) => {
//    event.preventDefault()
//    const values = serializeForm(this.form, { hash: true })
//    this.setState(values)
//  }
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form onChange={this.handleFormChange} ref={node => this.form = node}>
//          <p>
//            <label>First Name: <input
//              name="firstName"
//              defaultValue={this.state.firstName}
//              type="text"
//            /></label>
//          </p>
//
//          <p>
//            <label>Last Name: <input
//              name="lastName"
//              defaultValue={this.state.lastName}
//              type="text"
//            /></label>
//          </p>
//
//          <p>
//            <button type="submit">Save</button>
//          </p>
//        </form>
//        <pre>{JSON.stringify(this.state, null, 2)}</pre>
//      </div>
//    )
//  }
//}

////////////////////////////////////////////////////////////////////////////////
// Use-cases:
//
// 1. Transactional forms, don't need anything in state, just use
//    `defaultValue` and `onSubmit`
// 2. Some other part of the app needs the forms state to render,
//    but nothing else needs to manipulate that state (one-way),
//    use <form onChange> and DOM APIs to slurp form values into
//    state
// 3. Multiple parts of the app manipulate the state, changes need
//    to be reflected in the input (two-way), use `value` and
//    `onChange`
