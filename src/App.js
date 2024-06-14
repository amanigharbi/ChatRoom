import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GifSearch from './Gifs/GifSearch';
const App = () => {
  const [gifs, setGifs] = useState([]);

    const fetchGifs = async (query) => {
      const apiKey = 'bQyqA7WoIVLUbbwEnjyV2wyXgWp3Ae2s'; // Replace with your key
      const url = query
      ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=25&offset=0&lang=en&bundle=messaging_non_clips&q=${query}`
      : `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=g`;

      try {
        const response = await axios.get(url);
        const filteredGifs = response.data.data.filter(gif => gif.username); // Filter out gifs without username
        //sort with import datetime
        const sortedGifs = filteredGifs.sort((a, b) =>
          new Date(b.import_datetime) - new Date(a.import_datetime)
        );
        setGifs(sortedGifs);
      } catch (error) {
        console.error('Error fetching the GIFs:', error);
      }
    };

    useEffect(() => {
      // Initial load 
    fetchGifs(''); 
  },  []);



  return (
    <div className="App">
      <h1>GIF Search</h1>
      <GifSearch fetchGifs={fetchGifs} />
      <div className="gif-grid">
        {gifs.map((gif) => (
          <div key={gif.id} className="gif-item">
            <img src={gif.images.original.url} alt={gif.title} />
            <p>Imported on: {new Date(gif.import_datetime).toLocaleString()}</p>
            {gif.username && <p>Uploader: {gif.username}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;