import React, { Component } from 'react';
import './App.less';
import { MaterialTableComponent } from "./material_table/table";
import { MATERIALS } from './materials';

function getData(startIndex=0) {
    return new Promise(function(resolve, reject) {
        MATERIALS.getList(startIndex, resolve);
    });
}

const columns = [
    {
        Header: '',
        accessor: 'selected',
        Cell: ({ value }) => (<input type="checkbox" checked={value}/>),
        width: 30,
    },
    {
        Header: "Image",
        Cell: ({ value }) => (<img src={value} width="25" height="25" alt="fabric"/>),
        accessor: "imgSrc",
    },
    {
        Header: 'Name',
        accessor: "name",
    }
];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    async componentDidMount() {
        const data = await getData();
        console.log('Mish:', data);
        this.setState({ data })
    }

    render() {
    return (
        <div className="App" style={ { display: 'flex' } }>
            <div style={ { flexDirection: 'column' } } className={"masterHeader"}>
                <h2>Fabrics</h2>
                <MaterialTableComponent data={this.state.data} columns={columns}/>
                <h2>Seams</h2>
                <MaterialTableComponent data={this.state.data} columns={columns}/>
                <h2>Attachments</h2>
                <MaterialTableComponent data={this.state.data} columns={columns}/>
            </div>
            <hr width="5" style={ {  height: '100px' } }/>
        </div>
    );
  }
}

export default App;
