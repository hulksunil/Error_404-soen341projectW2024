import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/navbar';
import "./components/Navbar/navbar.css";
import "./styles/AdminPage.css";


interface Checkout {
  _id: string;
  reservationId: string;
  trait: string;
  action: string;
}

export default function ViewCheckouts() {
  const [checkouts, setCheckouts] = useState<Checkout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadAllCheckouts() {
    try {
      const response = await axios.get<Checkout[]>('http://localhost:8080/checkout');
      setCheckouts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching checkouts:', error);
      setLoading(false);
    }
  }
  async function deleteAllCheckouts() {
    try {
      await axios.delete('http://localhost:8080/deleteCheckouts');
      await loadAllCheckouts();
    } catch (error) {
      console.error('Error clearing checkouts:', error);
    }
  }
  async function fetchCheckouts() {
    try {
      const response = await axios.get<Checkout[]>('http://localhost:8080/checkout');
      setCheckouts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching checkouts:', error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCheckouts();
  }, []); 

  useEffect(() => {
    loadAllCheckouts();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <title>View Checkouts</title>
      <h1>View Checkouts</h1>
    
      <button onClick={deleteAllCheckouts}>Clear All Checkouts</button>
      <table className="checkoutTable">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Trait</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {checkouts.map((checkout, index) => (
            <tr key={index}>
              <td>{checkout.reservationId}</td>
              <td>{checkout.trait}</td>
              <td>{checkout.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
