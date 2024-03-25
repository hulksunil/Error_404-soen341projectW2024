import React, { useEffect, useState } from "react";
import "./styles/CreateUser.css";
import axios from "axios";
// @ts-ignore
import { ReactComponent as UserSilhouette } from "./svgs/userSilhouette.svg";
// @ts-ignore
import { ReactComponent as CloseModal } from "./svgs/close-square.svg";
import {storeCookies} from './CookieManager.ts';

export default function CreateVehicle(props){
    const[model, setModel]= useState("");
    type branch = {
        _id: string,
        long: string,
        lat: string,
        name: string,
        distance: number
    }
    const[type,setType] = useState("");
    const[transmission, setTransmission]=useState("");
    const[numberOfSeats, setNumberOfSeats]=useState("");
    const[fuelType, setFuelType]=useState("");
    const[url, setUrl]=useState("");
    const[rentalPrice, setRentalPrice]=useState("");
    const[hasBluetooth, setHasBluetooth]=useState("Yes");
    const[drivetrain, setDrivetrain]= useState("Rear-wheel drive");
    const[year,setYear]=useState("");
    const[licensePlate, setLicensePlate]=useState("");
    const[color, setColor]=useState("");
    const[branchId, setBranchId]=useState("65fb731318f6999f70da4432");
    const [allBranches, setAllBranches] = useState<branch[]>([]);
  

    const[errorVisibility, setErrorVisibility]= useState({
        numberOfSeats: false,
        year: false,
    });
    
    // regex for model want characters from a-z only
    // drop down for fuel type, either electric, hybrid or gas
    // check boxes for hasBluetooth, either yes or no
    // dropdown for drivetrain, either manual or automatic 
    const maxYear=2024;
    const maxNumberOfSeats=9;

    useEffect(() => {
        //Gets all the branches to display in the drop down
        axios
          .get("http://localhost:8080/branches")
          .then((res) => {
            if (res.status === 200) {
              setAllBranches(res.data);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, []); 
    


    function checkSubmit() {

        let yearCompare = parseInt(year);
        
        setErrorVisibility((errorVisibility) => ({
            ...errorVisibility,
            year: yearCompare > maxYear,
        }));

        let numberOfSeatsCompare = parseInt(numberOfSeats);
        
        setErrorVisibility((errorVisibility) => ({
            ...errorVisibility,
            numberOfSeats: numberOfSeatsCompare > maxNumberOfSeats,
        }));

        if(!errorVisibility.year && !errorVisibility.numberOfSeats){
            submit();
        }
    }
    function submit(){
        const vehicleData={
            model : model,
            type : type,
            transmission: transmission,
            numberOfSeats : numberOfSeats,
            fuelType : fuelType,
            url: url,
            rentalPrice: rentalPrice,
            hasBluetooth: hasBluetooth,
            drivetrain: drivetrain,
            year : year,
            licensePlate : licensePlate,
            color : color,
            branchId: branchId, 
        };

        let status: number = 0;
        
        console.log(vehicleData);

        axios
        .post("http://localhost:8080/createVehicle", vehicleData)
        .then((res) => {
            status=res.status;

            // if(status == 200){
            //     setErrorVisibility((errorVisibility) => ({
            //         ...errorVisibility,
            //         status: true,
            //     }))
            // }

            props.toggleModal();
            window.location.reload();
        });

    }
    return(
        <div className="createVehicle">
            <div className="mainContent"> 
            <table>
                <tbody>
                    <tr>
                        <td className="fieldLabels">Model</td>
                        <td className="fieldInputs">
                            <input
                            type="text"
                            placeholder="Model"
                            required
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setModel(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">Type</td>
                        <td className="fieldInputs">
                            <input
                            type="text"
                            placeholder="Type"
                            required
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setType(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">Transmission</td>
                        <td className="fieldInputs">
                            <input
                            type="text"
                            placeholder="Transmission"
                            required
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setTransmission(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">Number Of Seats</td>
                        <td className="fieldInputs">
                            <input
                            type="text"
                            placeholder="Number Of Seats"
                            required
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setNumberOfSeats(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">Fuel Type</td>
                        <td className="fieldInputs">
                            <input
                            type="text"
                            placeholder="Fuel Type"
                            required
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setFuelType(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">URL</td>
                        <td className="fieldInputs">
                            <input
                            type="text"
                            placeholder="URL"
                            required
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setUrl(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">Rental Price</td>
                        <td className="fieldInputs">
                            <input
                            type="text"
                            placeholder="Rental Price"
                            required
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setRentalPrice(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">Bluetooth</td>
                        <td className="fieldInputs">
                        <select onChange={(e) => setHasBluetooth(e.target.value)}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">Drivetrain</td>
                        <td className="fieldInputs">
                        <select onChange={(e) => setDrivetrain(e.target.value)}>
                            <option value="Rear-wheel drive">Rear-wheel drive</option>
                            <option value="Front-wheel drive">Front-wheel drive</option>
                            <option value="4-wheel drive">4-wheel drive</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">Year</td>
                        <td className="fieldInputs">
                            <input
                            type="text"
                            placeholder="Year"
                            required
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setYear(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">License Plate</td>
                        <td className="fieldInputs">
                            <input
                            type="text"
                            placeholder="License Plate Number"
                            required
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setLicensePlate(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">Color</td>
                        <td className="fieldInputs">
                            <input
                            type="text"
                            placeholder="Color"
                            required
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setColor(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fieldLabels">Branch ID</td>
                        <td className="fieldInputs">
                            <select className="branchDropDown" 
                            onChange={(e) => setBranchId(e.target.value)}>
                                 {allBranches.map(branch =>
                            <option key={branch._id} value={branch._id}>{branch.name}</option>
                                 )}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="submitButton" onClick={checkSubmit}>
            Submit
          </button>
            </div>
        </div>
    )
}

