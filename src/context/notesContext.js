// У папці "context" містяться файли, пов'язані з контекстом, який використовується для передачі даних між компонентами.
import React, { createContext, useEffect, useState } from 'react';
import {
  addNoteToDB,
  deleteNoteFromDB,
  getAllNotesFromDB,
  updateNoteInDB,
} from '../database/database';
import { nanoid } from 'nanoid';

// Створюємо контекст для передачі даних між компонентами
export const NotesContext = createContext();

// Створюємо провайдер для забезпечення доступу до даних в контексті
export const NotesProvider = ({ children }) => {
  // Створюємо стейти для зберігання нотаток, поточної нотатки, рядка пошуку, фільтрованого масиву нотаток
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Виконуємо запит до бази даних для отримання всіх нотаток при монтуванні компонента
  useEffect(() => {
    getAllNotesFromDB().then(notes => {
      console.log(notes);
      setNotes(notes);
    });
  }, []);

  // Оновлюємо фільтрований масив нотаток при зміні рядка пошуку або нотаток
  useEffect(() => {
    setFilteredNotes(
      notes.filter(note =>
        note.title.toLowerCase().includes(searchFilter.toLowerCase())
      )
    );
  }, [searchFilter, notes]);

  // Функція для додавання нової нотатки
  const addNote = newNote => {
    const id = nanoid(6);
    const time = Date.now();
    const noteWithTime = { ...newNote, time, id };
    setNotes([...notes, noteWithTime]);
    addNoteToDB(noteWithTime);
  };

  // Функція для редагування нотатки
  const editNote = editNote => {
    const updatedNotes = [...notes];
    const index = updatedNotes.findIndex(note => note.id === editNote.id);
    updatedNotes[index] = editNote;
    console.log(updatedNotes);
    setNotes(updatedNotes);
    updateNoteInDB(editNote);
  };

  // Функція для видалення нотатки
  const deleteNote = noteId => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    deleteNoteFromDB(noteId);
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
