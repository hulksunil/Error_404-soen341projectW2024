import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import "./components/Navbar/navbar.css"
import "./styles/AdminPage.css";

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

  function updateReservation(reservationId: string, updatedReservation: Partial<Reservation>) {
    axios.put(`http://localhost:8080/UpdateReservation/${reservationId}`, updatedReservation)
      .then((res) => {
        if (res.status === 200) {

          loadAllReservations(); 
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
    }, [reservation]); 
  
    return (
      <tr>
        <td className="fieldInputs"><input type="text" name="userId" value={editableReservation.userId} onChange={handleInputChange} /></td>
        <td className="fieldInputs"><input type="text" name="carId" value={editableReservation.carId} onChange={handleInputChange} /></td>
        <td className="fieldInputs"><input type="text" name="reservationDate" value={editableReservation.reservationDate} onChange={handleInputChange} /></td>
        <td className="fieldInputs"><input type="text" name="returnDate" value={editableReservation.returnDate} onChange={handleInputChange} /></td>
        <td className="fieldInputs"><input type="text" name="location" value={editableReservation.location} onChange={handleInputChange} /></td>
        <td className="confirmation">
          <button className="submitButton" id="updateButton" onClick={handleUpdate}>Update</button>
          <button className="submitButton" id="deleteButton" onClick={() => deleteReservation(reservation._id)}>Delete</button>
        </td>
      </tr>
    );
  }
  function handleCreateReservation() {
    history('/browse'); 
  }

  if (loading) {
    return (
        <>
        <Navbar />
        <div>Loading...</div>
        </>
    );
  }

  return (
    <>
      <Navbar />
      <title>Modify Reservations</title>
      <h1>Modify Reservations</h1>
      <button className='LogBtn' onClick={handleCreateReservation}>Create a Reservation</button>
      <table className="modifyReservationTable">
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
