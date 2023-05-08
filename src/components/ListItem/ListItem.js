import React from 'react';
import style from './ListItem.module.css';

function ListItem({ note, onClick, selected }) {
  const { title, id } = note;

  return (
    <li>
      <button onClick={() => onClick(note)} id={id}>
        {title}
      </button>
    </li>
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
