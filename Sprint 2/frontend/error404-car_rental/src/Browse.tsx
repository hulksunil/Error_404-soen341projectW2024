// Browse.js
import React, { useState } from "react";
import "./styles/Browse.css";
import Navbar from "./components/Navbar/navbar";
import CarBrowse from "./components/CardBrowse/cardbrowse"
import Sidebar from "./components/Sidebar/sidebar"

interface Car {
  titleName: string;
  imageUrl: string;
  CarType: string;
  NoOfPass: string;
  PTrain: string;
}

interface Filters {
  carType: string[];
  passengers: string[];
  powertrain: string[];
}

// Assuming carsData is an array of car objects
const carsData: Car[] = [
  {
    titleName: "Ferrari SF90",
    imageUrl: "https://media.wired.com/photos/5cf0413114e889d1d895c5d9/master/pass/techintwo_Ferrari.jpg",
    CarType: "Sports Car",
    NoOfPass: "2",
    PTrain: "Hybrid"
  },
  {
    titleName: "Toyota Prius",
    imageUrl: "https://toyotacanada.scene7.com/is/image/toyotacanada/2023_Prius_Limited_ReservoirBlue_001?ts=1696207870625&$Media-Large$&dpr=off",
    CarType: "Hatchback",
    NoOfPass: "5",
    PTrain: "Hybrid"
  },
  {
    titleName: "Tesla Model X",
    imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2020-tesla-model-x-123-656e3825810bc.jpg?crop=0.345xw:0.413xh;0.324xw,0.303xh&resize=768:*",
    CarType: "Hatchback",
    NoOfPass: "7",
    PTrain: "Electric"
  },
  {
    titleName: "Toyota Sienna",
    imageUrl: "https://toyotacanada.scene7.com/is/image/toyotacanada/2021_Toyota_Sienna-1?ts=1698952768352&$Media-Large$&dpr=off",
    CarType: "Van",
    NoOfPass: "7",
    PTrain: "Gas"
  },
  {
    titleName: "Ford F150",
    imageUrl: "https://cdn.motor1.com/images/mgl/nAmAgo/s1/2024-ford-f-150-stx-exterior.jpg",
    CarType: "Pick-Up",
    NoOfPass: "5",
    PTrain: "Gas"
  },
  {
    titleName: "Honda Civic",
    imageUrl: "https://media.ed.edmunds-media.com/honda/civic/2023/oem/2023_honda_civic_sedan_si_fq_oem_1_1600.jpg",
    CarType: "Sedan",
    NoOfPass: "5",
    PTrain: "Gas"
  }



  // Add more car objects here
];

export default function Browse() {
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
        {carsData.filter(filterCars).map((car, index) => (
          <CarBrowse
            key={index}
            titleName={car.titleName}
            imageUrl={car.imageUrl}
            CarType={car.CarType}
            NoOfPass={car.NoOfPass}
            PTrain={car.PTrain}
          />
        ))}
      </div>
    </div>
  );
}
