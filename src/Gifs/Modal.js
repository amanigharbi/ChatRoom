// Modal.js
import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ show, handleClose, gif, relatedGifs }) => {
  if (!show) return null;

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-main" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {gif && (
          <>
            <img src={gif.images.original.url} alt={gif.title} className="modal-image" />
            <h2>{gif.title}</h2>
            <p>Uploaded by: {gif.username}</p>
            <h3>Related GIFs</h3>
            <div className="related-gif-grid">
              {relatedGifs.map((relatedGif) => (
                <div key={relatedGif.id} className="related-gif-item">
                  <img src={relatedGif.images.original.url} alt={relatedGif.title} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
