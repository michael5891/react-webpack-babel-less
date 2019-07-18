import React from 'react'
import './palate.less'

export const MaterialColor = ({ color }) => {
  return (
    <div className="labeledCircle" style={{ backgroundColor: color }}>
      {color}
    </div>
  )
}

export const MaterialPalate = ({ data }) => {
  const colors = data.map((record) => `#${record.color.toString(16)}`)
  const uniqueColorSet = [...new Set(colors)]

  return (
    <div className={'palateContainer'}>
      { uniqueColorSet.map((color) => <MaterialColor key={color} color={color}/>) }
    </div>
  )
}
