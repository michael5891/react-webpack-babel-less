import React from 'react'
import { MaterialTableComponent } from '../material_table/table'
import { MaterialPalate } from '../material_palate/palate'
import './tools_container.less';

const RecordSelect = ({ record, onChange }) => {
  return <input type="checkbox" checked={record.selected} onChange={() => onChange(record)}/>;
};

const RecordImg = ({ original: record, value }) => {
  return <img src={value} className={'recordImg'} alt={record.type}/>;
}

export const ToolsContainer = ({ data, fabric, seam, attachment, toggleSelected }) => {

  const columns = [
    {
      Header: '',
      accessor: 'selected',
      Cell: ({ original: record }) => <RecordSelect record={record} onChange={toggleSelected}/>,
      width: 30
    },
    {
      Header: 'Image',
      Cell: RecordImg,
      accessor: 'imgSrc'
    },
    {
      Header: 'Name',
      accessor: 'name',
      className: 'materialNaming'
    }
  ];

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
