import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/navbar';
import './AdminPage.css';

export default function ModifyReservations() {
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

  function updateReservation(reservationId: string, updatedReservation: Partial<Reservation>) {
    axios.put(`http://localhost:8080/UpdateReservation/${reservationId}`, updatedReservation)
      .then((res) => {
        if (res.status === 200) {
          // Handle success
          loadAllReservations(); // Reload reservations after update
        }
      })
      .catch((error) => {
        console.error('Error updating reservation:', error);
      });
  }
  
  

  function deleteReservation(reservationId: string) {
    axios
      .delete(`http://localhost:8080/reservations/${reservationId}`)
      .then((res) => {
        if (res.status === 200) {
          // Reload reservations after delete
          loadAllReservations();
        }
      })
      .catch((error) => {
        console.error('Error deleting reservation:', error);
      });
  }

  function handleSubmit(event: React.FormEvent, updatedReservation: Reservation) {
    event.preventDefault();
    updateReservation(updatedReservation._id, updatedReservation);
  }
  
  
  function ReservationRow({ reservation }: { reservation: Reservation }) {
    const [editableReservation, setEditableReservation] = useState<Reservation>(reservation);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setEditableReservation({ ...editableReservation, [name]: value });
    };
  
    const handleUpdate = () => {
        const updatedFields = {
          userId: editableReservation.userId,
          carId: editableReservation.carId,
          reservationDate: editableReservation.reservationDate,
          returnDate: editableReservation.returnDate,
          location: editableReservation.location
        };
      
        updateReservation(editableReservation._id, updatedFields);
      };
      
      
      
  
    useEffect(() => {
      setEditableReservation(reservation);
    }, [reservation]); // Update editableReservation when the reservation prop changes
  
    return (
      <tr>
        <td><input type="text" name="userId" value={editableReservation.userId} onChange={handleInputChange} /></td>
        <td><input type="text" name="carId" value={editableReservation.carId} onChange={handleInputChange} /></td>
        <td><input type="text" name="reservationDate" value={editableReservation.reservationDate} onChange={handleInputChange} /></td>
        <td><input type="text" name="returnDate" value={editableReservation.returnDate} onChange={handleInputChange} /></td>
        <td><input type="text" name="location" value={editableReservation.location} onChange={handleInputChange} /></td>
        <td>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => deleteReservation(reservation._id)}>Delete</button>
        </td>
      </tr>
    );
  }
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <title>Modify Reservations</title>
      <h1>Modify Reservations</h1>
      <table className="reservationTable">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Car ID</th>
            <th>Reservation Date</th>
            <th>Return Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <ReservationRow key={reservation._id} reservation={reservation} />
          ))}
        </tbody>
      </table>
    </>
  );
}