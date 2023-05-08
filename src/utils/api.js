// У папці "utils" містяться допоміжні файли, такі як API для роботи з базою даних QuintaDB.
import axios from 'axios';
import { useEffect, useState } from 'react';

import { NoteContext } from '../../context/notesContext';

export default function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    axios
      .get('https://api.quintadb.com/v1/records', {
        params: {
          projectid: '<your_project_id>',
          token: '<your_api_key>',
          formid: '<your_form_id>',
        },
      })
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error('Error retrieving notes:', error);
      });
  }, []);

  const addNote = note => {
    axios
      .post('https://api.quintadb.com/v1/forms', {
        projectid: '<your_project_id>',
        token: '<your_api_key>',
        formid: '<your_form_id>',
        record: note,
      })
      .then(response => {
        setNotes([...notes, response.data]);
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  };

  const deleteNote = id => {
    axios
      .delete(`https://api.quintadb.com/v1/forms/${id}`, {
        params: {
          projectid: '<your_project_id>',
          token: '<your_api_key>',
          formid: '<your_form_id>',
        },
      })
      .then(() => {
        setNotes(notes.filter(note => note._id !== id));
        setSelectedNote(null);
      })
      .catch(error => {
        console.error('Error deleting note:', error);
      });
  };

  const updateNote = note => {
    axios
      .put(`https://api.quintadb.com/v1/forms/${note._id}`, {
        projectid: '<your_project_id>',
        token: '<your_api_key>',
        formid: '<your_form_id>',
        record: note,
      })
      .then(() => {
        setNotes(notes.map(n => (n._id === note._id ? note : n)));
      })
      .catch(error => {
        console.error('Error updating note:', error);
      });
  };

  const value = {
    notes,
    selectedNote,
    setSelectedNote,
    addNote,
    deleteNote,
    updateNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}
