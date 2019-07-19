import React from 'react'
import './details_container.less';

const PlaceHolder = () => <h2>Select a Fabric from the List on the Left</h2>;

const RecordName = ({ records }) => {
  if (records.length === 1)
    return <h2 className={'materialNaming'}>{records[0].name}</h2>;
  else if(records.length > 1)
    return <h2>In progress</h2>

  return <PlaceHolder/>
}

const MyImg = ({ records }) => {
  console.log(records);
  if(records && records.length > 0)
    return <img src={records[0].imgSrc} width="300" height="300"/>;

  return '';
}

export const DetailsContainer = ({ records }) => {
  return (
    <div>
      <RecordName records={ records }/>
      <MyImg records={ records }/>
    </div>
  );
};
