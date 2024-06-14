import React, { useState } from 'react';

const GifSearch = ({ fetchGifs }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGifs(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for GIFs"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default GifSearch;
