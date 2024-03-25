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
    returnLocation:string;
    Additionalservices: {
      Insurance: boolean;
      GPS: boolean;
      EntertainmentSystems: boolean;
      MobilePhones: boolean;
      PortableWiFi: boolean;
      ChildSafetySeats: boolean;
    };
  };

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [branchLocations, setBranchLocations] = useState<string[]>([]);
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
  useEffect(() => {
    axios.get("http://localhost:8080/branches")
      .then(response => {
        setBranchLocations(response.data.map((branch: { name: string }) => branch.name));
      })
      .catch(error => {
        console.error("Error fetching branch locations:", error);
      });
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
      setEditableReservation(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
    

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setEditableReservation({
        ...editableReservation,
        Additionalservices: {
          ...editableReservation.Additionalservices,
          [name]: checked,
        },
      });
    };
  
    const handleUpdate = () => {
      const updatedFields = {
        userId: editableReservation.userId,
        carId: editableReservation.carId,
        reservationDate: editableReservation.reservationDate,
        returnDate: editableReservation.returnDate,
        location: editableReservation.location,
        returnLocation: editableReservation.returnLocation, 
        Additionalservices: editableReservation.Additionalservices, 
      };
    
      updateReservation(editableReservation._id, updatedFields);
    };

    useEffect(() => {
      setEditableReservation(reservation);
    }, [reservation]); 
  
    return (
      <tr>
        <td className="fieldInputs"><input type="text" name="userId" value={editableReservation.userId} onChange={handleInputChange} readOnly /></td>
        <td className="fieldInputs"><input type="text" name="carId" value={editableReservation.carId} onChange={handleInputChange} readOnly /></td>
        <td className="fieldInputs"><input type="text" name="reservationDate" value={editableReservation.reservationDate} onChange={handleInputChange} /></td>
        <td className="fieldInputs"><input type="text" name="returnDate" value={editableReservation.returnDate} onChange={handleInputChange} /></td>
        <td className="fieldInputs">
    <select
      name="location"
      value={editableReservation.location}
      onChange={handleInputChange}
      className="outlined_fields"
      required
    >
      <option value="">Select Pickup Location</option>
      {branchLocations.map((location) => (
        <option key={location} value={location}>{location}</option>
      ))}
    </select>
  </td>
  <td className="fieldInputs">
    <select
      name="returnLocation"
      value={editableReservation.returnLocation}
      onChange={handleInputChange}
      className="outlined_fields"
      required
    >
      <option value="">Select Return Location</option>
      {branchLocations.map((location) => (
        <option key={location} value={location}>{location}</option>
      ))}
    </select>
  </td>
  <td>
    <div className="checkbox-container"></div>
        </td>
        <td>
          <div className="checkbox-container">
          <input type="checkbox" name="Insurance" checked={editableReservation.Additionalservices && editableReservation.Additionalservices.Insurance} onChange={handleCheckboxChange} />
          <label>Insurance</label><br />
          <input type="checkbox" name="GPS" checked={editableReservation.Additionalservices && editableReservation.Additionalservices.GPS} onChange={handleCheckboxChange} />
          <label>GPS</label><br />
          <input type="checkbox" name="EntertainmentSystems" checked={editableReservation.Additionalservices && editableReservation.Additionalservices.EntertainmentSystems} onChange={handleCheckboxChange} />
          <label>Entertainment Systems</label><br />
          <input type="checkbox" name="MobilePhones" checked={editableReservation.Additionalservices && editableReservation.Additionalservices.MobilePhones} onChange={handleCheckboxChange} />
          <label>Mobile Phones</label><br />
          <input type="checkbox" name="PortableWiFi" checked={editableReservation.Additionalservices && editableReservation.Additionalservices.PortableWiFi} onChange={handleCheckboxChange} />
          <label>Portable WiFi</label><br />
          <input type="checkbox" name="ChildSafetySeats" checked={editableReservation.Additionalservices && editableReservation.Additionalservices.ChildSafetySeats} onChange={handleCheckboxChange} />
          <label>Child Safety Seats</label>
        </div>
      </td>
      <td>
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
            <th>Pickup Date</th>
            <th>Return Date</th>
            <th>Pickup location</th>
            <th>Return location</th>
            <th>Additional services</th>
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
