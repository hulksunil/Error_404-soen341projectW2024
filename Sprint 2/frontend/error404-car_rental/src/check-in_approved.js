import React from 'react';
import "./styles/agreement.css"
import Navbar from "./components/Navbar/navbar.jsx";

function CheckInApproved() {
    return (
        <>
        <Navbar/>
        <div className='conclude'>
            <h1>Check-in approved</h1>
            <p>Thank you for reserving a car in CARS R US. You can take the car and have a good trip!</p>
        </div>
        </>
        
    );
}

export default CheckInApproved;
