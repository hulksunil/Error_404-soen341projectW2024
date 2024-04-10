import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/navbar";
import "../components/Navbar/navbar.css"
import "../styles/ModifyUsers.css";
import CreateVehicle from "../CreateVehicle.tsx";



export default function ModifyVehicles(){
    type vehicle={
        model : string,
        type : string,
        transmission: string,
        numberOfSeats: string,
        fuelType: string,
        __v: string,
        _id: string,
        url: string,
        rentalPrice: string,
        hasBluetooth: string, 
        drivetrain: string,
        year : String,
        licensePlate : String,
        color : String,
        branchId : String,
    }

    const [allVehicles, setAllVehicles]= useState<vehicle[]>([]);
    const [createVehicleModal, setCreateVehicleModal] =useState(false);

    function pageTitle(){
        return <title>Modify Vehicles</title>
    }


    function deleteVehicle(vehicleInfo){
        axios
        .delete("http://localhost:8080/vehicles/"+ vehicleInfo._id)
        .then((res)=>{
            if(res.status == 200){

            }
        })
        .catch((error)=> {
            console.error('Error:', error);
        })
    }

    function handleSubmit(event: React.FormEvent, newVehicleInfo){

        console.log(newVehicleInfo);
        event.preventDefault();

        axios.post("http://localhost:8080/updateVehicle", newVehicleInfo)
            .then((res)=>{
                if(res.status===200){
                    console.log(res);
                    window.location.reload();
                }
            })
            .catch((error)=>{
                console.error("Error:",error);
            })
    }

    function VehicleRow({vehicleInfo}){
        let updatedVehicleInfo:vehicle=vehicleInfo;

        return (
            <>
                <tr>
                    <td className="hiddenForm"><form id={vehicleInfo._id} onSubmit={(e) => handleSubmit(e, updatedVehicleInfo)} /></td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={vehicleInfo.model} className="inputBoxes" form={vehicleInfo._id} name="model" onChange={(e) => updatedVehicleInfo.model = e.target.value} autoComplete="off"/>
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={vehicleInfo.type} className="inputBoxes" form={vehicleInfo._id} name="type" onChange={(e) => updatedVehicleInfo.type = e.target.value} autoComplete="off"/>
                    </td>
                    <td className="fieldInputs">
                    <select
                            className="fieldInputs"
                            onChange={(e) => {
                                updatedVehicleInfo.transmission = e.target.value;
                            }}
                            form={vehicleInfo._id}
                            defaultValue={vehicleInfo.transmission}>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={vehicleInfo.numberOfSeats} className="inputBoxes" form={vehicleInfo._id} name="numberOfSeats" onChange={(e) => updatedVehicleInfo.numberOfSeats = e.target.value} autoComplete="off"/>
                    </td>
                    <td className="fieldInputs">
                    <select
                            className="fieldInputs"
                            onChange={(e) => {
                                updatedVehicleInfo.fuelType = e.target.value;
                            }}
                            form={vehicleInfo._id}
                            defaultValue={vehicleInfo.fuelType}>
                            <option value="Gas">Gas</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={vehicleInfo.url} className="inputBoxes" form={vehicleInfo._id} name="url" onChange={(e) => updatedVehicleInfo.url = e.target.value} autoComplete="off"/>
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={vehicleInfo.rentalPrice} className="inputBoxes" form={vehicleInfo._id} name="rentalPrice" onChange={(e) => updatedVehicleInfo.rentalPrice = e.target.value} autoComplete="off"/>
                    </td>
                    <td className="fieldInputs">
                        <select
                            className="fieldInputs"
                            onChange={(e) => {
                                updatedVehicleInfo.drivetrain = e.target.value;
                            }}
                            form={vehicleInfo._id}
                            defaultValue={vehicleInfo.drivetrain}>
                            <option value="front-wheel drive">Front-wheel drive</option>
                            <option value="rear-wheel drive">Rear-wheel drive</option>
                            <option value="4-wheel drive">4-wheel drive</option>
                        </select>
                    </td>
                    <td className="fieldInputs">
                        <select
                            className="fieldInputs"
                            onChange={(e) => {
                                updatedVehicleInfo.hasBluetooth = e.target.value;
                            }}
                            form={vehicleInfo._id}
                            defaultValue={vehicleInfo.hasBluetooth}>
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                        </select>
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={vehicleInfo.year} className="inputBoxes" form={vehicleInfo._id} name="year" onChange={(e) => updatedVehicleInfo.year = e.target.value} autoComplete="off"/>
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={vehicleInfo.licensePlate} className="inputBoxes" form={vehicleInfo._id} name="licensePlate" onChange={(e) => updatedVehicleInfo.licensePlate = e.target.value} autoComplete="off"/>
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={vehicleInfo.color} className="inputBoxes" form={vehicleInfo._id} name="color" onChange={(e) => updatedVehicleInfo.color = e.target.value} autoComplete="off"/>
                    </td>
                    <td className="fieldInputs">
                    <select
                            className="fieldInputs"
                            onChange={(e) => {
                                updatedVehicleInfo.branchId = e.target.value;
                            }}
                            form={vehicleInfo._id}
                            defaultValue={vehicleInfo.branchId}>
                            <option value="65fb731318f6999f70da4432">CarsRUS: Downtown Montreal</option>
                            <option value="65fb739018f6999f70da4433">CarsRUs: Montreal West</option>
                            <option value="65fb73e818f6999f70da4435">CarsRUs: YUL</option>
                            <option value="65fb740418f6999f70da4437">CarsRUs: YYZ</option>
                            <option value="65fb741518f6999f70da4438">CarsRUs: King Street</option>
                            <option value="65fb742518f6999f70da4439">CarsRUs: Dundas East</option>
                        </select>
                    </td>
                    <td className="confirmation">
                        <input type="submit" className="submitButton" id="updateButton" form={vehicleInfo._id} value="Update" />
                        <button className="submitButton" id="deleteButton" form={vehicleInfo._id} onClick={() => deleteVehicle(vehicleInfo)}>Delete</button>
                    </td>
                </tr>
            </>
        )


    }

    useEffect(() => {
        axios
            .get("http://localhost:8080/vehicles")
            .then((res) => {
                if (res.status === 200) {
                    setAllVehicles(res.data);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    function toggleCreateVehicleModal(){
        setCreateVehicleModal(!createVehicleModal);
    }

    return (
        <>
            <Navbar />
            {pageTitle()}
            <h1>{document.title}</h1>
            <button className='LogBtn' onClick={toggleCreateVehicleModal}>Create Vehicle</button>
            <table className="vehicleTable">
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Type</th>
                        <th>Transmission</th>
                        <th>Number of Seats</th>
                        <th>Fuel Type</th>
                        <th>URL</th>
                        <th>Rental Price</th>
                        <th>Drivetrain</th>
                        <th>Bluetooth</th>
                        <th>Year</th>
                        <th>License Plate</th>
                        <th>Color</th>
                        <th>Branch ID</th>
                        <th>Confirm</th>
                    </tr>
                </thead>
                <tbody>
                    {allVehicles.map(vehicle =>
                        <VehicleRow key={vehicle._id} vehicleInfo={vehicle} />
                    )}
                </tbody>
            </table>

            {createVehicleModal && (
                <>
                <div className="overlay" onClick={toggleCreateVehicleModal} />
                <div className="modal-content2">
                    <CreateVehicle
                    toggleModal={toggleCreateVehicleModal}
                    />
                </div>
                </>
            )}
        </>
    );
}

