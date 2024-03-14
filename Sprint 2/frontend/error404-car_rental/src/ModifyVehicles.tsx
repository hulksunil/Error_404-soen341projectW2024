import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/navbar";
import "./components/Navbar/navbar.css"
import "./styles/ModifyUsers.css";


export default function ModifyVehicles(){
    type vehicle={
        model : String,
        type : String,
        transmission: String,
        numberOfSeats: String,
        fuelType: String,
        __v: string,
        _id: string,
    }

    const [allVehicles, setAllVehicles]= useState<vehicle[]>([]);

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
                        <input type="text" placeholder={vehicleInfo.transmission} className="inputBoxes" form={vehicleInfo._id} name="transmission" onChange={(e) => updatedVehicleInfo.transmission = e.target.value} autoComplete="off"/>
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={vehicleInfo.numberOfSeats} className="inputBoxes" form={vehicleInfo._id} name="numberOfSeats" onChange={(e) => updatedVehicleInfo.numberOfSeats = e.target.value} autoComplete="off"/>
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={vehicleInfo.fuelType} className="inputBoxes" form={vehicleInfo._id} name="fuelType" onChange={(e) => updatedVehicleInfo.fuelType = e.target.value} autoComplete="off"/>
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

    return (
        <>
            <Navbar />
            {pageTitle()}
            <h1>{document.title}</h1>
            <table className="vehicleTable">
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Type</th>
                        <th>Transmission</th>
                        <th>Number of Seats</th>
                        <th>Fuel Type</th>
                    </tr>
                </thead>
                <tbody>
                    {allVehicles.map(vehicle =>
                        <VehicleRow key={vehicle._id} vehicleInfo={vehicle} />
                    )}
                </tbody>
            </table>
        </>
    );
}

