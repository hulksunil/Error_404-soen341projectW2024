
import React from 'react';
import './cardbrowse.css';
import { Link } from "react-router-dom";

function CardBrowse(props) {
  const { carId, model,type,transmission,numberOfSeats,fuelType,url} = props;
  return (
    <div className='card-container'>
      <div className="image-container">
        <img src={url} alt="" />
      </div>

      <div className="card-content">
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
  );
}

export default CardBrowse;
