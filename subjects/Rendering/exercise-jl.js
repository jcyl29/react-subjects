////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - render DATA.title in an <h1>
// - render a <ul> with each of DATA.items as an <li>
// - now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
// - add a select dropdown to make filtering on `type` dynamic
// - add a button to toggle the sort order
// - Hint: you'll need an `updateThePage` function that calls `render`,
//   and then you'll need to call it in the event handlers of the form controls
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import sortBy from 'sort-by'

const DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'mushy peas', type: 'english' },
    { id: 5, name: 'fish and chips', type: 'english' },
    { id: 6, name: 'bimbambamp', type: 'korean' },
    { id: 7, name: 'kimchi', type: 'korean' },
    { id: 8, name: 'dumplings', type: 'chinese' },
    { id: 9, name: 'salmon fried rice', type: 'chinese' }
  ]
}

function Menu(config) {
  let items = DATA.items
    .filter(item => item.type == config.filter)
    .sort(sortBy('name'))

  if (config.sortOrder !== 'ascending') {
    items = items.reverse()
  }

  items = items.map(item => <li key={item.id}>{item.name}</li>)

  // using Sets to retrive unique values in Arrays
  // https://codepen.io/vlad-bezden/pen/OMEXJz?editors=0012
  const optionTypes = [...new Set(DATA.items.map(item => item.type))]
    .map(type => <option key={type} value={type}>{type}</option>)

  function handleOptionSelected(e) {
    const selectedIndex = e.target.options.selectedIndex
    const selectedValue = e.target.options[selectedIndex].text

    ReactDOM.render(<Menu filter={selectedValue}/>, document.getElementById('app'))
  }

  function handleButtonClick(e) {
    const sortOrder = e.target.dataset.sortOrder
    let newSortOrder = sortOrder === "ascending" ? "descending" : "ascending"
    ReactDOM.render(<Menu filter={e.target.dataset.filter} sortOrder={newSortOrder}/>, document.getElementById('app'))
  }

  return (
    <div>
      <h1>{DATA.title}</h1>
      <select onChange={handleOptionSelected}>
        {optionTypes}
      </select>
      <button onClick={handleButtonClick} data-filter={config.filter} data-sort-order={config.sortOrder}>Toggle Sort Order, current setting = {config.sortOrder}</button>
      <ul>
        {items}
      </ul>
      Open the console, you have failing tests.
    </div>
  )
}

ReactDOM.render(<Menu filter={"mexican"} sortOrder={"ascending"} data={DATA} />, document.getElementById('app'), () => {
  require('./tests').run()
})
