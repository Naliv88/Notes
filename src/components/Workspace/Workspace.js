import React, { useContext, useEffect, useState } from 'react';
import { NotesContext } from '../../context/notesContext';
import { debounce } from 'lodash';
import style from './Workspace.module.css';

const Workspace = () => {
  const { currentNote, allowEditing, editNote } = useContext(NotesContext);
  const [textTitle, setTextTitle] = useState('');
  const [textBody, setTextBody] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTextTitle(currentNote.title);
      setTextBody(currentNote.body);
    }
  }, [currentNote]);

  const handleTitleChange = e => {
    if (allowEditing) {
      debounceEditNoteTitle(e.target.value);
      setTextTitle(e.target.value);
    }
  };

  const handleBodyChange = e => {
    if (allowEditing) {
      debounceEditNoteBody(e.target.value);
      setTextBody(e.target.value);
    }
  };

  const debounceEditNoteTitle = debounce(value => {
    editNote({ ...currentNote, title: value });
  }, 200);

  const debounceEditNoteBody = debounce(value => {
    editNote({ ...currentNote, body: value });
  }, 200);

  return (
    <div className={style.workspace}>
      {currentNote && (
        <textarea
          className={`${style.inputTitle} ${!allowEditing && style.disabled}`}
          value={textTitle}
          onChange={handleTitleChange}
          disabled={!allowEditing}
        ></textarea>
      )}
      {currentNote && (
        <textarea
          className={`${style.inputBody} ${!allowEditing && style.disabled}`}
          value={textBody}
          onChange={handleBodyChange}
          disabled={!allowEditing}
        ></textarea>
      )}
    </div>
  );
};

export default Workspace;
