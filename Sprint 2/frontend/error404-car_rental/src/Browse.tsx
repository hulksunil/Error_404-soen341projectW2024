// Browse.js
import React, { useEffect, useState } from "react";
import "./styles/Browse.css";
import Navbar from "./components/Navbar/navbar";
import CarBrowse from "./components/CardBrowse/cardbrowse"
import Sidebar from "./components/Sidebar/sidebar"
import axios from "axios";


interface Filters {
  carType: string[];
  passengers: string[];
  powertrain: string[];
}

export default function Browse() {

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/vehicles")
      .then((res) => {
          if(res.status === 200) {
            setAllVehicles(res.data);
            console.log("Data received:", res.data);
          }
      })
      .catch((error)=> {
        console.error("error:",error);
      });
  }, []);


  const [filters, setFilters] = useState<Filters>({
    carType: [],
    passengers: [],
    powertrain: []
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value]
    }));
  };

  const filterCars = (car) => {
    if (
      (filters.carType.length === 0 || filters.carType.includes(car.CarType)) &&
      (filters.passengers.length === 0 || filters.passengers.includes(car.NoOfPass)) &&
      (filters.powertrain.length === 0 || filters.powertrain.includes(car.PTrain))
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="mainBrowse">
      <Navbar/>
      <Sidebar handleFilterChange={handleFilterChange}/>
      <div className="card-list">
       {AllVehicles.map(Car => 
          <CarBrowse 
            key={Car._id} 
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
