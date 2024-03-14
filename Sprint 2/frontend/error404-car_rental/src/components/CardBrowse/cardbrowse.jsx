import React from 'react';
import './cardbrowse.css';
import { Link } from "react-router-dom";

function CardBrowse(props) {
  const { model,type,transmission,numberOfSeats,fuelType,carID} = props;
  return (
    <div className='card-container'>
      <div className="image-container">
        <img src="https://media.wired.com/photos/5cf0413114e889d1d895c5d9/master/pass/techintwo_Ferrari.jpg" alt="" />
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
          <Link to='/reservation?carID=${carID}'>Rent</Link>
        </div>
      </div>

      
    </div>
  );
}

export default CardBrowse;
