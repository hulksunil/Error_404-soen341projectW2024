import React from 'react';
import "./styles/agreement.css"


function RentalAgreement() {

    const getTodayDate = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      return `${mm}-${dd}-${yyyy}`;
    };

    // Get today's date
    const currentDate = getTodayDate();

    return (
        <>
        <div className='body'>
                <h1>Car rental agreement</h1>
                <div className="box">
                    <p>
                        Rental Agreement Number:<br /><br />
                        This Rental Agreement ("Agreement") is entered into between [Car Rental Agency Name], located at [Address], hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":
                    </p>
                    <ol type="1">
                        <li className="li">Renter's Information:</li>
                        <p>
                            Name: <br />
                            Address:<br />
                            Contact Number:<br />
                            Email Address: <br />
                            Driver's License Number:  <br />
                        </p>
                        <li className="li">Vehicle Information:</li>
                        <p>
                            Make:  <br />
                            Model:  <br />
                            Year: <br />
                            License Plate Number: <br />
                            Vehicle Identification Number (VIN):<br />
                            Color: <br />
                        </p>
                        <li className="li">Rental Details:</li>
                        <p>
                            Rental Start Date: <br />
                            Rental End Date: <br />
                            Pick-up Location: <br />
                            Drop-off Location: <br />
                            Rental Period: <br />
                            Mileage Limit (if applicable): <br />
                            Rental Rate: <br />
                            Additional Services (if any): <br />
                            {/* insurance, global positioning system (GPS) navigation systems, entertainment systems, mobile phones, portable WiFi and child safety seats. */}
                        </p>
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
                            <p>This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].</p>
                        <li className="li">Entire Agreement:</li>
                            <p>This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.</p>
                        <li className="li">Signatures</li>
                            <p>The parties hereto have executed this Agreement as of the date first written above.<br /><br />
                             <form>
                                <b>Rental Company:</b> <br /><br />
                                Print Name: <br /><br />
                                Signature:  
                                <label htmlFor='compagny_date'>Date: </label>
                                <input type="date" name="compagny_date" id="compagny_date" value={currentDate} readOnly className='required_field' /> <br /><br />
                                <b>Renter:</b><br /><br />
                                Print Name: <br />
                                <div>
                                    <label htmlFor="signature">Signature: </label>
                                    <input type="text" name="signature" id="signature" className='required_field' required />
                                    <label htmlFor="date">Date: </label>
                                    <input type="date" name="date" id="date" value={currentDate} readOnly className='required_field' />
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
