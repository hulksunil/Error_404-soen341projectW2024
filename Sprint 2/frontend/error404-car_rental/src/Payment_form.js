import React, { useEffect } from "react";
import "./styles/create_a_reservation&payment.css";
import { useLocation } from 'react-router-dom';
import {EmailConfirmation} from './EmailConfirmation.ts';
import EmailTemplate from "./EmailTemplate.tsx";
import ReactDOMServer from 'react-dom/server';

const getCurrentMonthYear = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${year}-${month}`;
};

const CarRentalPayment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const amount = searchParams.get('amount') || 0; 

  useEffect(()=>{
    const componentHTML = ReactDOMServer.renderToString(<EmailTemplate reservationInfo = {EmailConfirmation.emailProps}/>);
  },[])

  return (
    <div className="background_payment">
      <h1>Payment Information</h1>
      <form action="/transactionapproved">
        <table className="tab_payment reservationTable">
          <tr>
            <th>Amount:</th>
            <td>
              <input
                type="number"
                min="0"
                step="0.01"
                className="outlined_fields"
                required
                value={amount}
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>Cardholder Name:</th>
            <td>
              <input type="text" className="outlined_fields" required />
            </td>
          </tr>
          <br />
          <tr>
            <th>Card number:</th>
            <td>
              <input
                type="text"
                maxLength="12"
                className="outlined_fields"
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>Expiry Date:</th>
            <td>
              <input
                type="month"
                min={getCurrentMonthYear()}
                placeholder="MM/YY"
                className="outlined_fields"
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>CVV:</th>
            <td>
              <input
                type="text"
                maxLength="3"
                className="outlined_fields"
                placeholder="555"
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>Billing Address:</th>
            <td>
              <input type="text" className="outlined_fields" required />
            </td>
          </tr>
        </table>
        <br />
        <div>
          <input type="submit" value="Make Payment" className="submit" />
          <input type="reset" value="Reset" className="reset" />
        </div>
      </form>
    </div>
  );
};

export default CarRentalPayment;
