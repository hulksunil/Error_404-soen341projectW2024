// Modal.js
import React from 'react'
import './modal.css'

function Modal (props) {
  const { isOpen, onClose, car } = props

  if (!isOpen) return null

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2>{car.model}</h2>
          </div>
          <div className='modal-body'>
            <div className='image-and-attributes'>
              <div className='imagemodal'><img src={car.url} alt='' /></div>
              <div className='modalAttributes'>
                <span className='attribute'>Type:</span> {car.type}<br />
                <span className='attribute'>No. of Seats:</span> {car.numberOfSeats}<br />
                <span className='attribute'>Fuel Type:</span> {car.fuelType}<br />
                <span className='attribute'>Transmission:</span> {car.transmission}<br />
                <span className='attribute'>Rental Price:</span> {car.rentalPrice}<br />
                <span className='attribute'>Color:</span> {car.color}<br />
                <span className='attribute'>Drivetrain:</span> {car.drivetrain}<br />
                <span className='attribute'>Bluetooth:</span> {car.hasBluetooth}<br />
                <span className='attribute'>License Plate:</span> {car.licensePlate}<br />
                {/* Add additional information here */}
              </div>
            </div>
          </div>
          <button className='close-btn' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
