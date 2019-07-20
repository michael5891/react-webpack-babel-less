import React from 'react'
import './single_record.less';

const RecordHeader = ({ record }) => {
  return <h2 className={'materialNaming'}>{ record.name }</h2>;
}

const RecordImg = ({ record }) => {
  return <img src={record.imgSrc} width="300" height="300"/>;
}

export const SingleRecordDetails = ({ record }) => {
  return (
    <div>
      <RecordHeader record={ record }/>
      <RecordImg record={ record }/>
    </div>
  );
};
