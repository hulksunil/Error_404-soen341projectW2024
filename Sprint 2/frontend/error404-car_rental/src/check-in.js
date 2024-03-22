import React, { useState } from 'react';
import "./styles/agreement.css"
import Navbar from "./components/Navbar/navbar.jsx";

function CheckInForm() {
    const [reservationId, setReservationId] = useState('');
    const [license, setLicense] = useState('');
    const [cardholder, setCardholder] = useState('');

    const handleReset = () => {
        setReservationId('');
        setLicense('');
        setCardholder('');
    };

    return (
        <>
        <Navbar/>
        <div className='ch_body'>
            <h1>Check-in</h1>
            <form action='/car_rentral_agreement'>
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
                                    maxLength="12"
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
