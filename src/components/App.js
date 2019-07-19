import React, { Component } from 'react'
import './App.less'
import { MATERIALS } from './materials'
import { ToolsContainer } from './tools_container/tools_container';

function getData(startIndex=0) {
  return new Promise((resolve) => {
    MATERIALS.getList(startIndex, resolve)
  })
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fabric: [],
      seam: [],
      attachment: []
    }
  }

  async componentDidMount() {
    const data = await getData();

    console.log('Data:', data);
    console.log('Colors:', data.map((record) => record.color));

    const catalog = { fabric: [], seam: [], attachment: [] };
    data.map((record) => catalog[record.type].push(record));

    this.setState({
      data,
      fabric: catalog.fabric,
      seam: catalog.seam,
      attachment: catalog.attachment
    })
  }


  render() {
    return (
      <div className="App">
        <ToolsContainer {...this.state}/>
      </div>
    )
  }
}

export default App
