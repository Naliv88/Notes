import React, { useContext } from 'react';
import { NotesContext } from '../../context/notesContext';

const SearchBox = () => {
  const { searchFilter, setSearchFilter } = useContext(NotesContext);

  function handleSearchFilterChange(e) {
    console.log(e.target);
    setSearchFilter(e.target.value);
  }
  return (
    <div className="search">
      <label htmlFor="search">Search: </label>

      <input
        id="search"
        type="text"
        value={searchFilter}
        onChange={handleSearchFilterChange}
      />
    </div>
  );
};

export default SearchBox;
