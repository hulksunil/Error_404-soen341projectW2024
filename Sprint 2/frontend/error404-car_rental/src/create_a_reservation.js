import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/create_a_reservation&payment.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./CookieManager.ts";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.jsx";

const userId = getCookie("userid");

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTomorrowDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
  const day = String(today.getDate() + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CarRentalReservation = () => {
  const [formData, setFormData] = useState({
    userId: userId,
    carId: "",
    reservationDate: getCurrentDate(),
    returnDate: getTomorrowDate(),
    location: "",
    returnLocation: "",
  });

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const carId = searchParams.get("carId");
    console.log("Car ID:", carId);
    setFormData({ ...formData, carId: carId });
  }, [location]);

  const history = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do Form Validation
    if (formData.returnDate <= formData.reservationDate) {
      alert("Return date cannot be before or the same as reservation date");
      return;
    }

    // create the reservation
    axios
      .post("http://localhost:8080/CreateReservation", formData)
      .then((res) => {
        console.log("Reservation created:", res.data);
        setFormData({
          reservationDate: getCurrentDate(),
          returnDate: getTomorrowDate(),
          location: "",
          returnLocation: "",
        });
        const reservationDate = new Date(formData.reservationDate);
const returnDate = new Date(formData.returnDate);
const differenceInTime = returnDate.getTime() - reservationDate.getTime();
const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

let finalAmount;

if (formData.carId.includes("667a")) {
  finalAmount = differenceInDays * 1100; 
} else if (formData.carId.includes("096e")) {
  finalAmount = differenceInDays * 50; 
} else if (formData.carId.includes("cc82")) {
  finalAmount = differenceInDays * 70; 
} else if (formData.carId.includes("fcee")) {
  finalAmount = differenceInDays * 95; 
} else if (formData.carId.includes("eb33")) {
  finalAmount = differenceInDays * 60; 
} else if (formData.carId.includes("ab4e")) {
  finalAmount = differenceInDays * 40;
} else {
  finalAmount = differenceInDays * 80;
}

history(`/payment?amount=${finalAmount}`);
     
      })
      .catch((error) => {
        console.error("Error creating reservation:", error);
      });
  };
 

  return (
    <>
      <Navbar />
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
                    max={formData.returnDate}
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
                    min={getTomorrowDate()}
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
            <input
              type="submit"
              value="Submit Reservation"
              className="submit"
            />
            <input
              type="reset"
              value="Reset"
              className="reset"
              
              onClick={() => {
                setFormData({
                  ...formData,
                  reservationDate: getCurrentDate(),
                  returnDate: getTomorrowDate(),
                  location: "",
                  returnLocation: "",
                }); 
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CarRentalReservation;
