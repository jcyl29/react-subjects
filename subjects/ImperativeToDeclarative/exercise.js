////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// This Modal, even though its a React component, has an imperative API to
// open and close it. Can you convert it to a declarative API?
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import $ from 'jquery'
import 'bootstrap-webpack'

const { string, node, bool, func } = React.PropTypes

const Modal = React.createClass({

    propTypes: {
        title: string.isRequired,
        children: node,
        isOpen: bool.isRequired,
        onClose: func
    },

    componentDidMount() {

        this.doImperativeWork();

        //to handle when the user clicks outside the modal
        $(findDOMNode(this)).on('hidden.bs.modal', () => {
            if (this.props.onClose)
                this.props.onClose()
        })
    },

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen)
            this.doImperativeWork()
    },


    doImperativeWork() {
        if (this.props.isOpen) {
            $(findDOMNode(this)).modal('show')
        } else {
            $(findDOMNode(this)).modal('hide')
        }
    },

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

})

const App = React.createClass({
    getInitialState() {
        return {
            isModalOpen: false
        }
    },

    openModal() {

        //$(findDOMNode(this.refs.modal)).modal('show')
    },

    closeModal() {
        $(findDOMNode(this.refs.modal)).modal('hide')
    },

    render() {
        return (
            <div className="container">
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
                <h1>Let’s make bootstrap modal declarative</h1>

                <button
                    className="btn btn-primary"
                    onClick={() => this.setState({isModalOpen: true})}
                >open modal
                </button>

                <Modal isOpen={this.state.isModalOpen}
                       onClose={() => this.setState({isModalOpen: false})}
                       ref="modal"
                       title="Declarative is better">
                    {/* all these things below are the props.children! */}
                    <p>Calling methods on instances is a FLOW not a STOCK!</p>
                    <p>It’s the dynamic process, not the static program in text space.</p>
                    <p>You have to experience it over time, rather than in snapshots of state.</p>
                    <p>When you can remove `ref` in your react classes, it is a sign you are writing good declarative code</p>
                    <button
                        onClick={() => this.setState({isModalOpen: false})}
                        type="button"
                        className="btn btn-default"
                    >Close
                    </button>
                </Modal>

            </div>
        )
    }

})

render(<App/>, document.getElementById('app'))
