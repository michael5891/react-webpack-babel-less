import React from 'react'
import './palate.less'

export const MaterialColor = (props: { color: string }) => {
  return (
    <div className="labeledCircle" style={{ backgroundColor:props.color }}>
      {props.color}
    </div>
  )
}

export const MaterialPalate = (props: { data: [] }) => {
  const colors = props.data.map((record) => `#${record.color.toString(16)}`)
  const uniqueColorSet = [...new Set(colors)]

  return (
    <div className={'palateContainer'}>
      { uniqueColorSet.map((color) => <MaterialColor key={color} color={color}/>) }
    </div>
  )
}
