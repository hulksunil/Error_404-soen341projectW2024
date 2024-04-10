import React, { useState, useEffect } from 'react';
import "./styles/agreement.css"
import Navbar from "./components/Navbar/navbar.jsx";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CheckInForm() {

    const history = useNavigate();
    const [reservationId, setReservationId] = useState<string>('');
    const [license, setLicense] = useState<string>('');
    const [cardholder, setCardholder] = useState<string>('');
    const [allReservationIds, setAllReservationIds] = useState<string[]>([]);

    useEffect(() => {
        // Fetch resId from the database
        axios.get("http://localhost:8080/reservations")
            .then(response => {
                // Extract reservation IDs from the response data
                const ids = response.data.map(reservation => reservation._id);
                setAllReservationIds(ids);
            })
            .catch(error => {
                console.error("Error fetching reservation IDs:", error);
            });
    }, []);

    const handleReset = () => {
        setReservationId('');
        setLicense('');
        setCardholder('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reservationId.length !== 24) {
            alert("The reservation ID should contain 24 characters. Please make sure to provide exactly 24 characters.");
            return;
        }
        if (allReservationIds.includes(reservationId)) {
            // Redirect to the agreement page with reservation ID in the path
            history(`/car_rental_agreement/${reservationId}`);
        } else {
            alert("This reservation ID is not valid, please try again");
        }
    };
    return (
        <>
        <Navbar/>
        <div className='ch_body'>
            <h1>Check-in</h1>
            <form onSubmit={handleSubmit}>
                <table className='reservation_checkin'>
                    <tbody>
                        <tr>
                            <th>Reservation ID:</th>
                            <td>
                                <input
                                    type="text"
                                    name="reservation_id"
                                    value={reservationId}
                                    onChange={(e) => setReservationId(e.target.value)}
                                    className='required_field'
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>License #:</th>
                            <td>
                                <input
                                    type="text"
                                    name="license"
                                    value={license}
                                    onChange={(e) => setLicense(e.target.value)}
                                    className='required_field'
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Cardholder number:</th>
                            <td>
                                <input
                                    type="text"
                                    name="cardholder"
                                    value={cardholder}
                                    onChange={(e) => setCardholder(e.target.value)}
                                    maxLength={12}
                                    className='required_field'
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <input type="submit" value="Check-in" className='agreed'/>
                    <input type="reset" value="Reset" onClick={handleReset} className='not_agreed' />
                </div>
            </form>
        </div>   
        </>
    );
}

export default CheckInForm;
