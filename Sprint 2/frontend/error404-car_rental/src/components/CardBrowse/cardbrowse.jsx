import React from 'react';
import './cardbrowse.css';

function CardBrowse(props) {
  const { titleName, imageUrl, CarType, NoOfPass, PTrain } = props;
  return (
    <div className='card-container'>
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>

      <div className="card-content">
        <div className="card-title"><h2>{titleName}</h2></div>
        <div className="card-body">
          <div>Type: {CarType}</div>
          <br />
          <div>No. of passengers: {NoOfPass}</div>
          <br />
          <div>Powertrain: {PTrain}</div>
        </div>
        <div className="rentBtn"><button>Rent</button></div>
      </div>

      
    </div>
  );
}

export default CardBrowse;
