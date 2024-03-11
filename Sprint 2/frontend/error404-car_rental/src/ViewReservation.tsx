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
//   type reservation = {
//     location: string,
//     reservationDate: string,
//     returnDate: string,
//     __v: string,
//     _id: string
// }
  const [reservations, setReservations] = useState<string[]>([])
  const [isEmpty,setIsEmpty]= useState(false);


  function pageTitle() {
    return <title>View Reservations</title>;
  }

  function Reservation({ resId}) {

    return (
      <div className="reservationContainer">
        <img className="carImage" alt="the car in the reservation" />
        <div className="actionbar">
          <button className="viewLabel" onClick={() => viewReservationOnClick(resId)}>View</button>
          <Modify className="editSVG" onClick={() => modifyReservationOnClick(resId)} />
          <Delete fill="red" className="deleteSVG" onClick={() => deleteReservationOnClick(resId)} />
        </div>
      </div>
    )
  }

  function deleteReservationOnClick(resId: String) {
    console.log(resId+" would be deleted")
    axios
      .delete("http://localhost:8080/reservations/"+resId)
      .then((res) => {
        // location.reload();
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      {reservations.map(resId =>
        <Reservation key={resId} resId={resId} />
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
      {reservations.map(resId =>
        <Reservation key={resId} resId={resId} />
      )}
      </>
      }
    </div>
  );
}
