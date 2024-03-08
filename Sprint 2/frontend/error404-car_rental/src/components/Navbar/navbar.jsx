import React from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';


function navbar() {
  return (
    <nav className="navbar">
        <div className="navTitleName"><h1>CAR RENTAL</h1></div>
        <div className="desktopMenu">
            <Link className="desktopMenuListItem">Home</Link>
            <Link className="desktopMenuListItem">Browse</Link>
            <Link className="desktopMenuListItem">Reservation</Link>
            <Link className="desktopMenuListItem">About Us</Link>
        </div>
        <button className='LogBtn'>Log In/Sign Up</button>
    </nav>
  )
}

export default navbar