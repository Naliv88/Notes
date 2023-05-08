import { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getAllNotesFromDB } from '../../database/database';

function DeleteModal(props) {
  const [show, setShow] = useState(false);
  const { notes, addNote } = useContext();
  console.log(notes);

  const [note, setNotes] = useState([notes]);

  console.log(note);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const escapeListener = evt => {
      if (evt.code === 'Escape') {
        handleClose();
      }
    };
    document.querySelector('html').style.overflow = 'hidden';
    window.addEventListener('keydown', escapeListener);

    return () => {
      document.querySelector('html').style.overflow = 'visible';
      window.removeEventListener('keydown', escapeListener);
    };
  }, [show]);

  const handleOverlayClick = evt => {
    console.log(evt);
    if (evt.target === evt.currentTarget) {
      console.log('delete');
      handleClose();
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Видалити
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Підтвердження видалення</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ви впевнені, що хочете видалити цей елемент?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрити
          </Button>
          <Button variant="danger" onClick={handleOverlayClick}>
            Видалити
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
