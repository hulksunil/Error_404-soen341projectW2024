// Browse.js
import React, { useEffect, useState } from "react";
import "./styles/Browse.css";
import Navbar from "./components/Navbar/navbar";
import CarBrowse from "./components/CardBrowse/cardbrowse"
import Sidebar from "./components/Sidebar/sidebar"
import axios from "axios";




export default function Browse() {

  interface Filters {
    type: string[];
    numberOfSeats: string[];
    transmission: string[];
    fuelType: string[];
  }
  

  type Car = {
    model: string,
    type: string,
    transmission: string,
    numberOfSeats: string,
    fuelType: string,
    _id:string

  }

  //database
  const [AllVehicles, setAllVehicles] = useState<Car[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Car[]>([]);
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
          if(res.status === 200) {
            setAllVehicles(res.data);
            setFilteredVehicles(res.data);
            console.log("Data received:", res.data);
          }
      })
      .catch((error)=> {
        console.error("error:",error);
      });
  }, []);


  const applyFilters = () => {
    let filtered = AllVehicles.filter((car) => {
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

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value]
    }));
  };


  useEffect(() => {
  const filtered = AllVehicles.filter((car) => {
    return (
      (filters.type.length === 0 || filters.type.includes(car.type)) &&
      (filters.numberOfSeats.length === 0 || filters.numberOfSeats.includes(car.numberOfSeats)) &&
      (filters.transmission.length === 0 || filters.transmission.includes(car.transmission)) &&
      (filters.fuelType.length === 0 || filters.fuelType.includes(car.fuelType))
    );
  });
  setFilteredVehicles(filtered);
}, [filters, AllVehicles]);


  return (
    <div className="mainBrowse">
      <Navbar/>
      <Sidebar handleFilterChange={handleFilterChange}/>
      <div className="card-list">
       {filteredVehicles.map(Car => 
          <CarBrowse 
           key={Car._id} 
           carId={Car._id}
            model={Car.model} 
            type={Car.type} 
            transmission={Car.transmission}
            numberOfSeats={Car.numberOfSeats}
            fuelType={Car.fuelType}
          />

       )}
      </div>
    </div>
  );
}
