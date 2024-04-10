import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/navbar";
import "../styles/FindBranch.css";
import "../styles/CreateUser.css";
import axios from "axios";
import {
    setDefaults,
    fromAddress,
    OutputFormat,
} from "react-geocode";
import { useNavigate } from "react-router-dom";

export default function FindBranch() {
    type branch = {
        _id: string,
        long: string,
        lat: string,
        name: string,
        distance: number
    }
    const history = useNavigate();

    const [address, setAddress] = useState("");
    const [latlong, setLatlong] = useState({ lat: 0, long: 0, fullAddress: "" })
    const [addressError, setAddressError] = useState(false);
    const [addressFound, setAddressFound] = useState(false);
    const [allBranches, setAllBranches] = useState<branch[]>([]);

    //https://www.npmjs.com/package/react-geocode
    setDefaults({
        key: "AIzaSyABeU9H3XCmHXriQLvWTXFWgDxRvByZoSA", // Your API key here.
        language: "en", // Default language for responses.
        outputFormat: OutputFormat.JSON,
    });

    function handleSearchClick() {
        getLatLong()
    }

    function getLatLong() {
        setLatlong({ lat: 0, long: 0, fullAddress: "" });
        fromAddress(address)
            .then(({ results }) => {
                const { lat, lng } = results[0].geometry.location;
                const formatted_address  = results[0].formatted_address;

                setLatlong((latlong) => ({
                    ...latlong,
                    lat: Number(lat),
                    long: Number(lng),
                    fullAddress: formatted_address,
                    distance:0
                }));
                setAddressError(false);
                setAddressFound(true);

                calculateDistance(lat,lng);
                setAddress("");
            })
            .catch(() => {
                setAddressError(true);
                setAddressFound(false);
            });
    }

    function calculateDistance(startLat,startLong){
        allBranches.forEach(branch => {
            branch.distance = calculateDistanceFunction(startLat,startLong,branch.lat,branch.long);
        });

        allBranches.sort((a,b) => a.distance - b.distance);
    }

    const calculateDistanceFunction = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return Number(distance.toFixed(2)); // Round to 2 decimal places
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    function viewBranch(branchid) {
        history("/browse", { state: { branchId: branchid } });
    }

    function BranchRow({ branchInfo }) {
        return (
            <>
                <tr>
                    <td>{branchInfo.name}</td>
                    {addressFound &&
                        <>
                            <th>{branchInfo.distance}</th>
                        </>
                    }
                    <td>
                        <button className="searchSelection" onClick={() => viewBranch(branchInfo._id)}>Browse Selection</button>
                    </td>
                </tr>
            </>
        )
    }


    useEffect(() => {
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


    return (
        <div>
            <Navbar/>
            <h2>Branch Locator</h2>
            <h3>Enter a location</h3>
            <input
                type="text"
                className="search"
                placeholder="Enter an Address or Area Code"
                autoFocus
                autoComplete="off"
                onChange={(e) => {
                    setAddress(e.target.value);
                }}
                value={address}
            />

            <button className="searchButton" onClick={handleSearchClick} disabled={address.length < 3}>
                Search!
            </button>
            <h3 className={addressError ? "errorVisible" : "error"} id="addyError">
                Verify that the address is written correctly. For example "7700 Decarie Blvd H4P 2H4"
            </h3>
            <h3 className={addressFound ? "foundVisible" : "found"}>
                Address found! {latlong.fullAddress}
            </h3>

            <table className="branchTable">
                <thead>
                    <tr>
                        <th>Branch Name</th>
                        {addressFound &&
                            <>
                                <th>Distance (km)</th>
                            </>
                        }

                        <th>Browse</th>
                    </tr>
                </thead>
                <tbody>
                    {allBranches.map(branch =>
                        <BranchRow key={branch._id} branchInfo={branch} />
                    )}
                </tbody>
            </table>
        </div>
    );
}