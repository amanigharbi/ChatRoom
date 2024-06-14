// Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // CSS file for styling the navbar

const Navbar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
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
