// GifSearch.js
import React, { useState, useEffect } from 'react';

const GifSearch = ({ fetchGifs }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchGifs(''); 
  }, [fetchGifs]); 

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    fetchGifs(value); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search GIFs..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default GifSearch;
