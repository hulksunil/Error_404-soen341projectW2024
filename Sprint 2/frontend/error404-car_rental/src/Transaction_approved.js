import React from 'react';
import './styles/create_a_reservation&payment.css';

const TransactionApproved = () => {
  return (
    <div className='background_confirm'>
      <h1>Transaction Approved</h1>
      <p>Your payment has been successfully processed. Thank you for your reservation!</p>
    </div>
  );
};

export default TransactionApproved;
