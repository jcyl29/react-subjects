import React from 'react'

export default function connect(mapStateToProps) {

  return function (Component) {
    return React.createClass({
      contextTypes: {
        store: React.PropTypes.object.isRequired
      },

      componentWillMount() {
        this.context.store.listen(() => this.forceUpdate())
      },

      render() {
        console.log('mapStateToProps', mapStateToProps)

        const store = this.context.store
        const state = store.getState()
        const props = mapStateToProps(state)

        return <Component {...props} dispatch={store.dispatch}/>
      }
    })
  }
}
