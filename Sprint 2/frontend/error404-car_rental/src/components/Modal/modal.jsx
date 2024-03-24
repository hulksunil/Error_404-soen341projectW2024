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
            <div className='modalAttributes'>Type: {car.type}</div>
            <div className='modalAttributes'>No. of Seats: {car.numberOfSeats}</div>
            <div className='modalAttributes'>Fuel Type: {car.fuelType}</div>
            <div className='modalAttributes'>Transmission: {car.transmission}</div>
            <div className='modalAttributes'>Rental Price: {car.rentalPrice}</div>
            <div className='modalAttributes'>Color: {car.color}</div>
            <div className='modalAttributes'>Drivetrain: {car.drivetrain}</div>
            <div className='modalAttributes'>Bluetooth: {car.hadBluetooth}</div>
            {/* Add additional information here */}
          </div>
          <button className='close-btn' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
