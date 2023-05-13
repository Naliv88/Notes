import React, { useContext } from 'react';
import { NotesContext } from '../../context/notesContext';
import { debounce } from 'lodash';
import style from './Workspace.module.css';

const Workspace = () => {
  // Отримуємо стан поточної нотатки, дозвіл на редагування та функцію редагування нотатки з контексту
  const { currentNote, setCurrentNote, allowEditing, editNote } =
    useContext(NotesContext);

  // Функція обробки зміни заголовка нотатки
  const handleTitleChange = e => {
    if (allowEditing) {
      debounceEditNoteTitle(e.target.value); // Використовуємо debounce з lodash для затримки збереження змін
      setCurrentNote({ ...currentNote, title: e.target.value }); // Зберігаємо зміну в стані поточної нотатки
    }
  };

  // Функція обробки зміни тіла нотатки
  const handleBodyChange = e => {
    if (allowEditing) {
      debounceEditNoteBody(e.target.value); // Використовуємо debounce з lodash для затримки збереження змін
      setCurrentNote({ ...currentNote, body: e.target.value }); // Зберігаємо зміну в стані поточної нотатки
    }
  };

  // Використовуємо debounce з lodash для затримки збереження змін заголовка нотатки
  const debounceEditNoteTitle = debounce(value => {
    editNote({ ...currentNote, title: value }); // Функція збереження змін в стані нотатки
  }, 200);

  // Використовуємо debounce з lodash для затримки збереження змін тіла нотатки
  const debounceEditNoteBody = debounce(value => {
    editNote({ ...currentNote, body: value }); // Функція збереження змін в стані нотатки
  }, 200);

  // Повертаємо JSX елементи
  return (
    <div className={style.workspace}>
      {/* Перевіряємо, чи є поточна нотатка, якщо є, то рендеримо поле для редагування заголовка */}
      {currentNote && (
        <textarea
          className={`${style.inputTitle} ${!allowEditing && style.disabled}`}
          rows="5"
          value={currentNote.title}
          onChange={handleTitleChange}
          disabled={!allowEditing}
        ></textarea>
      )}
      {/* Перевіряємо, чи є поточна нотатка, якщо є, то рендеримо поле для редагування нотатка */}
      {currentNote && (
        <textarea
          className={`${style.inputBody} ${!allowEditing && style.disabled}`}
          value={currentNote.body}
          onChange={handleBodyChange}
          disabled={!allowEditing}
        ></textarea>
      )}
    </div>
  );
};

export default Workspace;
