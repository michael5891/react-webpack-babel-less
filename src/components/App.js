import React, { Component } from 'react'
import './App.less'
import { MaterialTableComponent } from './material_table/table'
import { MATERIALS } from './materials'
import { MaterialPalate } from './material_palate/palate'

function getData(startIndex=0) {
  return new Promise((resolve) => {
    MATERIALS.getList(startIndex, resolve)
  })
}

function getCount() {
  return new Promise((resolve) => {
    MATERIALS.getCount(resolve)
  })
}

const RecordSelect = ({ value }) => <input type="checkbox" checked={value}/>
const RecordImg = ({ value }) => <img src={value} width="25" height="25" alt="fabric"/>

const columns = [
  {
    Header: '',
    accessor: 'selected',
    Cell: RecordSelect,
    width: 30
  },
  {
    Header: 'Image',
    Cell: RecordImg,
    accessor: 'imgSrc'
  },
  {
    Header: 'Name',
    accessor: 'name'
  }
]

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      fabric: [],
      seam: [],
      attachment: []
    }
  }

  async componentDidMount() {
    const data = await getData()
    const count = await getCount()
    console.log('Count:', count)
    console.log('Data:', JSON.stringify(data))
    console.log('Colors:', JSON.stringify(data.map((record) => record.color)))

    this.setState({
      data,
      fabric: data.filter((record) => record.type === 'fabric'),
      seam: data.filter((record) => record.type === 'seam'),
      attachment: data.filter((record) => record.type === 'attachment')
    })
  }


  render() {
    return (
      <div className="App" style={ { display: 'flex' } }>
        <div className={'columnContainer'}>
          <div className={'toolsHeader'}>
            <h2>Fabrics</h2>
            <MaterialTableComponent data={this.state.fabric} columns={columns} />
            <h2>Seams</h2>
            <MaterialTableComponent data={this.state.seam} columns={columns} />
            <h2>Attachments</h2>
            <MaterialTableComponent data={this.state.attachment} columns={columns} />
          </div>
          <div className={'toolsFooter'}>
            <h2>Colors</h2>
            <MaterialPalate data={this.state.data} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
