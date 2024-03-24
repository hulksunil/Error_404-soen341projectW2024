// Browse.js
import React, { useEffect, useState } from "react";
import "./styles/Browse.css";
import Navbar from "./components/Navbar/navbar";
import CarBrowse from "./components/CardBrowse/cardbrowse";
import Sidebar from "./components/Sidebar/sidebar";
import axios from "axios";

export default function Browse() {
  // Define Filters and Car types
  interface Filters {
    type: string[];
    numberOfSeats: string[];
    transmission: string[];
    fuelType: string[];
  }

  type Car = {
    model: string;
    type: string;
    transmission: string;
    numberOfSeats: string;
    fuelType: string;
    _id: string;
    url: string;
    rentalPrice: string;
    drivetrain: string;
    year: string;
    color: string;
    licensePlate: string;
    hasBluetooth: string;
  };

  // State for storing vehicles and filters
  const [allVehicles, setAllVehicles] = useState<Car[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Car[]>([]);
  const [selectedCars, setSelectedCars] = useState<Car[]>([]); // State to store selected cars for comparison
  const [filters, setFilters] = useState<Filters>({
    type: [],
    numberOfSeats: [],
    transmission: [],
    fuelType: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/vehicles")
      .then((res) => {
        if (res.status === 200) {
          setAllVehicles(res.data);
          setFilteredVehicles(res.data);
          console.log("Data received:", res.data);
        }
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, []);

  // Apply filters based on user selection
  const applyFilters = () => {
    let filtered = allVehicles.filter((car) => {
      return (
        (filters.type.length === 0 || filters.type.includes(car.type)) &&
        (filters.numberOfSeats.length === 0 ||
          filters.numberOfSeats.includes(car.numberOfSeats)) &&
        (filters.transmission.length === 0 ||
          filters.transmission.includes(car.transmission)) &&
        (filters.fuelType.length === 0 ||
          filters.fuelType.includes(car.fuelType))
      );
    });
    setFilteredVehicles(filtered);
  };

  // Handle changes in filter selection
  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
  };

  // Method to handle car comparison
  const compareCars = (carId: string) => {
    const selectedCar = allVehicles.find((car) => car._id === carId);
    if (selectedCar) {
      setSelectedCars((prevSelectedCars) => [...prevSelectedCars, selectedCar]);
    }
  };

  return (
    <div className="mainBrowse">
      <Navbar />
      <Sidebar handleFilterChange={handleFilterChange} />
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
            onCompare={compareCars} // Pass the comparison method to the child component
          />
        ))}
      </div>
      <div className="CompareVehicle">
        <div className="compareTitle"><h2>Selected Cars for Comparison</h2></div>
        {selectedCars.length > 0 ? (
          <table className="compareTable">
            <thead>
              <tr>
                <th>Model</th>
                <th>Type</th>
                <th>Transmission</th>
                <th>Number of Seats</th>
                <th>Fuel Type</th>
                <th>Rental Price</th>
                <th>Drivetrain</th>
                <th>Year</th>
                <th>Bluetooth</th>
              </tr>
            </thead>
            <tbody>
              {selectedCars.map((car) => (
                <tr key={car._id}>
                  <td>{car.model}</td>
                  <td>{car.type}</td>
                  <td>{car.transmission}</td>
                  <td>{car.numberOfSeats}</td>
                  <td>{car.fuelType}</td>
                  <td>${car.rentalPrice}</td>
                  <td>{car.drivetrain}</td>
                  <td>{car.year}</td>
                  <td>{car.hasBluetooth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No cars selected for comparison.</p>
        )}
        <button onClick={() => setSelectedCars([])}>Reset Comparison</button>
      </div>
    </div>
  );
}
