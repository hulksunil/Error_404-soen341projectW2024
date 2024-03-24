// CardBrowse.js
import React, { useState } from 'react';
import './cardbrowse.css';
import { Link } from "react-router-dom";
import Modal from "../Modal/modal";

function CardBrowse(props) {
  const { carId, model, type, transmission, numberOfSeats, fuelType, url, onCompare } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCompareClick = () => {
    onCompare(carId); // Call the comparison method passed from the parent component
  };

  return (
    <>
      <div className='card-container' >
        <div className="image-container" onClick={handleCardClick}>
          <img src={url} alt="" />
        </div>

        <div className="card-content" onClick={handleCardClick}>
          <div className="card-title"><h2>{model}</h2></div>
          <div className="card-body">
            <div>Type: {type}</div>
            <br />
            <div>No. of Seats: {numberOfSeats}</div>
            <br />
            <div>Fuel Type: {fuelType}</div>
            <br />
            <div>Transmission: {transmission}</div>
          </div>
          
        </div>
        <div className="button-container">
            <button className="compareBtn" onClick={handleCompareClick}>Compare</button>
            <div className="rentBtn">
              <Link to={`/reservation?carId=${carId}`}>Rent</Link>
            </div>
          </div>

      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} car={props} />
    </>
  );
}

export default CardBrowse;
