import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/create_a_reservation&payment.css";

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CarRentalReservation = () => {
  const [formData, setFormData] = useState({
    userID:"",
    carID:"",
    ReservationDate: getCurrentDate(),
    returnDate: getCurrentDate(),
    location:"",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const sendReservationData = async () => {
      try {
        const response = await axios.post("/CreateReservation", formData);
        console.log("Reservation submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting reservation:", error);
      }
    };

    sendReservationData();
  }, [formData]);

  return (
    <div className="background_reserve">
      <h1>Car Rental Reservation</h1>
      <img
        className="reservationImage"
        src="https://robbreport.com/wp-content/uploads/2019/03/18c0771_007.jpg?w=1000"
        alt="car"
      ></img>
      <form action="/payment">
        <table className="reservationTable">
          <tr>
            <th>UserID:</th>
            <td>
            <input
                type="text"
                name="userID"
                value={formData.userID}
                onChange={handleChange}
                className="outlined_fields"
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th> CarID: </th>
            <td><input
                type="text"
                name="carID"
                value={formData.carID}
                onChange={handleChange}
                className="outlined_fields"
                required
              /></td>
          </tr>
          <br />
          <tr>
            <th>Reservation Date:</th>
            <td>
              <input
                type="date"
                name="ReservationDate"
                value={formData.ReservationDate}
                onChange={handleChange}
                className="outlined_fields"
                min={getCurrentDate()}
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>Return Date:</th>
            <td>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="outlined_fields"
                min={getCurrentDate()}
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>location:</th>
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
        </table>
        <br />
        <div>
          <input
            type="submit"
            value="Submit Reservation"
            className="submit"
          />
          <input type="reset" value="Reset" className="reset" />
        </div>
      </form>
    </div>
  );
};

export default CarRentalReservation;
