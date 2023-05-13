import React, { useContext } from 'react';
import { NotesContext } from '../../context/notesContext';
// import style from './Modal.module.css';

export default function SelectDB() {
  const { setSelectDB } = useContext(NotesContext);

  const handelSelect = e => {
    setSelectDB(e.target.value);
  };
  return (
    <div>
      <select onChange={handelSelect}>
        <option value={'indexddb'}>IndexdDB</option>
        <option value={'quintadb'}>QuintaDB</option>
      </select>
    </div>
  );
}
