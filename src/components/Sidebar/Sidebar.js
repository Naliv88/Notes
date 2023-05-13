import React, { useContext, useState } from 'react';
import { NotesContext } from '../../context/notesContext';
import style from './Sidebar.module.css';
import ListItem from '../ListItem/ListItem';

export const Sidebar = () => {
  const { setCurrentNote, filteredNotes, filteredNotesMemo } =
    useContext(NotesContext);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = note => {
    setCurrentNote(note);
    setSelectedNote(note);
  };

  return (
    <div className={style.sidebar}>
      {filteredNotesMemo.map(note => (
        <ListItem
          key={note.id}
          note={note}
          onClick={() => handleNoteClick(note)}
          selected={selectedNote && selectedNote.id === note.id}
        />
      ))}
    </div>
  );
};
