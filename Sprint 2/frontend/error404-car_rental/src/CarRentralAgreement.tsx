import React, { useState,useEffect} from 'react';
import "./styles/agreement.css"
import Navbar from "./components/Navbar/navbar.jsx";
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { getCookie } from "./CookieManager.ts";

interface RentalPeriod {
    days: number;
    hours: number;
    minutes: number;
}

interface ReservationData {
    userId: string;
    carId: string;
    location: string;
    returnLocation: string;
    reservationDate: string;
    returnDate: string;
    Additionalservices: {
        [serviceName: string]: boolean;
    };
}

interface UserData {
    firstName: string;
    lastName: string;
    address: string;
    contactNum: string;
    email: string;
    licenseNum: string;
}

interface CarData {
    model: string;
    type: string;
    year: number;
    licensePlate: string;
    color: string;
    rentalPrice: number;
}

function RentalAgreement() {

    const { reservationId } = useParams<{ reservationId: string }>();

    const getTodayDate = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      return `${dd}-${mm}-${yyyy}`;
    };

    const history = useNavigate();
    const [currentDate, setCurrentDate] = useState<string>(getTodayDate());
    const [signature, setSignature] = useState<string>('');
    const [reservationData, setReservationData] = useState<ReservationData | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [carData, setCarData] = useState<CarData | null>(null);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({
        days: 0,
        hours: 0,
        minutes: 0
    });
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);


    useEffect(() => {

        const current_userId = getCookie('userid');
        if (current_userId) {
            axios.post(`http://localhost:8080/users/${current_userId}`)
                .then(userResponse => {
                    setCurrentUser(userResponse.data);
                    setUserData(userResponse.data); // Set user data state
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
          }

        axios.get(`http://localhost:8080/reservations/${reservationId}`)
            .then(response => {
                const reservationData = response.data;
                const userId = reservationData.userId;
                const carId = reservationData.carId;

                axios.post(`http://localhost:8080/users/${userId}`)
                    .then(userResponse => {
                        setUserData(userResponse.data); // Set user data state
                    })
                    .catch(error => {
                        console.error("Error fetching user data:", error);
                    });
                
                // Fetch car data based on carId
                axios.get(`http://localhost:8080/vehicles/${carId}`)
                    .then(carResponse => {
                        setCarData(carResponse.data); // Set car data state
                    })
                    .catch(error => {
                        console.error("Error fetching car data:", error);
                    });

                // Set reservation data state
                setReservationData(reservationData);
                calculateRentalPeriod(reservationData.reservationDate, reservationData.returnDate);
            })
            .catch(error => {
                console.error("Error fetching reservation data:", error);
            });
    }, [reservationId]);

    const calculateRentalPeriod = (pickupDate, returnDate) => {
        const pickupTime = new Date(pickupDate).getTime();
        const returnTime = new Date(returnDate).getTime();
        const diffTime = returnTime - pickupTime;
    
        // Convert time difference to days, hours, and minutes
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
        setRentalPeriod({
            days: diffDays,
            hours: diffHours,
            minutes: diffMinutes
        });
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        return `${formattedDate} at ${formattedTime}`;
    };
    
    const username = userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...';
    const fullname = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Loading...';


    const handleSubmit = (event) => {
        event.preventDefault();
        if (signature === username) {
            history(`/approved_check-in/${reservationData?.carId}`);
        }
        else {

            alert("Signature does not match username. Please try again.");
        }
    };

    return (
        <>
        <Navbar/>
            <div className='body'>
                <h1>Car rental agreement</h1>
                <div className="box">
                    <p>
                        Rental Agreement Number: {reservationData ? reservationData.userId : 'loading...'} <br /><br />
                        This Rental Agreement ("Agreement") is entered into between {fullname}, located at {reservationData ? reservationData.location : 'loading...'} , hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":
                    </p>
                    <ol type="1">
                    {userData && (
                        <>
                        <li className="li">Renter's Information:</li>
                          <p>
                              Name: {username}<br />
                              Address: {userData.address}<br />
                              Contact Number: {userData.contactNum}<br />
                              Email Address: {userData.email} <br />
                              Driver's License Number: {userData.licenseNum} <br />
                          </p>
                        </>
                        )}
                        {carData && (
                          <>
                            <li className="li">Vehicle Information:</li>
                            <p>
                                Make: {carData.model}  <br />
                                Model: {carData.type} <br />
                                Year: {carData.year} <br />
                                License Plate Number: {carData.licensePlate} <br />
                                Vehicle Identification Number (VIN): {reservationData?.carId}<br />
                                Color: {carData.color} <br />
                            </p>
                          </>
                        )}
                        {reservationData && (
                          <>
                            <li className="li">Rental Details:</li>
                            <p>
                                Rental Start Date and Time: {formatDateTime(reservationData.reservationDate)} <br />
                                Rental End Date and Time: {formatDateTime(reservationData.returnDate)} <br />
                                Pick-up Location: {reservationData.location} <br />
                                Drop-off Location: {reservationData.returnLocation} <br />
                                Rental Period: {rentalPeriod.days} days, {rentalPeriod.hours} hours, {rentalPeriod.minutes} minutes <br />
                                Mileage Limit (if applicable): none  <br />
                                Rental Rate: ${carData ? carData.rentalPrice:'loading...'}/day <br />
                                Additional Services (if any): 
                                    {Object.values(reservationData.Additionalservices).some(service => service) ? (
                                <ul>
                                    {Object.entries(reservationData.Additionalservices).map(([serviceName, isAvailable]) => (
                                    isAvailable && (
                                        <li key={serviceName}>{serviceName}</li>
                                    )
                                    ))}
                                </ul>
                                ) : (
                                <p>None</p>
                                )}
                            </p>
                          </>
                        )}
                        <li className="li">Rental Terms and Conditions:</li>
                            <ul style={{ listStyleType: 'disc' }}>
                                <p>
                                    <li>The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.</li>
                                    <li>The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.</li>
                                    <li>The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.</li>
                                    <li>The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.</li>
                                    <li>The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.</li>
                                    <li>The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.</li>
                                    <li>The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.</li>
                                    <li>The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.</li>
                                </p>
                            </ul>
                        <li className="li">Indemnification:</li>
                            <p>The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.</p>
                        <li className="li">Governing Law:</li>
                            <p>This Agreement shall be governed by and construed in accordance with the laws of {reservationData ? reservationData.location : 'loading...'}. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of {reservationData ? reservationData.location : 'loading...'}.</p>
                        <li className="li">Entire Agreement:</li>
                            <p>This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.</p>
                        <li className="li">Signatures</li>
                            <p>The parties hereto have executed this Agreement as of the date first written above.<br /><br />
                             <form onSubmit={handleSubmit}>
                                <b>Rental Company:</b> <br /><br />
                                Print Name: CARS R US <br /><br />
                                <label htmlFor="signature">Signature: </label>
                                <input type="text" name="signature" id="signature" value="CARS R US" readOnly className='required_field' required />
                                &nbsp;&nbsp;
                                <label htmlFor='compagny_date'>Date: </label>
                                <input type="text" name="compagny_date" id="compagny_date" value={currentDate} readOnly className='required_field' /> <br /><br />
                                <b>Renter:</b><br /><br />
                                Print Name: {username} <br /><br />
                                <div>
                                    <label htmlFor="signature">Signature: </label>
                                    <input type="text" name="signature" id="signature" className='required_field' required onChange={(event) => setSignature(event.target.value)} />
                                    &nbsp;&nbsp;
                                    <label htmlFor="date">Date: </label>
                                    <input type="text" name="date" id="date" value={currentDate} readOnly className='required_field' />
                                </div>
                                <br />
                                <div>
                                    <input type="submit" value="submit" className='approve'/>
                                </div>
                            </form>
                        </p>
                    </ol>
                </div>
            </div>
        </>
    );
}

export default RentalAgreement;

