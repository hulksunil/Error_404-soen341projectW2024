// Modal.js
import React from 'react';
import './modal.css';

function Modal(props) {
  const { isOpen, onClose, car } = props;

  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2>{car.model}</h2>
            
          </div>
          <div className='modal-body'>
            <div className="imagemodal"><img src={car.url} alt="" /></div>
            <div>Type: {car.type}</div>
            <div>No. of Seats: {car.numberOfSeats}</div>
            <div>Fuel Type: {car.fuelType}</div>
            <div>Transmission: {car.transmission}</div>
            {/* Add additional information here */}
          </div>
          <button className='close-btn' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
