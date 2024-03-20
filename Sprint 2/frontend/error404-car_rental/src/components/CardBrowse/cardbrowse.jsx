
import React, {useState} from 'react';
import './cardbrowse.css';
import { Link } from "react-router-dom";
import Modal from "../Modal/modal";

function CardBrowse(props) {
  const { carId, model,type,transmission,numberOfSeats,fuelType,url} = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    console.log("Card clicked");
    setIsModalOpen(true);
    console.log("Modal open:", isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };


  return (
    <>
    <div className='card-container' onClick={handleCardClick}>
      <div className="image-container">
        <img src={url} alt="" />
      </div>

      <div className="card-content" onClick={handleCardClick}>
        <div className="card-title"><h2>{model}</h2></div>
        <div className="card-body">
          <div>Type: {type}</div>
          <br />
          <div>No. of Seats: {numberOfSeats}</div>
          <br />
          <div>Fuel TYpe: {fuelType}</div>
          <br />
          <div>Transmission: {transmission}</div>
        </div>
        <div className="rentBtn" >
          
          <Link to={`/reservation?carId=${carId}`}>Rent</Link>
        </div>
      </div>
    </div>
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} car={props} />
   </>
); 
}

export default CardBrowse;
