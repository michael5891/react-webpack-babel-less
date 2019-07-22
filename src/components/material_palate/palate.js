import React from 'react'
import './palate.less'

export const MaterialColor = ({ color }) => {
  return (
    <div className="labeledCircle activeCircle" style={{ backgroundColor: color }}>
      {color}
    </div>
  )
}

export const MaterialPalate = ({ records }) => {
  const colors = records.map((record) => `#${record.color.toString(16)}`)
  const uniqueColorSet = [...new Set(colors)]

  return (
    <div className={'palateContainer'}>
      { uniqueColorSet.map((color) => <MaterialColor key={color} color={color}/>) }
    </div>
  )
}
