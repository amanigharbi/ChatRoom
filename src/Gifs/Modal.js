import React, { useState, useEffect, useRef,useCallback } from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ handleClose, show, gif }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef(null);

  const toggleZoom = () => {
    setIsZoomed(prevZoom => !prevZoom);
  };

  const closeModal = useCallback(() => {
    setIsZoomed(false);
    handleClose();
  }, [handleClose]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show,closeModal]);

  if (!show || !gif) {
    return null; 
  }

  return (
    <div className="modal">
      <div ref={modalRef} className="modal-main">
        <button className="modal-close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-image-container" onClick={toggleZoom}>
          <img
            src={gif.images.original.url}
            alt={gif.title}
            className={`modal-image ${isZoomed ? 'zoomed' : ''}`}
          />
        </div>
        <p>Imported on: {new Date(gif.import_datetime).toLocaleString()}</p>
        {gif.username && <p>Uploader: {gif.username}</p>}
      </div>
    </div>
  );
};

export default Modal;
