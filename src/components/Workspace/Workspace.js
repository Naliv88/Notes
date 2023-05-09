import React, { useContext } from 'react';
import { NotesContext } from '../../context/notesContext';

const Workspace = () => {
  const { currentNote } = useContext(NotesContext);

  return (
    <div className="workspace">{currentNote && <p>{currentNote.body}</p>}</div>
  );
};

export default Workspace;
