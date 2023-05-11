import React from 'react';
import style from './ListItem.module.css';

export function ListItem({ note, onClick, selected }) {
  const { title, id, time } = note;

  const date = new Date(time);

  const formattedDate = `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  return (
    <button
      className={`${style.ListItemButton} ${selected ? style.selected : ''}`}
      onClick={() => onClick(note)}
      id={id}
    >
      <p>{title}</p>
      <p>{formattedDate}</p>
    </button>
  );
}

export default ListItem;
