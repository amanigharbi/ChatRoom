import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GifSearch from './Gifs/GifSearch';
import Modal from './Gifs/Modal';
import Navbar from './Gifs/Navbar';
const App = () => {
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

    const fetchGifs = async (query) => {
      const apiKey = 'bQyqA7WoIVLUbbwEnjyV2wyXgWp3Ae2s';
      const url = query
      ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=25&offset=0&lang=en&bundle=messaging_non_clips&q=${query}`
      : `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=g`;

      try {
        const response = await axios.get(url);
        if (response.data && response.data.data) {
                  // Filter out gifs without username
          const filteredGifs = response.data.data.filter(gif => gif.username); 
                  //sort with import datetime

          const sortedGifs = filteredGifs.sort((a, b) =>
            new Date(b.import_datetime) - new Date(a.import_datetime)
          );
          setGifs(sortedGifs);
        } else {
          console.error('Error: Invalid response from API');
        }
      } catch (error) {
        console.error('Error fetching the GIFs:', error);
        // Handle API errors here
      }
       
    };
    const handleGifClick = (gif) => {
      setSelectedGif(gif);
    };
  
    const handleCloseModal = () => {
      setSelectedGif(null);
    };
    useEffect(() => {
      // Initial load
    fetchGifs('trending'); 
  },  []);



  return (
    <div className="App">
      <Navbar onSearch={fetchGifs} /> 
      <h1>Trending GIF</h1>

            <div className="gif-grid">
        {gifs.map((gif) => (
          <div key={gif.id} className="gif-item" onClick={() => handleGifClick(gif)}>
            <img src={gif.images.original.url} alt={gif.title} />
            <p>Imported on: {new Date(gif.import_datetime).toLocaleString()}</p>
            {gif.username && <p>Uploader: {gif.username}</p>}
          </div>
        ))}
      </div>
      <Modal show={selectedGif !== null} handleClose={handleCloseModal} gif={selectedGif} />
    </div>
  );
};

export default App;