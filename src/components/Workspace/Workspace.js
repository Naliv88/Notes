import React, { useContext } from 'react';
import { NotesContext } from '../../context/notesContext';

const Workspace = () => {
  const { currentNote } = useContext(NotesContext);

  console.log(currentNote);
  return (
    <div className="workspace">
      {/* Markdown content */}
      {currentNote && <p>{currentNote.body}</p>}
      <div className="content">Content</div>
    </div>
  );
};

export default Workspace;
