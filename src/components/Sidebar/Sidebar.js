import React, { useContext, useState } from 'react';
import { NotesContext } from '../../context/notesContext';
import ListItem from '../ListItem/ListItem';

const Sidebar = () => {
  const { notes, setCurrentNote, filteredNotes } = useContext(NotesContext);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = note => {
    setCurrentNote(note);
    setSelectedNote(note);
    console.log(note);
    console.log(selectedNote);
  };

  return (
    <div className="sidebar">
      <ul>
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
      </ul>
      {/* {notes.map(note => (
        <ListItem
          key={note.id}
          note={note}
          onClick={() => handleNoteClick(note)}
          className={
            selectedNote && selectedNote.id === note.id ? 'active' : ''
          }
        />
      ))} */}
    </div>
  );
};

export default Sidebar;
