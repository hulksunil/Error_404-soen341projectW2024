import React, { useEffect, useState } from "react";
import "./styles/Browse.css";
import Navbar from "./components/Navbar/navbar";
import CarBrowse from "./components/CardBrowse/cardbrowse";
import Sidebar from "./components/Sidebar/sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Browse() {
  interface Filters {
    type: string[];
    numberOfSeats: string[];
    transmission: string[];
    fuelType: string[];
    branch: string[];
  }

  type Car = {
    model: string;
    type: string;
    transmission: string;
    numberOfSeats: string;
    fuelType: string;
    _id: string;
    url: string;
    branchId: string;
    rentalPrice: string;
    drivetrain: string;
    year: string;
    color: string;
    licensePlate: string;
    hasBluetooth: string;
  };

  const [AllVehicles, setAllVehicles] = useState<Car[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Car[]>([]);
  const [filters, setFilters] = useState<Filters>({
    type: [],
    numberOfSeats: [],
    transmission: [],
    fuelType: [],
    branch: [],
  });
  const [userInput, setUserInput] = useState({
    budget: "",
    type: "",
    numberOfSeats: "",
    fuelType: "",
  });
  const [suggestedVehicles, setSuggestedVehicles] = useState<Car[]>([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:8080/vehicles")
      .then((res) => {
        if (res.status === 200) {
          setAllVehicles(res.data);
          setFilteredVehicles(res.data);
        }
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, []);

  useEffect(() => {
    let filtered;

    filtered = AllVehicles.filter((car) => {
      return (
        (filters.type.length === 0 || filters.type.includes(car.type)) &&
        (filters.numberOfSeats.length === 0 ||
          filters.numberOfSeats.includes(car.numberOfSeats)) &&
        (filters.transmission.length === 0 ||
          filters.transmission.includes(car.transmission)) &&
        (filters.fuelType.length === 0 ||
          filters.fuelType.includes(car.fuelType)) &&
        (filters.branch.length === 0 ||
          filters.branch.includes(car.branchId))
      );
    });

    setFilteredVehicles(filtered);
  }, [filters, AllVehicles]);



  const handleFilterChange = (
    filterType: keyof Filters,
    value: string
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
  };

  const compareAndSuggestVehicles = () => {
    const { budget, type, numberOfSeats, fuelType } = userInput;

    if (budget === ""){
      alert("Please enter a budget before comparing");
      return;
    }

    const suggested = AllVehicles.filter((car) => {
      return (
        parseFloat(car.rentalPrice) <= parseFloat(budget) &&
        (type === "" || car.type === type) &&
        (numberOfSeats === "" || car.numberOfSeats === numberOfSeats) &&
        (fuelType === "" || car.fuelType === fuelType)
      );
    });

    setSuggestedVehicles(suggested);
  };

  //handle input type for comparison
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  //handle select type for comparison
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  

  //function to change color for prices in comparison
  const getRentalPriceColor = (price) => {
    const lowerThird = parseFloat(userInput.budget) / 3;
    const upperThird = parseFloat(userInput.budget) * (2 / 3);
  
    if (price <= lowerThird) {
      return "#8ffc80";
    } else if (price > lowerThird && price <= upperThird) {
      return "#fa9a41";
    } else {
      return "#f55959";
    }
  };

  //function to change color for type of fuel
  const getFuelColor = (fuelType) => {
    switch (fuelType.toLowerCase()) {
      case "electric":
        return "#8ffc80";
      case "hybrid":
        return "#fa9a41";
      case "gas":
        return "#f55959";
        default:
          return "";
    }
  }

  //reset function for comparison
  const resetFields = () => {
    setUserInput({
      budget: "",
      type: "",
      numberOfSeats: "",
      fuelType: "",
    });
    setSuggestedVehicles([]);
  };
  return (
    <div className="mainBrowse">
      <Navbar />
      
      <div><h1>Browse Vehicle</h1></div>
      <Sidebar
        handleFilterChange={handleFilterChange}
        branchId={location.state?.branchId}
      />

      <div className="card-list">
        {filteredVehicles.map((car) => (
          <CarBrowse
            key={car._id}
            carId={car._id}
            model={car.model}
            type={car.type}
            transmission={car.transmission}
            numberOfSeats={car.numberOfSeats}
            fuelType={car.fuelType}
            url={car.url}
            rentalPrice={car.rentalPrice}
            drivetrain={car.drivetrain}
            year={car.year}
            color={car.color}
            licensePlate={car.licensePlate}
            hasBluetooth={car.hasBluetooth}
          />
        ))}
      </div>
      
      <div className="comparisonSection">
        <div className="compareInput">
          <h1>Compare and Suggestion</h1>
          <input
            className="comparisonInput"
            type="text"
            name="budget"
            value={userInput.budget}
            onChange={handleInputChange}
            placeholder="Budget"
          />
          <select
            className="selectInput"
            name="type"
            value={userInput.type}
            onChange={handleSelectChange}>
              <option value="">Type of Vehicle</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Pick-Up">Pick-Up</option>
              <option value="Sports Car">Sports Car</option>
          </select>
          <select
            className="selectInput"
            name="numberOfSeats"
            value={userInput.numberOfSeats}
            onChange={handleSelectChange}>
              <option value="">No. of Seats</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="7">7</option>
            
          </select>
          <select
            className="selectInput"
            name="fuelType"
            value={userInput.fuelType}
            onChange={handleSelectChange}>
              <option value="">Fuel Type</option>
              <option value="Gas">Gas</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
          </select>
          
          <button onClick={compareAndSuggestVehicles} className="compareBtn">
            Compare and suggest
          </button>
          <button className="compareBtn" onClick={resetFields}>
            Reset 
          </button>
        </div>
        <div className="compareInfo">
            <h3>Information:</h3>
            <br />
            <li>Hatchbacks, SUVs and Pick-Ups will have the most storage space.</li>
            <li>Electric car will save the most money on fuel.</li>
            <li>Table colors: Green = good/best, Orange = medium/decent, Red = bad/worst</li>
            
          </div>
        <table className="comparisonTable">
          <thead> 
            <tr>
              <th>Model</th>
              <th>Type</th>
              <th>Rental Price</th>
              <th>Bluetooth</th>
              <th>Fuel Type</th>
              <th>No. of Seats</th>
            </tr>
          </thead>
          <tbody className="comparisonContent">
            {suggestedVehicles.map((car) => (
              <tr key={car._id}>
                <td>{car.model} 
                <br />
                <img className="imageCompare"src={car.url} alt="" /></td>
                <td>{car.type}</td>
                <td style={{backgroundColor: getRentalPriceColor(parseFloat(car.rentalPrice))}}>
                  {car.rentalPrice}
                </td>
                <td className={car.hasBluetooth.toLowerCase() === "yes"?"bluetooth-yes":"bluetooth-no"}>
                  {car.hasBluetooth}
                </td>
                <td style={{backgroundColor: getFuelColor((car.fuelType))}}>
                  {car.fuelType}
                </td>
                <td>{car.numberOfSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
