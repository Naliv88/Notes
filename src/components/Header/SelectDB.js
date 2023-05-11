import React from 'react';
// import style from './Modal.module.css';

export default function SelectDB() {
  return (
    <div>
      <select>
        <option value={'indexddb'}>IndexdDB</option>
        <option value={'quintadb'}>QuintaDB</option>
      </select>
    </div>
  );
}
