////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// This Modal, even though its a React component, has an imperative API to
// open and close it. Can you convert it to a declarative API?
////////////////////////////////////////////////////////////////////////////////

// The imperative code is the "modal" instance and its function arguments show and
// hide.  This code is the nitty gritty details of the bootstrap modal and we want
// to abstract that away in state.

// In the App component, all we care is that when the button is clicked, we changed
// the state from modal closed to modal open.  We let the modal component take care
// of the implementation details.  This is what is meant by "declarative API"

import React, { PropTypes } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import $ from 'jquery'
import 'bootstrap-webpack'

class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClose: PropTypes.func,
    isOpen: PropTypes.bool
  }

  componentDidMount () {
    // this is your equivalent to your init function in backbone

    // This is only necessary to keep state in sync
    // with the DOM. Since we're keeping state now,
    // we should make sure it's accurate.
    // this code is needed because you can click outside of the modal
    // and close the modal, yet the state will not update to
    // isModalOpen = false
    $(findDOMNode(this)).on('hidden.bs.modal', () => {

      // onClose is reference to App.closeModal method. This is just a
      // safe check to ensure reference exists.
      if (this.props.onClose)
        this.props.onClose()
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.doImperativeWork()
    }
  }

  doImperativeWork() {

    // why findDOMNode does not exist when i put a debugger statement and run
    // it this scope of this function, or any function of this class?
    // console.log(findDOMNode(this))
    if (this.props.isOpen) {
      $(findDOMNode(this)).modal('show')
    } else {
      $(findDOMNode(this)).modal('hide')
    }
  }

  render() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    isModalOpen: false
  }

  // notice the arrow syntax needed to keep the (this) keyword
  // pointing to the React component
  openModal = () => {
    this.setState({isModalOpen: true})
  }

  closeModal = () => {
    this.setState({isModalOpen: false})
  }

  render() {
    return (
      <div className="container">
        <h1>Let’s make bootstrap modal declarative</h1>

        <button
          className="btn btn-primary"
          onClick={this.openModal}
        >open modal</button>

        <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal} title="Declarative is better">
          <p>Calling methods on instances is a FLOW not a STOCK!</p>
          <p>It’s the dynamic process, not the static program in text space.</p>
          <p>You have to experience it over time, rather than in snapshots of state.</p>
          <button
            onClick={this.closeModal}
            type="button"
            className="btn btn-default"
          >Close</button>
        </Modal>

        <pre style={{marginTop: 30 + 'em'}} >{JSON.stringify(this.state, null, 2)}</pre>

      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
