import React, { useEffect, useState } from "react";
import "./styles/ViewReservation.css";
// @ts-ignore
import { ReactComponent as Delete } from "./svgs/delete.svg";
// @ts-ignore
import { ReactComponent as Modify } from "./svgs/edit.svg";
import axios from "axios";
import { getCookie } from './CookieManager.ts';
import Navbar from "./components/Navbar/navbar";
import { set } from "mongoose";

export default function ViewReservation() {
  type reservation = {
    location: string,
    reservationDate: string,
    returnDate: string,
    __v: string,
    _id: string
}
  const [reservations, setReservations] = useState<reservation[]>([])
  const [isEmpty,setIsEmpty]= useState(false);


  function pageTitle() {
    return <title>View Reservations</title>;
  }

  function Reservation({ res }) {

    return (
      <div className="reservationContainer">
        <img className="carImage" />
        <div className="actionbar">
          <button className="viewLabel" onClick={() => viewReservationOnClick(res._id)}>View</button>
          <Modify className="editSVG" onClick={() => modifyReservationOnClick(res._id)} />
          <Delete fill="red" className="deleteSVG" onClick={() => deleteReservationOnClick(res._id)} />
        </div>
      </div>
    )
  }

  function deleteReservationOnClick(reservationID: String) {
    console.log("would be deleted")
    // axios
    //   .delete("http://localhost:8080/reservations/"+reservationID)
    //   .then((res) => {
    //     location.reload();
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

  function viewReservationOnClick(reservationID: String) {

  }

  function modifyReservationOnClick(reservationID: String) {

  }

  function loadAllReservations() {
    const userId = getCookie("userid");
    
    axios.post("http://localhost:8080/users/" + userId).then((res) => {
      const user = res.data;
      setReservations(user.reservations);
      setIsEmpty(user.reservations.length === 0);
      console.log(res.data);
    }).catch((error) => {
      console.error("Error:", error);
    });
  

    //.get("http://localhost:8080/reservations/"+userId)
    // axios
    //   .get("http://localhost:8080/reservations")
    //   .then((res) => {
    //     setReservations(res.data)
    //     setIsEmpty(res.data.length === 0)
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

  useEffect(() => {
    loadAllReservations();
  }, [])

  return (
    <div className="viewReservationContainer">
      <Navbar/>
      {pageTitle()}
      <h1>Current Reservations</h1>

      {isEmpty?
      <>
      <h3>No reservations found</h3>
      </>
      :
      <>
      {reservations.map(reservation =>
        <Reservation key={reservation._id} res={reservation} />
      )}
      </>
      }

      <h1>Past Reservations</h1>
      {isEmpty?
      <>
      <h3>No reservations found</h3>
      </>
      :
      <>
      {reservations.map(reservation =>
        <Reservation key={reservation._id} res={reservation} />
      )}
      </>
      }
    </div>
  );
}
