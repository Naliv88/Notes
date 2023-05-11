import React, { useContext, useState } from 'react';
import { NotesContext } from '../../context/notesContext';
// import style from './Modal.module.css';

export default function EditModal({ onSubmit }) {
  const { currentNote } = useContext(NotesContext);
  const [title, setTitle] = useState(currentNote.title);
  const [body, setBody] = useState(currentNote.body);

  return (
    <div>
      <h3>Modal Title edit</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />

        <label htmlFor="body">Text:</label>
        <input
          type="text"
          id="body"
          name="body"
          value={body}
          onChange={event => {
            setBody(event.target.value);
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
