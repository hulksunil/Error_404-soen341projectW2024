import React from "react";
import Navbar from './components/Navbar/navbar';
import "./components/Navbar/navbar.css"

const TransactionApproved = () => {
  

  return React.createElement(
    "div",
    null,
    React.createElement(Navbar, null),
    React.createElement(
      "div",
      { className: "background_confirm" },
      React.createElement("h1", null, "Transaction Approved"),
      React.createElement(
        "p",
        null,
        "Your payment has been successfully processed. Thank you for your reservation! Make a new selection from the Nav Bar to exit"
      
      )
    )
  );
};

export default TransactionApproved;
