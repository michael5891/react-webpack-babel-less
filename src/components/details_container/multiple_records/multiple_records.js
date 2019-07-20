import React from 'react'
import './multiple_records.less'

const RecordsHeader = ({ count }) => {
  return <h2 className={'materialNaming'}>{ count } Materials Selected</h2>;
}

const RecordImg = ({ record }) => {
  return (
    <div className={'recordImgContainer'}>
      <img src={record.imgSrc} width="108" height="108"/>
      <h4>{ record.name }</h4>
    </div>
  );
}

const RecordsImgsContainer = ({ records }) => {
  return (
    <div className={'recordsContainer'}>
      {
        records.map((record) => <RecordImg key={record.id} record={ record } />)
      }
    </div>
  );
}

export const MultipleRecordsDetails = ({ records }) => {
  return (
    <div>
      <RecordsHeader count={ records.length }/>
      <RecordsImgsContainer records={ records } />
    </div>
  );
};
