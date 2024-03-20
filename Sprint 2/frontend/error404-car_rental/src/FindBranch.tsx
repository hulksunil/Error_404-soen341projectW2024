import React, { useState } from "react";
import Navbar from "./components/Navbar/navbar";
import "./styles/FindBranch.css";
import "./styles/CreateUser.css";
import axios from "axios";
import {
    setDefaults,
    fromAddress,
    OutputFormat,
} from "react-geocode";

export default function FindBranch() {
    const [address, setAddress] = useState("");
    const [latlong, setLatlong] = useState({ lat: 0, long: 0 })
    const [addressError, setAddressError] = useState(false)

//https://www.npmjs.com/package/react-geocode
    setDefaults({
        key: "AIzaSyABeU9H3XCmHXriQLvWTXFWgDxRvByZoSA", // Your API key here.
        language: "en", // Default language for responses.
        outputFormat: OutputFormat.JSON,
    });

    function getAllBranches(){

    }

    function handleSearchClick() {
        getLatLong()
        if (latlong.lat == 0 || latlong.long == 0) {
            setAddressError(true);
        }
    }

    function getLatLong() {
        fromAddress(address)
            .then(({ results }) => {
                setAddressError(false);
                const { lat, lng } = results[0].geometry.location;

                setLatlong((latlong) => ({
                    ...latlong,
                    lat: lat,
                    long: lng,
                }));
            })
            .catch(() => {
                setAddressError(true);
            });
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance.toFixed(2); // Round to 2 decimal places
      };

      const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };

    return (
        <div>
            <Navbar />
            <h2>Branch Locator</h2>
            <h3>Enter a location</h3>
            <input
                type="text"
                className="search"
                placeholder="Enter an Address or Area Code"
                required
                autoFocus
                autoComplete="off"
                onChange={(e) => {
                    setAddress(e.target.value);
                }}
            />

            <button className="searchButton" onClick={handleSearchClick}>
                Search!
            </button>
            <h3 className={addressError ? "errorVisible" : "error"} id="error">
                Verify that the address is written correctly. For example "7700 Decarie Blvd H4P 2H4"
            </h3>
        </div>
    );
}
