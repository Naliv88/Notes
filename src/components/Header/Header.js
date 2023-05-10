import React, { useContext, useState } from 'react';
import { NotesContext } from '../../context/notesContext';
import SearchBox from '../SearchBox/SearchBox';
import style from './Header.module.css';
import Modal from '../Modal/Modal';
import EditModal from '../Modal/EditModal';
import AddModal from '../Modal/AddModal';
import DeleteModal from '../Modal/DeleteModal';

function Header({ children }) {
  const initButtonStates = {
    add: false,
    delete: false,
    edit: false,
  };
  const { currentNote, addNote, editNote } = useContext(NotesContext);

  const [isOpen, setIsOpen] = useState(false);
  // const [formData, setFormData] = useState(null);
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

  const onCloseModal = () => {
    setButtonStates(initButtonStates);
    setIsOpen(false);
  };

  const onSubmitHandlerAdd = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const dataObj = Object.fromEntries(data.entries());
    console.log(dataObj);
    addNote(dataObj);
    // setFormData(data);
    onCloseModal();
  };

  const onSubmitHandlerEdit = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const dataObj = Object.fromEntries(data.entries());
    const newNote = { ...currentNote, ...dataObj };

    console.log(newNote);
    editNote(newNote);
    onCloseModal();
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div>
        <button
          onClick={toggleModal}
          value="add"
          className={`${style.buttonHeader} ${style.addButton}`}
        >
          <svg className={style.svgHeader}>
            <use
              href={`${process.env.PUBLIC_URL}/symbol-defs.svg#icon-plus`}
            ></use>
          </svg>
        </button>
        <button
          className={`${style.buttonHeader} ${style.deleteButton} ${
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
          className={`${style.buttonHeader} ${style.editButton} ${
            !currentNote ? style.disabled : ''
          }`}
          onClick={toggleModal}
          value="edit"
          disabled={!currentNote}
        >
          <svg className={style.svgHeader}>
            <use
              href={`${process.env.PUBLIC_URL}/symbol-defs.svg#icon-pencil`}
            ></use>
          </svg>
        </button>
        <SearchBox />
        <Modal isOpen={isOpen} onClose={onCloseModal}>
          {buttonStates.add && <AddModal onSubmit={onSubmitHandlerAdd} />}
          {buttonStates.delete && <DeleteModal onClose={handleModalClose} />}
          {buttonStates.edit && <EditModal onSubmit={onSubmitHandlerEdit} />}
        </Modal>
      </div>
      {children}
    </div>
  );
}

export default Header;
