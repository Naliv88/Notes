import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import Workspace from '../Workspace/Workspace';
import { NotesProvider } from '../../context/notesContext';
// import DeleteModal from '../Modal/Modal';
import Header from '../Header/Header';
import style from './App.module.css';

function App() {
  return (
    <NotesProvider>
      <div className="App">
        <Header>
          <div className={style.container}>
            <Sidebar />
            <Workspace />
          </div>
        </Header>
      </div>
    </NotesProvider>
  );
}

export default App;
