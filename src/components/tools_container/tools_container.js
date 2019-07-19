import React from 'react'
import { MaterialTableComponent } from '../material_table/table'
import { MaterialPalate } from '../material_palate/palate'
import './tools_container.less';

const RecordSelect = ({ value }) => <input type="checkbox" checked={value}/>;
const RecordImg = ({ value }) => <img src={value} width="25" height="25" alt="fabric"/>;

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
];

export const ToolsContainer = ({ data, fabric, seam, attachment }) => {
  return (
    <div className={'columnContainer'}>
      <div className={'toolsHeader'}>
        <h2>Fabrics</h2>
        <MaterialTableComponent data={fabric} columns={columns} />
        <h2>Seams</h2>
        <MaterialTableComponent data={seam} columns={columns} />
        <h2>Attachments</h2>
        <MaterialTableComponent data={attachment} columns={columns} />
      </div>
      <div className={'toolsFooter'}>
        <h2>Colors</h2>
        <MaterialPalate data={data} />
      </div>
    </div>
  );
};
