import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import "./components/Navbar/navbar.css";
import "./styles/CheckOut.css";
import { convertToLocalForDisplay } from './UTCToLocal.ts'

export default function CheckOut() {
  type Reservation = {
    _id: string;
    userId: string;
    carId: string;
    reservationDate: string;
    returnDate: string;
    location: string;
    returnLocation: string;
    Additionalservices:{
      Insurance: boolean,
      GPS: boolean,
      EntertainmentSystems: boolean,
      MobilePhones: boolean,
      PortableWiFi: boolean,
      ChildSafetySeats: boolean
    };
  };

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useNavigate();

  function convertToLocalForDisplayWithOffset(date: Date): string {
    const convertedDate = convertToLocalForDisplay(date); // Assuming convertToLocalForDisplay is already implemented
    const adjustedDate = new Date(convertedDate);
    adjustedDate.setHours(adjustedDate.getHours() + 4); // Adding 4 hours
    return adjustedDate.toLocaleString();
  }

  function loadAllReservations() {
    axios
      .get('http://localhost:8080/reservations')
      .then((res) => {
        const convertedReservations = res.data.map((reservation: Reservation) => ({
          ...reservation,
          reservationDate: convertToLocalForDisplayWithOffset(new Date(reservation.reservationDate)),
          returnDate: convertToLocalForDisplayWithOffset(new Date(reservation.returnDate))
        }));
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
      <title >Check Out</title>
      <h1 className='coTitle'>CHECK OUT</h1>
      <button onClick={handleCreateReservation}>Create a Reservation</button>
      <div className="reservationContain">
        <table className="reservationTable">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Car ID</th>
              <th>Pickup Date and Time</th>
              <th>Return Date and Time</th>
              <th>Pickup Location</th>
              <th>Return Location</th>
              <th>Additional services</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='checkoutTableContent'>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.userId}</td>
                <td>{reservation.carId}</td>
                <td>{convertToLocalForDisplayWithOffset(new Date(reservation.reservationDate))}</td>
                <td>{convertToLocalForDisplayWithOffset(new Date(reservation.returnDate))}</td>
                <td>{reservation.location}</td>
                <td>{reservation.returnLocation}</td>
                <td>
                  <ul>
                    {Object.entries(reservation.Additionalservices).map(([service, included]) => (
                    <li key={service}>
                      {service}: <input type="checkbox" checked={included} readOnly />
                    </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button className='chkoBtn'  onClick={() => handleCheckout(reservation._id)}>Checkout</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </>
  );
}
