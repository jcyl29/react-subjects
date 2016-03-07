////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time

import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'

const StateInput = React.createClass({
    render() {
        <label>Shipping State: <input type="text"
                                      defaultValue={shippingMatchesBilling ? billingState : shippingState}
                                      disabled={shippingMatchesBilling}
                                      onBlur={(e) => this.validateState(e.target.value)}
                                      size="2"/></label>

    }
})

const CheckoutForm = React.createClass({
    getInitialState() {
        return {
            billingName: 'Jane Doe',
            billingState: 'WA',
            shippingName: '',
            shippingState: '',
            error: false,
            shippingMatchesBilling: true
        }
    },

    checkedBox(event) {
        console.log(event.target.checked)
        this.setState({
                shippingMatchesBilling: event.target.checked
            }
        )
    },

    validateState(myState) {
        this.setState({
            shippingState: myState,
            //error: myState.trim().length !== 2
        })
    },

    validateState(myState) {
        this.setState({
            error: myState.trim().length !== 2
        })
    },


    render() {
        const {billingName,
            billingState,
            shippingName,
            shippingState,
            shippingMatchesBilling} = this.state

        return (
            <div>
                <h1>Checkout</h1>
                <form>
                    <fieldset>
                        <legend>Billing Address</legend>
                        <p>
                            <label>Billing Name:{' '}
                                <input
                                    type="text"
                                    value={billingName}
                                    onChange={(e) => this.setState({billingName:e.target.value})}
                                />
                            </label>
                        </p>
                        <p>
                            <label>Billing State: <input type="text"
                                                         value={billingState}
                                                         onChange={(e) => this.setState({billingState:e.target.value})}
                                                         size="2"/>
                            </label>
                        </p>
                    </fieldset>

                    <br/>

                    <fieldset>
                        <label><input type="checkbox"
                                      defaultChecked={shippingMatchesBilling}
                                      onChange={this.checkedBox}/> Same as billing</label>
                        <legend>Shipping Address</legend>
                        <p>
                            <label>Shipping Name: <input type="text"
                                                         value={shippingMatchesBilling ? billingName : shippingName}
                                                         disabled={shippingMatchesBilling}
                                                         onChange={(e) => this.setState({shippingName:e.target.value})}/>
                            </label>
                        </p>
                        <p>
                            <label>Shipping State: <input type="text"
                                                          defaultValue={shippingMatchesBilling ? billingState : shippingState}
                                                          value={shippingMatchesBilling ? billingState : shippingState}
                                                          disabled={shippingMatchesBilling}
                                                          onBlur={(e)=>this.validateState(e.target.value)}
                                                          onChange={(e) => this.setState({shippingState: e.target.value})}
                                                          size="2"/></label>


                        </p>
                        {this.state.error && (<p>State must be 2 characters</p>)}
                    </fieldset>
                </form>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        )
    }
})

render(<CheckoutForm/>, document.getElementById('app'))
