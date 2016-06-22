import React from 'react'

export default function connect(mapStateToProps) {
  return function (Component) {
    return React.createClass({
      contextTypes: {
        store: React.PropTypes.object
      },
      render() {
        console.log("mapStateToProps", mapStateToProps)
        const store = this.context.store
        const props = mapStateToProps(store.getState())
        return <Component {...props} dispatch={store.dispatch}/>
      }
    })
  }
}
