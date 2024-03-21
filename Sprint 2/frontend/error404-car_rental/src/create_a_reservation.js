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

const CarRentalReservation = () => {
  const [formData, setFormData] = useState({
    userId: userId,
    carId: "",
    reservationDate: "",
    returnDate: "",
    location: "",
    returnLocation: "",
    Additionalservices: {
      Insurance: false,
      GPS: false,
      EntertainmentSystems: false,
      MobilePhones: false,
      PortableWiFi: false,
      ChildSafetySeats: false
    }
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
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        Additionalservices: {
          ...formData.Additionalservices,
          [name]: checked
        }
      });
    } else {
      if (name === "reservationDate") {
        const selectedDate = new Date(value);
        if (!isNaN(selectedDate.getTime())) {
          const nextDay = new Date(selectedDate);
          nextDay.setDate(selectedDate.getDate() + 1);
          const nextDayString = nextDay.toISOString().split('T')[0];
          setFormData({
            ...formData,
            [name]: value,
            returnDate: nextDayString
          });
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Do Form Validation
    if (formData.returnDate <= formData.reservationDate) {
      alert("Return date cannot be before or the same as reservation date");
      return;
    }
      
    // Create the reservation data
    const reservationData = {
      userId: formData.userId,
      carId: formData.carId,
      reservationDate: formData.reservationDate,
      returnDate: formData.returnDate,
      location: formData.location,
      returnLocation: formData.returnLocation,
      Additionalservices: formData.Additionalservices,
    };
  
    axios
      .post("http://localhost:8080/CreateReservation", reservationData)
      .then((res) => {
        console.log("Reservation created:", res.data);
        setFormData({
          reservationDate: "",
          returnDate: "",
          location: "",
          returnLocation: "",
          Additionalservices: {
            Insurance: false,
            GPS: false,
            EntertainmentSystems: false,
            MobilePhones: false,
            PortableWiFi: false,
            ChildSafetySeats: false
          }
        });
        history("/payment");
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
                <th>Pickup Date:</th>
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
                    min={formData.reservationDate ? formData.returnDate : getCurrentDate()}
                    className="outlined_fields"
                    required
                  />
                </td>
              </tr>
              <tr>
                <th> Pickup location:</th>
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
              <tr>
                <th> Return location:</th>
                <td>
                  <input
                    type="text"
                    name="returnLocation"
                    value={formData.returnLocation}
                    onChange={handleChange}
                    className="outlined_fields"
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>Additional services</th>
                <td>
                    <input
                      type="checkbox"
                      id="s1"
                      name="Insurance"
                      checked={formData.Additionalservices.Insurance}
                      onChange={handleChange}
                    /> 
                  <label htmlFor="s1">  Insurance </label>
                  <br />
                  
                    <input
                      type="checkbox"
                      id="s2"
                      name="GPS"
                      checked={formData.Additionalservices.GPS}
                      onChange={handleChange}
                    />
                  <label htmlFor="s2">GPS</label>
                  <br />
                    <input
                      type="checkbox"
                      id="s3"
                      name="EntertainmentSystems"
                      checked={formData.Additionalservices.EntertainmentSystems}
                      onChange={handleChange}
                    />
                  <label htmlFor="s3">Entertainment systems</label>
                  <br />
                  
                    <input
                      type="checkbox"
                      id="s4"
                      name="MobilePhones"
                      checked={formData.Additionalservices.MobilePhones}
                      onChange={handleChange}
                    />
                    <label htmlFor="s4">Mobile phones</label>
                  <br />
                    <input
                      type="checkbox"
                      id="s5"
                      name="PortableWiFi"
                      checked={formData.Additionalservices.PortableWiFi}
                      onChange={handleChange}
                    />
                  <label htmlFor="s5">Portable WiFi</label>
                  <br />
                    <input
                      type="checkbox"
                      id="s6"
                      name="ChildSafetySeats"
                      checked={formData.Additionalservices.ChildSafetySeats}
                      onChange={handleChange}
                    />
                  <label htmlFor="s6">Child safety seats</label>
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
                  reservationDate:"",
                  returnDate: "",
                  location: "",
                  returnLocation: "",
                  Additionalservices: {
                    Insurance: false,
                    GPS: false,
                    EntertainmentSystems: false,
                    MobilePhones: false,
                    PortableWiFi: false,
                    ChildSafetySeats: false
                  }
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
