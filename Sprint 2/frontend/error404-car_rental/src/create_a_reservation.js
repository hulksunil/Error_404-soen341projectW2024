import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/create_a_reservation&payment.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./CookieManager.ts";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.jsx";
import {EmailConfirmation} from './EmailConfirmation.ts';

const userId = getCookie("userid");
const userName = getCookie("username");

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
    },
    branchLocations: []
  });
  const [allBranches, setAllBranches] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});


  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const carId = searchParams.get("carId");
    setFormData({ ...formData, carId: carId });

    //Gets all the branches to display in the drop down
    axios
      .get("http://localhost:8080/branches")
      .then((res) => {
        if (res.status === 200) {
          setAllBranches(res.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //Gets the vehicles data 
    axios
      .get("http://localhost:8080/vehicles/" + carId)
      .then((res) => {
        if (res.status === 200) {
          setVehicleInfo(res.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      //gets the users info like their email
      axios.post("http://localhost:8080/users/" + userId)
      .then((res) => {
        if (res.status === 200) {
          setUserInfo(res.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })

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

  function constructEmail(res_id, reservationDate, returnDate, finalAmount, additional,pickupLocation,returnLocation) {
    const regex = /[{}]/g;
    let additionalArray = JSON.stringify(additional).replace(regex,"").split(",");
    let filteredServices = additionalArray.filter(item => item.includes("true"));



    const props= {
      name: String(userName),
      confirmation:String(res_id),
      startDate:String(reservationDate),
      endDate:String(returnDate),
      pickup:String(pickupLocation),
      dropoff:String(returnLocation),
      model: String(vehicleInfo.model),
      year: String(vehicleInfo.year),
      additional:filteredServices,
      total:String(finalAmount),
      email:userInfo.email
    }

    EmailConfirmation.emailProps = props;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let reservation_id = "";

    // Do Form Validation
    if (formData.returnDate <= formData.reservationDate) {
      alert("Return date cannot be before or the same as reservation date");
      return;
    }

    if(formData.location.length == 0){
      formData.location = allBranches[0].name
    }

    if(formData.returnLocation.length == 0){
      formData.returnLocation = allBranches[0].name
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
        // console.log("Reservation created:", res.data);
        reservation_id = res.data._id;
        setFormData({
          reservationDate: "",
          returnDate: "",
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
        
        constructEmail(reservation_id, formData.reservationDate, formData.returnDate, finalAmount, formData.Additionalservices,formData.location,formData.returnLocation)
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
              { }
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
                  <select
                    className="branchDropDown"
                    onChange={(e) => {
                      formData.location = e.target.value;
                    }}
                  >
                    {allBranches.map(branch =>
                      <option key={branch._id} value={branch.name}>{branch.name}</option>
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <th> Return location:</th>
                <td>
                  <select
                    className="branchDropDown"
                    onChange={(e) => {
                      formData.returnLocation = e.target.value;
                    }}
                  >
                    {allBranches.map(branch =>
                      <option key={branch._id} value={branch.name}>{branch.name}</option>
                    )}
                  </select>
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
                  reservationDate: "",
                  returnDate: "",
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
