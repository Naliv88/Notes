import React, { useContext, useState } from 'react';
import { NotesContext } from '../../context/notesContext';
import style from './Sidebar.module.css';
import ListItem from '../ListItem/ListItem';

export const Sidebar = () => {
  const { setCurrentNote, filteredNotes } = useContext(NotesContext);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = note => {
    setCurrentNote(note);
    setSelectedNote(note);
  };

  return (
    <div className={style.sidebar}>
      {filteredNotes.map(note => (
        <ListItem
          key={note.id}
          note={note}
          onClick={() => handleNoteClick(note)}
          selected={selectedNote && selectedNote.id === note.id}
        />
      ))}
    </div>
  );
};

// export function ListItem({ note, onClick, selected }) {
//   const { title, id } = note;

//   return (
//     <button
//       className={`${style.ListItemButton} ${selected ? style.selected : ''}`}
//       onClick={() => onClick(note)}
//       id={id}
//     >
//       {title}
//     </button>
//   );
// }

// export default Sidebar;
