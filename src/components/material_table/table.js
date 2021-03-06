import React from 'react';

// Import React Table
import ReactTable from 'react-table';

// Import css
import 'react-table/react-table.css';
import './table.less';

export const MaterialTableComponent = (props) => {
  return (
    <ReactTable
      data={props.data}
      columns={props.columns}
      showPagination={false}
      minRows={3}
      style={{ height: '150px' }}
    />
  );
};
