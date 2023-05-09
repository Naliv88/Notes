import React from 'react';
// import style from './Modal.module.css';

export default function AddModal({ onSubmit }) {
  return (
    <div>
      <h3>Add new note</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="body">Text:</label>
        <input type="text" id="body" name="body" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
