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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <div className="mainBrowse">
      <Navbar />
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
          <h2>Compare and Suggestion</h2>
          <input
            type="text"
            name="budget"
            value={userInput.budget}
            onChange={handleInputChange}
            placeholder="Budget"
          />
          <input
            type="text"
            name="type"
            value={userInput.type}
            onChange={handleInputChange}
            placeholder="Type of Car"
          />
          <input
            type="text"
            name="numberOfSeats"
            value={userInput.numberOfSeats}
            onChange={handleInputChange}
            placeholder="Number of Seats"
          />
          <input
            type="text"
            name="fuelType"
            value={userInput.fuelType}
            onChange={handleInputChange}
            placeholder="Fuel Type"
          />
          <button onClick={compareAndSuggestVehicles}>
            Compare and suggest
          </button>
        </div>
        <table className="comparisonTable">
          <thead>
            <tr>
              <th>Model</th>
              <th>Type</th>
              <th>Rental Price</th>
              <th>Bluetooth</th>
              <th>Fuel Type</th>
            </tr>
          </thead>
          <tbody className="comparisonContent">
            {suggestedVehicles.map((car) => (
              <tr key={car._id}>
                <td>{car.model} 
                <br />
                <img className="imageCompare"src={car.url} alt="" /></td>
                <td>{car.type}</td>
                <td>{car.rentalPrice}</td>
                <td>{car.hasBluetooth}</td>
                <td>{car.fuelType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
