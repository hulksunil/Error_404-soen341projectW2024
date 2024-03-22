import React from "react";

export default function EmailTemplate(props) {

    return (
        <>
            <h1>CarsRUs</h1>
            <p>
                Hi {props.name},
                <br />
                Thank you for booking with CarsRUs! Here is your booking information.
            </p>
            <br />Confirmation Number: {props.confirmation}
            <br />
            <br />Start Date: {props.startDate}
            <br />End Date: {props.endDate}
            <br />
            <br />Pick up Location: {props.pickup}
            <br />Drop off Location: { props.dropoff}
            <br />
            <br />Model: {props.model}
            <br />Year: {props.year}
            <br />Additional services: {props.additional}
            <br />
            <br />Deposit: 500$
            <br />Total cost: {props.total }
            <hr />
            <h2>Pick up instructions:</h2>
            <p>Upon arrival to {props.pickup}, enter the building and prepare to show the receptionist the conformation number. Once the receptionist serves you, they will lead you to the car and do a thorough inspection with you before handing the keys over.   This inspection includes photos of the car in its current condition, explaining any features required, and detailing emergency equipment for the car.</p>
            <h2>Drop off instructions:</h2>
            <p>Upon returning the vehicle to {props.dropoff} enter the building and prepare to show the receptionist the conformation number. Once the receptionist serves you, you can choose to do an inspection with them or you can drop off the keys and if there are damages, you will be charged and not receive the deposit back.</p>
        </>
    );
}