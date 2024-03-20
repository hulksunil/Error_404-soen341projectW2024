import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar/navbar';
import "./components/Navbar/navbar.css";
import "./styles/CheckoutRedirect.css";
import { Link } from "react-router-dom";

export default function CheckoutRedirect() {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalAmount, setTotalAmount] = useState<number>(0); 
  const history = useNavigate();

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
    let amountToAdd = value ? (trait === '500$ Deposit Returned' ? 500 : 800) : 0;
    if (trait.includes('Light Scratch')) {
      amountToAdd = value ? 400 : 0; 
    }
    if (trait.includes('Medium Scratch')) {
        amountToAdd = value ? 800 : 0; 
      }
      if (trait.includes('Large Scratch')) {
        amountToAdd = value ? 1200 : 0; 
      }
      if (trait.includes('Interior Damage')) {
        amountToAdd = value ? 1000 : 0; 
      }
      if (trait.includes('Unclean Interior')) {
        amountToAdd = value ? 250 : 0; 
      }
      if (trait.includes('Eq')) {
        amountToAdd = value ? 1200 : 0; 
      }
      if (trait.includes('Late Return')) {
        amountToAdd = value ? 200: 0; 
      }
    setTotalAmount(prevAmount => prevAmount + amountToAdd);
    axios.post('http://localhost:8080/CreateCheckout', {
      reservationId: reservationId,
      trait: trait,
      action: value ? 'Yes' : 'No'
    })
    .then((res) => {
      console.log('Confirmation data sent to the backend:', res.data);
    })
    .catch((error) => {
      console.error('Error sending confirmation data to the backend:', error);
    });
  }
  function handleCheckout() {
    const finalAmount = totalAmount - 500;
    if (finalAmount < 1) {
      history('/transactionapproved');
    } else {
      history(`/payment?amount=${finalAmount}`);
    }
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
      <div className="checkoutitle"><h1>Check Out Process</h1></div>
      <div className="checkoutFormContainer">
        <div className="generalInfo">
          <h1 className='giTitle'>General Information</h1>
          <h2>Checkout Form for Reservation ID: {reservationId}</h2>
          <h2>Client's Name: </h2>
          <h2>Car Model: </h2>
        </div>
        <div className="traitContainer">
          <h1 className="traitTitle">Car Condition</h1>
          <div className="description">Welcome to the checkout process! As you prepare to complete your rental, 
          we kindly ask for your assistance in verifying the condition of the vehicle. 
          Below, you'll find a list of traits related to the car's condition. 
          Please review each trait carefully and indicate whether it applies to the 
          vehicle you're returning by selecting "Yes" or "No".</div>
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
              <td>Light Scratch/Dent (400$)</td>
              <td><button onClick={() => handleCheckoutConfirmation('Light Scratch', true)}>Yes</button></td>
              <td><button onClick={() => handleCheckoutConfirmation('Light Scratch', false)}>No</button></td>
            </tr>
            <tr>
              <td>Medium Scratch/Dent (800$)</td>
              <td><button onClick={() => handleCheckoutConfirmation('Medium Scratch', true)}>Yes</button></td>
              <td><button onClick={() => handleCheckoutConfirmation('Medium Scratch', false)}>No</button></td>
            </tr>
            <tr>
              <td>Large Scratch/Dent (1200$)</td>
              <td><button onClick={() => handleCheckoutConfirmation('Large Scratch', true)}>Yes</button></td>
              <td><button onClick={() => handleCheckoutConfirmation('Large Scratch', false)}>No</button></td>
            </tr>
            <tr>
              <td>Interior Damage/Dent (1000$)</td>
              <td><button onClick={() => handleCheckoutConfirmation('Interior Damage', true)}>Yes</button></td>
              <td><button onClick={() => handleCheckoutConfirmation('Interior Damage', false)}>No</button></td>
            </tr>
            <tr>
              <td>Unclean Interior (250$)</td>
              <td><button onClick={() => handleCheckoutConfirmation('Unclean Interior', true)}>Yes</button></td>
              <td><button onClick={() => handleCheckoutConfirmation('Unclean Interior', false)}>No</button></td>
            </tr>
            <tr>
              <td>Equipment and Accessories Missing/Damaged (1200$)</td>
              <td><button onClick={() => handleCheckoutConfirmation('Eq Ac', true)}>Yes</button></td>
              <td><button onClick={() => handleCheckoutConfirmation('Eq Ac', false)}>No</button></td>
            </tr>
            <tr>
              <td>Late Return (200$)</td>
              <td><button onClick={() => handleCheckoutConfirmation('Late Return', true)}>Yes</button></td>
              <td><button onClick={() => handleCheckoutConfirmation('Late Return', false)}>No</button></td>
            </tr>
          </tbody>
        </table></div>
        
        <div className="signature">
          <h1 className="ackTitle">Acknowledgment</h1>
          <div>By signing below, the customer takes the responsibility for any kind of 
            damage to checked out vehicle and acknowledges that the vehicle 
            is working properly and in a good condition. 
            For any damage, the customer accepts to cover the cost of 
            damage to the vehicle.</div>
            E-signature: 

          <input type="signature" />
          <br />
          <button className='coBtn'> Check Out</button>
          </div>

      </div>
     
      <div className="confirmButtonContainer">
      <button onClick={handleCheckout}>Confirm</button>
        
      </div>
    </>
  );
}
