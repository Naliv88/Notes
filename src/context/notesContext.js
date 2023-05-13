// У папці "context" містяться файли, пов'язані з контекстом, який використовується для передачі даних між компонентами.
import React, { createContext, useEffect, useMemo, useState } from 'react';
import {
  addNoteToDB,
  deleteNoteFromDB,
  getAllNotesFromDB,
  updateNoteInDB,
} from '../database/database';
import { nanoid } from 'nanoid';
import {
  getAllItemsFromTable,
  postData,
  deleteItemsFromTable,
  editItemsFromTable,
} from '../utils/api';

// Створюємо контекст для передачі даних між компонентами
export const NotesContext = createContext();

// Створюємо провайдер для забезпечення доступу до даних в контексті
export const NotesProvider = ({ children }) => {
  // Створюємо стейти для зберігання нотаток, поточної нотатки, рядка пошуку, фільтрованого масиву нотаток
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [allowEditing, setAllowEditing] = useState(false);
  const [selectDB, setSelectDB] = useState('indexddb');

  // Виконуємо запит до бази даних для отримання всіх нотаток при монтуванні компонента
  useEffect(() => {
    if (selectDB === 'indexddb') {
      getAllNotesFromDB().then(notes => {
        setNotes(notes);
      });
    }
    if (selectDB === 'quintadb') {
      getAllItemsFromTable().then(notes => {
        setNotes(notes);
      });
    }
  }, [selectDB]);

  // Оновлюємо фільтрований масив нотаток при зміні рядка пошуку або нотаток
  useEffect(() => {
    const filtered = notes.filter(
      note =>
        note.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        note.body.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchFilter, notes]);

  // Оновлюємо фільтрований масив нотаток при зміні рядка пошуку або нотаток
  const filteredNotesMemo = useMemo(() => {
    return notes.filter(
      note =>
        note.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        note.body.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [searchFilter, notes]);

  // Функція для додавання нової нотатки
  const addNote = newNote => {
    const id = nanoid(6);
    const time = Date.now();
    const noteWithTime = { ...newNote, time, id };
    setNotes([...notes, noteWithTime]);
    setCurrentNote(noteWithTime);
    if (selectDB === 'indexddb') {
      addNoteToDB(noteWithTime);
    }
    if (selectDB === 'quintadb') {
      postData();
    }
  };

  // Функція для редагування нотатки
  const editNote = editNote => {
    const updatedNotes = [...notes];
    const index = updatedNotes.findIndex(note => note.id === editNote.id);
    updatedNotes[index] = editNote;

    setNotes(updatedNotes);

    if (selectDB === 'indexddb') {
      updateNoteInDB(editNote);
    }
    if (selectDB === 'quintadb') {
      editItemsFromTable(editNote);
    }
  };

  // Функція для видалення нотатки
  const deleteNote = noteId => {
    if (selectDB === 'indexddb') {
      deleteNoteFromDB(noteId);
    }
    if (selectDB === 'quintadb') {
      deleteItemsFromTable(noteId);
    }

    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        currentNote,
        setCurrentNote,
        searchFilter,
        setSearchFilter,
        filteredNotes,
        filteredNotesMemo,
        addNote,
        editNote,
        deleteNote,
        allowEditing,
        setAllowEditing,
        selectDB,
        setSelectDB,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
