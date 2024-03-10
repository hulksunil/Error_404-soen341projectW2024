import React from "react";
import "./styles/create_a_reservation&payment.css";

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CarRentalReservation = () => {
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
            <th>First Name:</th>
          </tr>
          <br />
          <tr>
            <th>Last Name:</th>
          </tr>
          <br />
          <tr>
            <th>Email: </th>
          </tr>
          <br />
          <tr>
            <th>Phone number: </th>
          </tr>
          <br />
          <tr>
            <th>Address: </th>
          </tr>
          <br />
          <tr>
            <th>Driver's License Number: </th>
          </tr>
          <br />
          <tr>
            <th>Driver's License Expiry Date: </th>
          </tr>
          <br />
          <tr>
            <th>Pickup Date: </th>
            <td>
              <input
                type="date"
                min={getCurrentDate()}
                className="outlined_fields"
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>Return Date: </th>
            <td>
              <input
                type="date"
                min={getCurrentDate()}
                className="outlined_fields"
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>Pickup location: </th>
            <td>
              <input type="text" className="outlined_fields" required />
            </td>
          </tr>
          <br />
          <tr>
            <th>Return location: </th>
            <td>
              <input type="text" className="outlined_fields" required />
            </td>
          </tr>
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
