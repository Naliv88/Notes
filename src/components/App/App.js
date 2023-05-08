import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Workspace from '../Workspace/Workspace';
import { NotesProvider } from '../../context/notesContext';
// import DeleteModal from '../Modal/Modal';
import Header from '../Header/Header';

function App() {
  return (
    <NotesProvider>
      <div className="App">
        <Header>
          <Sidebar />
          <Workspace />
        </Header>
      </div>
    </NotesProvider>
  );
}

export default App;
