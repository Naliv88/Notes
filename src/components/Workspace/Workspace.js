import React, { useContext, useEffect, useState } from 'react';
import { NotesContext } from '../../context/notesContext';
import { debounce } from 'lodash';

const Workspace = () => {
  const { currentNote, allowEditing, editNote } = useContext(NotesContext);
  const [textTitle, setTextTitle] = useState('');
  const [textBody, setTextBody] = useState('');

  useEffect(() => {
    if (!currentNote) {
      return;
    }
    setTextTitle(currentNote.title);
    setTextBody(currentNote.body);
  }, [currentNote]);

  const handleTitleChange = e => {
    if (allowEditing) {
      debounceEditNoteTitle(e.target.value);
      setTextTitle(e.target.value);
    }
  };

  const handleBodyChange = e => {
    if (allowEditing) {
      setTextBody(e.target.value);
    }
  };

  const debounceEditNoteTitle = debounce(value => {
    editNote({ ...currentNote, title: value });
  }, 500);

  return (
    <div className="workspace">
      {currentNote && (
        <input
          type="textarea"
          value={textTitle}
          onChange={handleTitleChange}
        ></input>
      )}
      {currentNote && (
        <input
          type="textarea"
          value={textBody}
          onChange={handleBodyChange}
        ></input>
      )}
      {/* {currentNote && <p>{currentNote.body}</p>} */}
    </div>
  );
};

export default Workspace;
