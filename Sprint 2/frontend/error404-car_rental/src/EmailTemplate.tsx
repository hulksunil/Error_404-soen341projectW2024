import React from "react";

export default function EmailTemplate(props) {
    const reservationInfo = props.reservationInfo;
  

    return (
        <>
            <h1>CarsRUs</h1>
            <p>
                Hi {reservationInfo.name},
                <br />
                Thank you for booking with CarsRUs! Here is your booking information.
            </p>
            <br />Confirmation Number: {reservationInfo.confirmation}
            <br />
            <br />Start Date: {reservationInfo.startDate}
            <br />End Date: {reservationInfo.endDate}
            <br />
            <br />Pick up Location: {reservationInfo.pickup}
            <br />Drop off Location: { reservationInfo.dropoff}
            <br />
            <br />Model: {reservationInfo.model}
            <br />Year: {reservationInfo.year}
            <br />Additional services: {reservationInfo.additional}
            <br />
            <br />Deposit: 500$
            <br />Total cost: {reservationInfo.total }
            <hr />
            <h2>Pick up instructions:</h2>
            <p>Upon arrival to <b>{reservationInfo.pickup}</b>, enter the building and prepare to show the receptionist the conformation number. Once the receptionist serves you, they will lead you to the car and do a thorough inspection with you before handing the keys over.   This inspection includes photos of the car in its current condition, explaining any features required, and detailing emergency equipment for the car.</p>
            <h2>Drop off instructions:</h2>
            <p>Upon returning the vehicle to <b>{reservationInfo.dropoff}</b> enter the building and prepare to show the receptionist the conformation number. Once the receptionist serves you, you can choose to do an inspection with them or you can drop off the keys and if there are damages, you will be charged and not receive the deposit back.</p>
        </>
    );
}