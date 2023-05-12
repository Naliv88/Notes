import React, { useContext, useState } from 'react';
import { NotesContext } from '../../context/notesContext';
import SearchBox from '../SearchBox/SearchBox';
import style from './Header.module.css';
import Modal from '../Modal/Modal';
import DeleteModal from '../Modal/DeleteModal';
import SelectDB from './SelectDB';

function Header({ children }) {
  const initButtonStates = {
    add: false,
    delete: false,
    edit: false,
  };
  const { notes, setNotes, currentNote, setAllowEditing, addNote, editNote } =
    useContext(NotesContext);

  const [isOpen, setIsOpen] = useState(false);
  const [buttonStates, setButtonStates] = useState(initButtonStates);

  const toggleModal = event => {
    const value = event.target.value;
    console.log(event.target);
    setButtonStates(prevState => ({
      ...initButtonStates,
      [value]: true,
    }));
    setIsOpen(true);
  };

  const toggleEdit = event => {
    setAllowEditing(prevState => !prevState);
  };

  const addNoteButton = e => {
    const initNotes = { title: '', body: '' };
    // const newNotes = notes.concat(initNotes);
    // setNotes(newNotes);
    addNote(initNotes);
  };

  const onCloseModal = () => {
    setButtonStates(initButtonStates);
    setIsOpen(false);
  };

  // const onSubmitHandlerAdd = event => {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   const dataObj = Object.fromEntries(data.entries());
  //   console.log(dataObj);
  //   addNote(dataObj);
  //   // setFormData(data);
  //   onCloseModal();
  // };

  // const onSubmitHandlerEdit = event => {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   const dataObj = Object.fromEntries(data.entries());
  //   const newNote = { ...currentNote, ...dataObj };

  //   console.log(newNote);
  //   editNote(newNote);
  //   onCloseModal();
  // };

  const handleModalClose = () => {
    setIsOpen(false);
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
            onClick={toggleModal}
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
            className={`${style.buttonHeader} ${
              !currentNote ? style.disabled : ''
            }`}
            onClick={toggleEdit}
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
        <Modal isOpen={isOpen} onClose={onCloseModal}>
          <DeleteModal onClose={handleModalClose} />
        </Modal>
      </div>
      {children}
    </div>
  );
}

export default Header;
