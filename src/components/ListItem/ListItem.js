import React from 'react';
import style from './ListItem.module.css';

function ListItem({ note, onClick, selected }) {
  const { title, id } = note;

  return (
    <button
      className={style.ListItemButton}
      onClick={() => onClick(note)}
      id={id}
    >
      {title}
    </button>
  );
}

export default ListItem;

//     <li>
//       <button
//         onClick={() => onClick(note)}
//         id={id}
//       >
//         {title}
//       </button>
//     </li>
