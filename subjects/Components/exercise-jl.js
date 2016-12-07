////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'


const styles = {}
styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}

class Tab extends React.Component {
  render() {
    const data = this.props,
      country = data.country,
      tabStyle = data.isActive ? styles.activeTab : styles.tab

    return (
      <div className="Tab"
           style={tabStyle}
           onClick={data.onClick}
           key={country.id}>{country.name}
      </div>
    )
  }
}

class Tabs extends React.Component {
  // State is similar to props, but it is private and fully controlled by the component.

  state = {
    activeTabIndex: 0
  }

  handleTabClick(activeTabIndex) {
    this.setState({activeTabIndex})
  }

  render() {
    const data = this.props.data,
      activeTabIndex = this.state.activeTabIndex

    const tabs = data.map((country, index) => {
      const isActiveTab = index === activeTabIndex

      return (
        <Tab country={country}
             isActive={isActiveTab}
             index={index}
             onClick={() => this.handleTabClick(index)}/>
      )
    })

    const activeCountry = data[activeTabIndex]
    const content = activeCountry.description

    return (
      <div className="Tabs">
        {/*// BEGIN all of this html needs to be created with JSX syntax*/}
        {/*<div className="Tab" style={styles.activeTab}>*/}
        {/*Active*/}
        {/*</div>*/}
        {/*<div className="Tab" style={styles.tab}>*/}
        {/*Inactive*/}
        {/*</div>*/}
        {/*// END  all of this html needs to be created with JSX syntax*/}

        {tabs}

        <div className="TabPanel" style={styles.panel}>
          {/*this can be stored as another expressions created from JSX*/}
          {/*that returns the content of the panel*/}
          {/*Panel */}
          {content}
        </div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    )
  }
}

const DATA = [
  {id: 1, name: 'USA', description: 'Land of the Free, Home of the brave'},
  {id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival'},
  {id: 3, name: 'Russia', description: 'World Cup 2018!'}
]

ReactDOM.render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this)
})
