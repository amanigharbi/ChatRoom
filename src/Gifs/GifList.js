import React from 'react';

const GifList = ({ gifs }) => {
  return (
    <div className="gif-list">
      {gifs.map((gif) => (
        <div key={gif.id} className="gif-item">
          <img src={gif.images.original.url} alt={gif.title} />
          <p>Imported on: {new Date(gif.import_datetime).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default GifList;
