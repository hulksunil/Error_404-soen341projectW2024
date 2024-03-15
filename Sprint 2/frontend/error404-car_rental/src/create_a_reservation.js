import React, { useState } from "react";
import axios from 'axios';
import "./styles/create_a_reservation&payment.css";
import { useNavigate } from 'react-router-dom';

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CarRentalReservation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    licenseNumber: "",
    licenseExpiryDate: "",
    
    reservationDate: getCurrentDate(),
    returnDate: getCurrentDate(),
    location: "",
    returnLocation: ""
  });
  const history = useNavigate(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/CreateReservation', formData)
      .then((res) => {
        console.log('Reservation created:', res.data);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
          licenseNumber: "",
          licenseExpiryDate: "",
        
          reservationDate: getCurrentDate(),
          returnDate: getCurrentDate(),
          location: "",
          returnLocation: ""
        });
        history('/payment');
      })
      .catch((error) => {
        console.error('Error creating reservation:', error);
      });
  };

  return (
    <div className="background_reserve">
      <h1>Car Rental Reservation</h1>
      <img
        className="reservationImage"
        src="https://robbreport.com/wp-content/uploads/2019/03/18c0771_007.jpg?w=1000"
        alt="car"
      ></img>
      <form onSubmit={handleSubmit}>
        <table className="reservationTable">
          <tbody>
            {}
            <tr>
              <th>Reservation Date:</th>
              <td>
                <input
                  type="date"
                  name="reservationDate"
                  value={formData.reservationDate}
                  onChange={handleChange}
                  min={getCurrentDate()}
                  className="outlined_fields"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>Return Date:</th>
              <td>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={getCurrentDate()}
                  className="outlined_fields"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>Location:</th>
              <td>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="outlined_fields"
                  required
                />
              </td>
            </tr>
            
              
          </tbody>
        </table>
        <br />
        <div>
          <input type="submit" value="Submit Reservation" className="submit" />
          <input type="reset" value="Reset" className="reset" />
        </div>
      </form>
    </div>
  );
};

export default CarRentalReservation;
