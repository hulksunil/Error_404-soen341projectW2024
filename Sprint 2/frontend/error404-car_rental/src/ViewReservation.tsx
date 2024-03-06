import React, { useEffect, useState } from "react";
import "./styles/ViewReservation.css";
import NavBar from './NavBar.tsx';
// @ts-ignore
import { ReactComponent as Delete } from "./svgs/delete.svg";
// @ts-ignore
import { ReactComponent as Modify } from "./svgs/edit.svg";
import axios from "axios";
import {getCookie} from './CookieManager.ts';

export default function ViewReservation() {

  const [reservations,setReservations]=useState([{
    carId: "",
    location: "",
    reservationDate: "",
    returnDate: "",
    userId: "",
    __v: 0,
    _id : "",
  }]); 

  function pageTitle() {
    return <title>This is the page title</title>;
  }

  function Reservation({res}) {
    return (
      <div className="reservationContainer">
        <img className="carImage" />
        <div className="actionbar">
          <button className="viewLabel">View</button> {/*onClick={viewReservationOnClick(res._id)} */}
          <Modify className="editSVG" onClick={modifyReservationOnClick(res._id)}/>
          <Delete fill="red" className="deleteSVG" onClick={deleteReservationOnClick(res._id)}/>
        </div>
      </div>
    )
  }

  function deleteReservationOnClick(reservationID: String) {

  }

  function viewReservationOnClick(reservationID: String) {

  }

  function modifyReservationOnClick(reservationID: String) {

  }

  function loadAllReservations(){
    const userId = getCookie("usreID");

    // /http://localhost:8080/reservations:id 

    axios
      .get("http://localhost:8080/reservations")
      .then((res) => {
        setReservations(res.data)
        console.log(reservations)
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }

  useEffect(() => {
    loadAllReservations();

  }, [])

  return (
    <div className="viewReservationContainer">
      <NavBar pageTitle={document.title} />
      {pageTitle()}
      <h1>Current Reservations</h1>
      {reservations.map(reservation =>
        <Reservation key={reservation._id} res = {reservation} />
      )}



      <h1>Past Reservations</h1>

      {reservations.map(reservation =>
        <Reservation key={reservation._id} res = {reservation} />
      )}


    </div>
  );
}
