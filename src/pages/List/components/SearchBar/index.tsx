import React, { useState, useCallback } from 'react';

import './style.sass';

const SearchBar = ({ onSearch }: any) => {
  const [search, setSearch] = useState('');

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    onSearch(value);
  }, []);

  return (
    <div className="search-bar">
      <div className="search-bar-block">
        <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Nome ou número" className="search-bar-input"/>
      </div>
    </div>
  )
};

export default SearchBar;
