import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Gifs/Modal';
import Navbar from './Gifs/Navbar';
import Footer from './Gifs/Footer';

const App = () => {
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [error, setError] = useState('');

  const fetchGifs = async (query) => {
    const apiKey = 'bQyqA7WoIVLUbbwEnjyV2wyXgWp3Ae2s';
    const url = query
      ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=25&offset=0&lang=en&bundle=messaging_non_clips&q=${query}`
      : `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=g`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.data) {
        const filteredGifs = response.data.data.filter(gif => gif.username);
        const sortedGifs = filteredGifs.sort((a, b) =>
          new Date(b.import_datetime) - new Date(a.import_datetime)
        );
        setGifs(sortedGifs);
        setError('');
      } else {
        setError('Error: Invalid response from API');
      }
    } catch (error) {
      setError('Error fetching the GIFs: ' + error.message);
    }
  };

  const fetchRelatedGifs = async (title) => {
    const apiKey = 'bQyqA7WoIVLUbbwEnjyV2wyXgWp3Ae2s';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=25&offset=0&lang=en&bundle=messaging_non_clips&q=${title}`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.data) {
        const filteredGifs = response.data.data.filter(gif => gif.username);
        const sortedGifs = filteredGifs.sort((a, b) =>
          new Date(b.import_datetime) - new Date(a.import_datetime)
        );
        setRelatedGifs(sortedGifs);
        setError('');
      } else {
        setError('Error: Invalid response from API');
      }
    } catch (error) {
      setError('Error fetching related GIFs: ' + error.message);
    }
  };

  const handleGifClick = (gif) => {
    setSelectedGif(gif);
    fetchRelatedGifs(gif.title);
  };

  const handleCloseModal = () => {
    setSelectedGif(null);
    setRelatedGifs([]);
  };

  useEffect(() => {
    fetchGifs('trending');
  }, []);

  return (
    <div className="App">
      <Navbar onSearch={fetchGifs} />
      <h1>Trending GIFs</h1>
      {error && <div className="error-message">{error}</div>}
      {!error && gifs.length === 0 && <div className="no-gifs-message">No GIFs found.</div>}
      <div className="gif-grid">
        {gifs.map((gif) => (
          <div key={gif.id} className="gif-item" onClick={() => handleGifClick(gif)}>
            <img src={gif.images.original.url} alt={gif.title} />
            <p>Imported on: {new Date(gif.import_datetime).toLocaleString()}</p>
            {gif.username && <p>Uploader: {gif.username}</p>}
          </div>
        ))}
      </div>
      <Modal
        show={selectedGif !== null}
        handleClose={handleCloseModal}
        gif={selectedGif}
        relatedGifs={relatedGifs}
      />
      <Footer />
    </div>
  );
};

export default App;
