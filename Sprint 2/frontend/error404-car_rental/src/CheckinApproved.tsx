import React, { useState, useEffect } from 'react';
import "./styles/agreement.css"
import Navbar from "./components/Navbar/navbar.jsx";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CheckInApproved() {
    const { carId } = useParams();
    const [carImage, setCarImage] = useState(null);

    useEffect(() => {
        // Fetch car data using carId from the URL params
        axios.get(`http://localhost:8080/vehicles/${carId}`)
            .then(response => {
                const imageUrl = response.data.url;
                setCarImage(imageUrl);
            })
            .catch(error => {
                console.error("Error fetching car data:", error);
            });
    }, [carId]);

    return (
        <>
        <Navbar/>
        <div className='conclude'>
            <h1>Check-in approved</h1>
            <p>Thank you for reserving a car in CARS R US. You can take the car and have a good trip!</p>
            <br/>
            {carImage && (
                    <img src={carImage} alt="Reserved Car" width={1000} />
                )}
        </div>
        </>
        
    );
}

export default CheckInApproved;
