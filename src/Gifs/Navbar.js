// Navbar.js
import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // CSS file for styling the navbar

const Navbar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const debouncedSearch = useCallback(
        _.debounce((query) => {
          onSearch(query);
        }, 300),
        []
      );
    
      const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        debouncedSearch(newQuery);
      };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-brand">GIF Search
        </span>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search GIFs..."
            onChange={handleInputChange}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
