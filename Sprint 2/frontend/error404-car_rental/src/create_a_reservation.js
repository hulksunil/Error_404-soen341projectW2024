import React from 'react';
import './styles/create_a_reservation&payment.css';

const CarRentalReservation = () => {
  return (
    <div className='background_reserve'>
      <h1 style={{ textAlign: 'center' }}>Car Rental Reservation</h1>
      <form action="/payment">
        <div>
          <label htmlFor="fname">First Name:</label><br />
          <input type="text" id="fname" name="fname" required />
        </div>
        <br />
        <div>
          <label htmlFor="lname">Last Name:</label><br />
          <input type="text" id="lname" name="lname" required />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" required />
        </div>
        <br />
        <div>
          <label htmlFor="phone">Phone Number:</label><br />
          <input type="tel" id="phone" name="phone" required />
        </div>
        <br />
        <div>
          <label htmlFor="Address">Address:</label><br />
          <input type="text" id="Address" name="Address" required />
        </div>
        <br />
        <div>
          <label htmlFor="driver_license">Driver's License Number:</label><br />
          <input type="text" id="driver_license" name="driver_license" maxLength={20} required />
        </div>
        <br />
        <div>
          <label htmlFor="dl_expiry_date">Driver's License Expiry Date:</label><br />
          <input type="date" id="dl_expiry_date" name="dl_expiry_date" required />
        </div>
        <br />
        <div>
          <label htmlFor="pickup_date">Pickup Date:</label><br />
          <input type="date" id="pickup_date" name="pickup_date" required />
        </div>
        <br />
        <div>
          <label htmlFor="pickup_location">Pickup location:</label><br />
          <input type="text" id="pickup_location" name="pickup_location" required />
        </div>
        <br />
        <div>
          <label htmlFor="return_date">Return Date:</label><br />
          <input type="date" id="return_date" name="return_date" required />
        </div>
        <br />
        <div>
          <label htmlFor="return_location">Return location:</label><br />
          <input type="text" id="return_location" name="return_location" required />
        </div>
        <br />
        <div>
          <label htmlFor="car_type">Car Type:</label><br />
          <select id="car_type" name="car_type" required>
            <option value="economy">Economy</option>
            <option value="compact">Compact</option>
            <option value="midsize">Mid-size</option>
            <option value="fullsize">Full-size</option>
            <option value="luxury">Luxury</option>
            <option value="convertible">Convertible</option>
            <option value="suv">SUV</option>
            <option value="minivan">Minivan</option>
            <option value="van">Van</option>
            <option value="pickup_truck">Pickup Truck</option>
            <option value="hybrid_electric">Hybrid/Electric</option>
            <option value="sports_car">Sports Car</option>
            <option value="exotic_car">Exotic Car</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="comments">Additional Comments:</label><br />
          <textarea id="comments" name="comments" rows="4" cols="50"></textarea>
        </div>
        <br />
        <div>
          <input type="submit" value="Submit Reservation" />
          <input type="reset" value="reset" />
        </div>
      </form>
    </div>
  );
};

export default CarRentalReservation;