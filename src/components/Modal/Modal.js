import React, { useState, useEffect, useRef } from 'react';
import style from './Modal.module.css';

export default function Modal({ isOpen, onClose, children }) {
  const modalContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    function onClickOutsideHandler(event) {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    function onEscHandler(event) {
      if (isOpen && event.keyCode === 27) {
        onClose();
      }
    }

    if (isOpen) {
      setIsModalOpen(true);
      document.body.classList.add('modal-open');
      document.addEventListener('click', onClickOutsideHandler);
      document.addEventListener('keydown', onEscHandler);
    } else {
      setIsModalOpen(false);
      document.body.classList.remove('modal-open');
      document.removeEventListener('click', onClickOutsideHandler);
      document.removeEventListener('keydown', onEscHandler);
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('click', onClickOutsideHandler);
      document.removeEventListener('keydown', onEscHandler);
    };
  }, [isOpen, onClose]);

  return (
    isModalOpen && (
      <div className={style.modalOverlay}>
        <div className={style.modalContainer} ref={modalContainerRef}>
          <div className={style.modalBody}>{children}</div>
          <button className={style.modalCloseButton} onClick={onClose}>
            <svg className={style.modalCloseButtonSvg}>
              <use
                href={`${process.env.PUBLIC_URL}/symbol-defs.svg#icon-cross`}
              ></use>
            </svg>
          </button>
        </div>
      </div>
    )
  );
}
