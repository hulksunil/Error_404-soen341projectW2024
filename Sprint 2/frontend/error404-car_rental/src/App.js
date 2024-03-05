import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import CarRentalPayment from './Payment_form';
import CarRentalReservation from './create_a_reservation';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Routes>
        <Route path="/payment" component={CarRentalPayment} />
        <Route path="/reservation" component={CarRentalReservation} />
      </Routes>
    </Router>
  );
}

export default App;
