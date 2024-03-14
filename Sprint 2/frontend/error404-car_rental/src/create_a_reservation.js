import React, { useState, useEffect } from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import { getCookie } from "./CookieManager.ts"; 
import "./styles/create_a_reservation&payment.css";

const userID = getCookie("userid");

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CarRentalReservation = () => {
  const [formData, setFormData] = useState({
    userID: userID, 
    carID: "",
    pickupDate: "",
    returnDate: "",
    pickuplocation: "",
    returnlocation: "",
  });

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const carID = searchParams.get("carID");
    setFormData({ ...formData, carID: carID });
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/CreateReservation", formData);
      console.log("Reservation submitted successfully:", response.data);
      window.location.href = "/payment";
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
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
          <tr>
            <th>UserID:</th>
            <td>{formData.userID}</td>
          </tr>
          <br />
          <tr>
            <th>CarID:</th>
            <td>{formData.carID}</td>
          </tr>
          <br />
          <tr>
              <th>Pickup Date:</th>
              <td>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
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
              <th>Pickup Location:</th>
              <td>
                <input
                  type="text"
                  name="pickuplocation"
                  value={formData.pickuplocation}
                  onChange={handleChange}
                  className="outlined_fields"
                  required
                />
              </td>
            </tr>
            <br />
            <tr>
              <th>Return Location:</th>
              <td>
                <input
                  type="text"
                  name="returnlocation"
                  value={formData.returnlocation}
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
          <input type="reset" 
          value="Reset" 
          className="reset"   
          onClick={() => {
          setFormData({
          ...formData,
          pickupDate: "",
          returnDate: "",
          pickuplocation: "",
          returnlocation: ""
          });
        }} />
        </div>
      </form>
    </div>
  );
};

export default CarRentalReservation;
