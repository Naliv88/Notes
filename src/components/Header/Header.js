import React, { useContext, useState } from 'react';
import { NotesContext } from '../../context/notesContext';
import SearchBox from '../SearchBox/SearchBox';
import style from './Header.module.css';
import Modal from '../Modal/Modal';
import DeleteModal from '../Modal/DeleteModal';
import SelectDB from './SelectDB';

function Header({ children }) {
  const { currentNote, allowEditing, setAllowEditing, addNote } =
    useContext(NotesContext);

  const [isOpen, setIsOpen] = useState(false);

  const addNoteButton = e => {
    const initNotes = { title: '', body: '' };
    addNote(initNotes);
  };

  return (
    <div>
      <div className={style.HeaderContainer}>
        <div>
          <button
            onClick={addNoteButton}
            value="add"
            className={`${style.buttonHeader}`}
          >
            <svg className={style.svgHeader}>
              <use
                href={`${process.env.PUBLIC_URL}/symbol-defs.svg#icon-plus`}
              ></use>
            </svg>
          </button>
          <button
            className={`${style.buttonHeader} ${
              !currentNote ? style.disabled : ''
            }`}
            onClick={() => {
              setIsOpen(true);
            }}
            value="delete"
            disabled={!currentNote}
          >
            <svg className={style.svgHeader}>
              <use
                href={`${process.env.PUBLIC_URL}/symbol-defs.svg#icon-bin`}
              ></use>
            </svg>
          </button>
          <button
            className={`${style.buttonHeader} 
            ${!currentNote ? style.disabled : ''} 
            ${allowEditing ? style.select : ''}`}
            onClick={() => {
              setAllowEditing(prevState => !prevState);
            }}
            value="edit"
            disabled={!currentNote}
          >
            <svg className={style.svgHeader}>
              <use
                href={`${process.env.PUBLIC_URL}/symbol-defs.svg#icon-pencil`}
              ></use>
            </svg>
          </button>
        </div>
        <SelectDB />
        <SearchBox />
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DeleteModal
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </Modal>
      </div>
      {children}
    </div>
  );
}

export default Header;
