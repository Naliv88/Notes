import React, { useContext } from 'react';
import { NotesContext } from '../../context/notesContext';
import SearchBox from '../SearchBox/SearchBox';
import style from './Header.module.css';

function Header({ children }) {
  const { currentNote } = useContext(NotesContext);

  return (
    <>
      <div>
        <div className={style.headerConteiner}>
          <div className={style.buttonConteiner}>
            <button className={style.headerButton} disabled={!currentNote}>
              &#43;
            </button>
            <button className={style.headerButton} disabled={!currentNote}>
              &#x1F5D1;
            </button>
            <button className={style.headerButton} disabled={!currentNote}>
              &#x270F;
            </button>
          </div>
          <SearchBox />
        </div>
        {children}
      </div>
    </>
  );
}

export default Header;
