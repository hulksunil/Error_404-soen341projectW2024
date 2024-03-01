import React from 'react';
import './cardbrowse.css';

function CardBrowse(props) {
  const { titleName, imageUrl, body } = props;
  return (
    <div className='card-container'>
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>

      <div className="card-content">
        <div className="card-title"><h2>{titleName}</h2></div>
        <div className="card-body"><p>{body}</p></div>
      </div>

      
    </div>
  );
}

export default CardBrowse;
