import React from "react";
import "./ViewReservation.css";


export default function ViewReservation (){
    function pageTitle() {
        return <title>This is the page title</title>;
      }

    return(
        <div>
        {pageTitle()}
        <h1> This is for viewing reservations</h1>
      </div>
    )


}