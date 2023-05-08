import React, { useContext } from 'react';
import { NotesContext } from '../../context/notesContext';

const Workspace = () => {
  const { notes } = useContext(NotesContext);

  console.log(notes);
  return (
    <div className="workspace">
      {/* Note title */}
      <h1>Title</h1>

      {/* Markdown content */}
      <div className="content">Content</div>
    </div>
  );
};

export default Workspace;
