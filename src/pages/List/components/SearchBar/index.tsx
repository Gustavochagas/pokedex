import React, { useState } from 'react';

import './style.sass';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="search-bar">
      <div className="search-bar-block">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nome ou número" className="search-bar-input"/>
      </div>
    </div>
  )
};

export default SearchBar;
