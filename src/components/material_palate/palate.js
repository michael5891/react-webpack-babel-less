import React from 'react'
import { uniqBy } from 'lodash';
import './palate.less'

export const MaterialColor = ({ color, size = 'small' }) => {
  return (
    <div className={`labeledCircle activeCircle ${size}`} style={{ backgroundColor: color }}>
      {color}
    </div>
  )
}

export const MaterialPalate = ({ records }) => {
  return (
    <div className={'palateContainer'}>
      { uniqBy(records, 'colorRGB').map((record) =>
        <MaterialColor key={record.color} color={record.colorRGB}/>
      ) }
    </div>
  )
}
