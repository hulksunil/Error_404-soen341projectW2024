import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import "./components/Navbar/navbar.css";
import "./styles/AdminPage.css";

export default function CheckOut() {
  type Reservation = {
    _id: string;
    userId: string;
    carId: string;
    reservationDate: string;
    returnDate: string;
    location: string;
  };

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useNavigate();

  function loadAllReservations() {
    axios
      .get('http://localhost:8080/reservations')
      .then((res) => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadAllReservations();
  }, []);

  function handleCreateReservation() {
    history('/browse'); 
  }

  function handleCheckout(reservationId: string) {
    history(`/checkoutredirect/${reservationId}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <title>Check Out</title>
      <h1>CHECK OUT</h1>
      <button onClick={handleCreateReservation}>Create a Reservation</button>
      <table className="reservationTable">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Car ID</th>
            <th>Reservation Date</th>
            <th>Return Date</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.userId}</td>
              <td>{reservation.carId}</td>
              <td>{reservation.reservationDate}</td>
              <td>{reservation.returnDate}</td>
              <td>{reservation.location}</td>
              <td>
                <button onClick={() => handleCheckout(reservation._id)}>Checkout</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
