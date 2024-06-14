import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [gifs, setGifs] = useState([]);
// Consommmation de l'api
  useEffect(() => {
    const fetchGifs = async () => {
      const apiKey = 'bQyqA7WoIVLUbbwEnjyV2wyXgWp3Ae2s'; 
      const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&offset=0&lang=en&bundle=messaging_non_clips`;

      try {
        const response = await axios.get(url);
        const sortedGifs = response.data.data.sort((a, b) =>
          new Date(b.import_datetime) - new Date(a.import_datetime)
        );
        setGifs(sortedGifs);
      } catch (error) {
        console.error('Error fetching the GIFs:', error);
      }
    };

    fetchGifs();
  }, []);

  return (
    <div className="App">
      <h1>Trending GIFs</h1>
      <div className="gif-list">
        {gifs.map((gif) => (
          <div key={gif.id} className="gif-item">
            <img src={gif.images.original.url} alt={gif.title} />
            <p>Imported on: {new Date(gif.import_datetime).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

