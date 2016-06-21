////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import * as RainbowListDelegate from './RainbowListDelegate'
import './styles'

const ListView = React.createClass({
  getInitialState() {
    return {
      scrollTop: 0,
      availableHeight: 0
    }
  },

  handleScroll(event) {
    this.setState({scrollTop: event.target.scrollTop})
  },
  propTypes: {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  },

  componentDidMount() {
    this.setState({
      availableHeight: findDOMNode(this).clientHeight
    })
    window.addEventListener('resize', this.adjustAvailableHeight)
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.adjustAvailableHeight)
  },

  adjustAvailableHeight() {
    this.setState({
      availableHeight: findDOMNode(this).clientHeight
    })
  },


  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const totalHeight = numRows * rowHeight

    const {scrollTop, availableHeight} = this.state
    const scrollBottom = scrollTop + availableHeight

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 20)
    const endIndex = Math.min(numRows, Math.ceil(scrollBottom / rowHeight) + 20)


    const items = []


    let index = startIndex
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    return (
      <div style={{ height: '100%', overflowY: 'scroll' }} onScroll={this.handleScroll}>
        <pre style={{ position:'fixed', color: 'white', right: 0 }}>{JSON.stringify(this.state, null, 2)}</pre>

        <ol style={{ paddingTop: (startIndex * rowHeight),  height: totalHeight }}>

          {items}
        </ol>

      </div>
    )
  }
})

// scrollposition, sizeofwindow

render(
  <ListView
    numRows={999999}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,

  document.getElementById('app')
)
