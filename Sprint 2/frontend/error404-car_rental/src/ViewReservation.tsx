import React, { useEffect, useState } from "react";
import "./styles/ViewReservation.css";
// @ts-ignore
import { ReactComponent as Delete } from "./svgs/delete.svg";
// @ts-ignore
import { ReactComponent as Modify } from "./svgs/edit.svg";
import axios from "axios";
import { getCookie } from './CookieManager.ts';
import Navbar from "./components/Navbar/navbar";



export default function ViewReservation() {
  type reservation = {
    _id: string
    location: string,
    carId:string, 
    reservationDate: string,
    returnDate: string,
    returnLocation:string,
    Additionalservices: {
      Insurance: boolean;
      GPS: boolean;
      EntertainmentSystems: boolean;
      MobilePhones: boolean;
      PortableWiFi: boolean;
      ChildSafetySeats: boolean;
    };
}
  const [reservations, setReservations] = useState<string[]>([])
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [selectedReservation, setSelectedReservation] = useState<reservation >();

  function handleSubmit(event: React.FormEvent, updatedReservationInfo: reservation) {
    event.preventDefault();
    axios.put(`http://localhost:8080/UpdateReservation/${updatedReservationInfo._id}`, updatedReservationInfo)
        .then((res) => {
            if (res.status === 200) {
                console.log("Reservation updated successfully:", res.data);
                // Optionally, you can perform additional actions after successful update
            }
        })
        .catch((error) => {
            console.error("Error updating reservation:", error);
            // Optionally, handle errors or display an error message to the user
        });
}

  function pageTitle() {
    return <title>View Reservations</title>;
  }

  function Reservation({ resId }) {
    
    return (
      <div className="reservationContainer">
        <img className="carImage" alt="the car in the reservation" />
        <div className="actionbar">
          <button className="viewLabel" onClick={() => viewReservationOnClick(resId)}>View</button>
          {/* <Modify className="editSVG" onClick={() => modifyReservationOnClick(resId)} /> */}
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
        console.log(res.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }



  function viewReservationOnClick(resId: String) {
    let reservation: reservation={"location":"","carId":"", "reservationDate":"", "returnDate":"", "_id":"","returnLocation":"","Additionalservices":{
      Insurance: false,
      GPS: false,
      EntertainmentSystems: false,
      MobilePhones: false,
      PortableWiFi: false,
      ChildSafetySeats: false
  }
};
    axios
      .get("http://localhost:8080/reservations/" + resId)
      .then((res) => {
        reservation = {"location":res.data.location, "reservationDate":res.data.reservationDate, "carId":res.data.carId, "returnDate":res.data.returnDate,"_id":res.data._id,"returnLocation":res.data.returnLocation,"Additionalservices":res.data.Additionalservices};
        console.log(reservation);
        setSelectedReservation(reservation);
      });
    
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
      <h1>Your Reservations</h1>

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

      {
        selectedReservation ?
          <Form formData={selectedReservation} />
        :
          <>
          </>
      }

   
    </div>
  );

  // function getCarImage() {
  //   axios.get("http://localhost:8080/vehicles/" + selectedReservation.carId).then((res) => {
  //     return res.data.image;
  //   });
  // }

  function Form({ formData }: { formData: reservation }) {
    const [updatedReservationInfo, setUpdatedReservationInfo] = useState<reservation>(formData);
    console.log(updatedReservationInfo);

    let reservationDate = formData.reservationDate.substring(0, 10);
    let returnDate = formData.returnDate.substring(0, 10);

    // let imageUrl = getCarImage();
    // console.log(imageUrl)

    
    const handleCheckboxChange = (serviceName: keyof reservation['Additionalservices'], checked: boolean) => {
      setUpdatedReservationInfo(prevData => ({
      ...prevData,
      Additionalservices: {
        ...prevData.Additionalservices,
        [serviceName]: checked
        }
      }));
    };

    return (
      <form className="formToUpdate" onSubmit={(e)=>handleSubmit(e,updatedReservationInfo)}>
        <table className="tableToUpdate">
          <tbody>
            {/* Input fields */}
            <tr>
              <th>Reservation ID:</th>
              <td>
                <label>{formData?._id}</label>
              </td>
            </tr>
                  <tr>
              <th>Pickup Date:</th>
              <td>
                <input
                  type="date"
                  name="reservationDate"
                  defaultValue={reservationDate}
                  onChange={(e) => updatedReservationInfo.reservationDate=e.target.value}
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
                  min={reservationDate}
                  defaultValue={returnDate}
                  onChange={(e) => updatedReservationInfo.returnDate=e.target.value}
                  className="outlined_fields"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>Pickup Location:</th>
              <td>
                <input
                  type="text"
                  name="location"
                  defaultValue={formData.location}
                  onChange={(e) => updatedReservationInfo.location=e.target.value}
                  className="outlined_fields"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>Return location:</th>
              <td>
                <input
                  type="text"
                  name="returnLocation"
                  defaultValue={formData.returnLocation}
                  onChange={(e) => updatedReservationInfo.returnLocation=e.target.value}
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
                id="Insurance"
                name="Insurance"
                checked={updatedReservationInfo?.Additionalservices?.Insurance}
                onChange={(e) => handleCheckboxChange("Insurance", e.target.checked)}
                />
                <label htmlFor="Insurance"> Insurance</label>
                <br />
                
                <input
                type="checkbox"
                id="GPS"
                name="GPS"
                checked={updatedReservationInfo?.Additionalservices?.GPS}
                onChange={(e) => handleCheckboxChange("GPS", e.target.checked)}
                />
                <label htmlFor="GPS"> GPS </label>
                <br />
                <input
                type="checkbox"
                id="EntertainmentSystems"
                name="EntertainmentSystems"
                checked={updatedReservationInfo?.Additionalservices?.EntertainmentSystems}
                onChange={(e) => handleCheckboxChange("EntertainmentSystems", e.target.checked)}
                />
                <label htmlFor="EntertainmentSystems"> Entertainment Systems </label>
                <br />
                <input
                type="checkbox"
                id="MobilePhones"
                name="MobilePhones"
                checked={updatedReservationInfo?.Additionalservices?.MobilePhones}
                onChange={(e) => handleCheckboxChange("MobilePhones", e.target.checked)}
                />
                <label htmlFor="PortableWiFi"> Mobile Phones </label>
                <br />
                <input
                type="checkbox"
                id="PortableWiFi"
                name="PortableWiFi"
                checked={updatedReservationInfo?.Additionalservices?.PortableWiFi}
                onChange={(e) => handleCheckboxChange("PortableWiFi", e.target.checked)}
                />  
                <label htmlFor="ChildSafetySeats"> Child Safety Seats </label>
                <br />
                <input
                type="checkbox"
                id="ChildSafetySeats"
                name="ChildSafetySeats"
                checked={updatedReservationInfo?.Additionalservices?.ChildSafetySeats}
                onChange={(e) => handleCheckboxChange("ChildSafetySeats", e.target.checked)}
                />
                <label htmlFor="PortableWiFi"> Portable WiFi</label>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div>
          <input type="submit" value="Update Reservation" className="submit" />
        </div>
      </form>
    );
  }
}