import React from 'react'
import './details_container.less';
import { SingleRecordDetails } from './single_record/single_record';
import { MultipleRecordsDetails } from './multiple_records/multiple_records';

const PlaceHolder = () => <h2>Select a Fabric from the List on the Left</h2>;

export const DetailsContainer = ({ records }) => {
  return (
    <div>
      { records.length === 0 ? <PlaceHolder /> : null}
      { records.length === 1 ? <SingleRecordDetails record={ records[0] } /> : null}
      { records.length > 1 ? <MultipleRecordsDetails records={ records } /> : null}
    </div>
  );
};
