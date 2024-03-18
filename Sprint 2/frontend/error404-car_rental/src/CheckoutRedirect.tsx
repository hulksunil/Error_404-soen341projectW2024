import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar/navbar';
import "./components/Navbar/navbar.css";


export default function CheckoutRedirect() {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/reservations/${reservationId}`)
      .then((res) => {
        setReservation(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reservation:', error);
        setLoading(false);
      });
  }, [reservationId]);

  function handleCheckoutConfirmation(trait: string, value: boolean) {
    console.log(`Trait: ${trait}, Value: ${value}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!reservation) {
    return <div>Reservation not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="checkoutFormContainer">
        <h1>Checkout Form for Reservation ID: {reservationId}</h1>
        <table className="checkoutFormTable">
          <thead>
            <tr>
              <th>Trait</th>
              <th>Yes</th>
              <th>No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Light Scratch</td>
              <td><button onClick={() => handleCheckoutConfirmation('Light Scratch', true)}>Yes</button></td>
              <td><button onClick={() => handleCheckoutConfirmation('Light Scratch', false)}>No</button></td>
            </tr>
            <tr>
              <td>Medium Scratch</td>
              <td><button onClick={() => handleCheckoutConfirmation('Medium Scratch', true)}>Yes</button></td>
              <td><button onClick={() => handleCheckoutConfirmation('Medium Scratch', false)}>No</button></td>
            </tr>
            <tr>
              <td>Large Scratch</td>
              <td><button onClick={() => handleCheckoutConfirmation('Large Scratch', true)}>Yes</button></td>
              <td><button onClick={() => handleCheckoutConfirmation('Large Scratch', false)}>No</button></td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </>
  );
}
