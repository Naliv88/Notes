import React, { useContext, useState } from 'react';
import { NotesContext } from '../../context/notesContext';
import ListItem from '../ListItem/ListItem';

const Sidebar = () => {
  const { setCurrentNote, filteredNotes } = useContext(NotesContext);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = note => {
    setCurrentNote(note);
    setSelectedNote(note);
    console.log(note);
    console.log(selectedNote);
  };

  return (
    <div className="sidebar">
      <div>
        {filteredNotes.map(note => (
          <ListItem
            key={note.id}
            note={note}
            onClick={() => handleNoteClick(note)}
            className={
              selectedNote && selectedNote.id === note.id ? 'active' : ''
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
