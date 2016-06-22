import React from 'react'

const Provider = React.createClass({
  // put the store on context! 
  
  propTypes: {
    store: React.PropTypes.object.isRequired
  },
  
  childContextTypes: {
     store: React.PropTypes.object.isRequired
  },
  
  getChildContext() {
      return  {
        store: this.props.store
      }
  },
  render() {
    return <div>{this.props.children}</div>
  }
})

export default Provider
