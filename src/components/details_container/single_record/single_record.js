import React from 'react'
import './single_record.less';
import { MaterialColor } from '../../material_palate/palate';

const RecordImg = ({ src }) => {
  return <img src={src} width="300" height="300"/>;
}

const KeyValueInput = ({ name, value, onChange }) => {
  return (
    <div className={'keyValueInput'}>
      <label htmlFor={name}>{name}</label>
      <input name={name} type="text" value={value} onChange={onChange}/>
    </div>
  );
};

const RgbInput = ({ color }) => {
  const rgb = color.match(/(?<=.{1}).{1,2}/g);
  return (
    <div className={'rgbInput'}>
      <KeyValueInput name={'Red'} value={rgb[0]} />
      <KeyValueInput name={'Green'} value={rgb[1]} />
      <KeyValueInput name={'Blue'} value={rgb[2]} />
    </div>
  );
};

const ColorInput = ({ color }) => {
  return (
    <>
      <h2>Color</h2>
      <div className={'colorInput'}>
        <RgbInput color={color}/>
        <MaterialColor className={'test'} color={color} size={'large'}/>
      </div>
    </>
  );
};

export const SingleRecordDetails = ({ record }) => {
  return (
    <>
      <h2>{ record.name }</h2>
      <RecordImg src={ record.imgSrc }/>
      <ColorInput color={ record.colorRGB }/>
    </>
  );
};
