import React, { Component } from 'react'
import { MATERIALS } from './materials'
import { ToolsContainer } from './tools_container/tools_container';
import { DetailsContainer } from './details_container/details_container';
import './App.less'

function getData(startIndex=0) {
  return new Promise((resolve) => {
    MATERIALS.getList(startIndex, resolve)
  })
}

/* TODO:
1) add styled layout system
2) typescript?
3) Redux?
4) pureComponents?
5) lodash?
*/

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fabric: [],
      seam: [],
      attachment: [],
      selected: []
    };
  }

  async componentDidMount() {
    const data = await getData();

    // Convert int to hex rgb
    data.map((record) => record.colorRGB = `#${record.color.toString(16)}`);

    console.log('Data:', data);

    const catalog = { fabric: [], seam: [], attachment: [] };
    data.forEach((record) => catalog[record.type].push(record));

    this.setState({
      data,
      fabric: catalog.fabric,
      seam: catalog.seam,
      attachment: catalog.attachment
    })
  }

  toggleSelected(record) {
    const newSelected = [...this.state.selected];
    const newTableState = [...this.state[record.type]];
    record.selected = !record.selected;

    if (record.selected)
      newSelected.push(record);
    else {
      const index = newSelected.findIndex((item) => item.id === record.id);
      newSelected.splice(index, 1);
    }

    this.setState({
      selected: newSelected,
      [record.type]: newTableState
    });
  }

  render() {
    return (
      <div className="App">
        <ToolsContainer{...this.state} toggleSelected={ (record) => this.toggleSelected(record) }/>
        <DetailsContainer records={ this.state.selected } />
      </div>
    )
  }
}

export default App
