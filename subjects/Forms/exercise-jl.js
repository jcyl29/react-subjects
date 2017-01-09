////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values

// basic HTML forms tip.  If you have only one input in a form, hitting Enter will "submit" the form
// this is called implicit submission
// once you have more than one input, the Enter key does nothing.
// https://www.tjvantoll.com/2013/01/01/enter-should-submit-forms-stop-messing-with-that/

//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
import React from 'react'
import ReactDOM from 'react-dom'
import serializeForm from 'form-serialize'

class CheckoutForm extends React.Component {
  state = {
    billingName: "Justin Lui",
    billingState: "CA",
    shippingName: '',
    shippingState: '',
    shippingSameAsBilling: false,
    invalidBillingState: false,
    invalidShippingState: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(serializeForm(e.target, {hash: true}))
  }

  updateTextInput = (e) => {
    const target = e.target,
      inputName = target.name,
      inputValue = target.value
    
    this.setState({[inputName]: inputValue});
    if (target.name.includes("State")) {
      this.validateStateText(inputName, inputValue);
    }
  }

  validateStateText (inputName, inputValue) {
    const invalidStateString = inputValue.length > 2
    if (inputName.includes("billing")) {
      this.setState({invalidBillingState: invalidStateString})
    } else {
      this.setState({invalidShippingState: invalidStateString})
    }
  }

  render() {
    const {
      billingName,
      billingState,
      shippingName,
      shippingState,
      shippingSameAsBilling,
      invalidShippingState,
      invalidBillingState
    } = this.state

    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name: <input type="text" name="billingName" defaultValue={billingName}
                                          onChange={this.updateTextInput}/></label>
            </p>
            <p>
              <label>Billing State: <input type="text" name="billingState" defaultValue={billingState}
                                           onChange={this.updateTextInput}
                                           size="2"/></label>
              <span
                style={invalidBillingState ? {display: "inline", color: "red"} : {display: "none"}}>
                Please use two character abbreviation</span>
            </p>
          </fieldset>

          <br/>

          <fieldset>
            <label><input type="checkbox" name="shippingSameAsBilling" onChange={(e) => {
              this.setState({shippingSameAsBilling: e.target.checked})
            } }/> Same as billing</label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name: <input type="text" name="shippingName" disabled={shippingSameAsBilling}
                                           value={shippingSameAsBilling ? billingName : shippingName}
                                           onChange={this.updateTextInput}
              /></label>
            </p>
            <p>
              <label>Shipping State: <input type="text" name="shippingState" disabled={shippingSameAsBilling} size="2"
                                            value={shippingSameAsBilling ? billingState : shippingState}
                                            onChange={this.updateTextInput}
              /></label>
              <span
                style={invalidShippingState ? {display: "inline", color: "red"} : {display: "none"}}>
                Please use two character abbreviation</span>
            </p>
          </fieldset>

          <br/>

          <button type="submit">Exercise did not include a way to submit form data!</button>

        </form>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}

ReactDOM.render(<CheckoutForm isThisaProp="1"/>, document.getElementById('app'))
