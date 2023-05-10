import React, { useContext } from 'react';
import { NotesContext } from '../../context/notesContext';

import style from './Modal.module.css';

export default function DeleteModal({ onClose }) {
  const { currentNote, deleteNote } = useContext(NotesContext);

  const handleDelete = () => {
    deleteNote(currentNote.id);
    onClose();
  };

  return (
    <div className={style.deleteModalBackground}>
      <div className={style.deleteMmodal}>
        <h2>Видалення запису</h2>
        <p>Ви дійсно хочете видалити запис?</p>
        <p>{currentNote.title}</p>
        <div className={style.deleteMmodalbuttons}>
          <button onClick={handleDelete}>Так</button>
          <button onClick={onClose}>Ні</button>
        </div>
      </div>
    </div>
  );
}
