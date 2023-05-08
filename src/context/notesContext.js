// У папці "context" містяться файли, пов'язані з контекстом, який використовується для передачі даних між компонентами.
import React, { createContext, useEffect, useState } from 'react';
import {
  addNoteToDB,
  deleteNoteFromDB,
  getAllNotesFromDB,
  updateNoteInDB,
} from '../database/database';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    getAllNotesFromDB().then(notes => {
      setNotes(notes);
    });
  }, []);

  useEffect(() => {
    if (searchFilter !== '') {
      setFilteredNotes(
        notes.filter(note =>
          note.title.toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    }
  }, [searchFilter, notes]);

  const addNote = newNote => {
    setNotes([...notes, newNote]);
    addNoteToDB([...notes, newNote]);
  };

  const editNote = (noteIndex, updatedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex] = updatedNote;
    setNotes(updatedNotes);
    updateNoteInDB(updatedNotes);
  };

  const deleteNote = noteIndex => {
    const updatedNotes = notes.filter((note, index) => index !== noteIndex);
    setNotes(updatedNotes);
    deleteNoteFromDB(updatedNotes);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        currentNote,
        setCurrentNote,
        searchFilter,
        setSearchFilter,
        filteredNotes,
        addNote,
        editNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
