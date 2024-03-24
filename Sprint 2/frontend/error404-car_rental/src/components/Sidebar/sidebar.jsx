// Sidebar.js
import React from 'react';
import "./sidebar.css";

function Sidebar({ handleFilterChange }) {
  return (
    <>
      <div className='filtersidebar'> 
          <h2 className='filterTitle'>Filter</h2>
          <div className="cartype">
            <h3 className='titlecheck'>Car Type:</h3>
            <input type="checkbox" onChange={() => handleFilterChange('type', 'SUV',)} className='typeinput'/> SUV
            <br />
            <input type="checkbox" onChange={() => handleFilterChange('type', 'Hatchback',)} className='typeinput'/> Hatchback
            <br />
            <input type="checkbox" onChange={() => handleFilterChange('type', 'Sedan',)} className='typeinput'/> Sedan
            <br />
            <input type="checkbox" onChange={() => handleFilterChange('type', 'Pick-Up',)} className='typeinput'/> Pick-Up
            <br />
            <input type="checkbox" onChange={() => handleFilterChange('type', 'Sports Car',)} className='typeinput'/> Sports Car
            <br />
          </div>

          <div className="nopassenger">
            <h3 className='titlecheck'>No. of Seats: </h3>
            <input type="checkbox" onChange={() => handleFilterChange('numberOfSeats', '2')} className='typeinput'/> 2
            <br />
            <input type="checkbox" onChange={() => handleFilterChange('numberOfSeats', '5')} className='typeinput'/> 5
            <br />
            <input type="checkbox" onChange={() => handleFilterChange('numberOfSeats', '7')} className='typeinput'/> 7
            <br />
            
          </div>

          <div className="transmission">
            <h3 className='titlecheck'>Transmission:</h3>
            <input type="checkbox" onChange={() => handleFilterChange('transmission', 'Automatic')} className='typeinput'/> Automatic
            <br />
            <input type="checkbox" onChange={() => handleFilterChange('transmission', 'Manual')} className='typeinput'/> Manual
            <br />
            
            
          </div>
      
          <div className="powertrain">
            <h3 className='titlecheck'>Fuel Type:</h3>
            <input type="checkbox" onChange={() => handleFilterChange('fuelType', 'Gas')} className='typeinput'/> Gas
            <br />
            <input type="checkbox" onChange={() => handleFilterChange('fuelType', 'Electric')} className='typeinput'/> Electric
            <br />
            <input type="checkbox" onChange={() => handleFilterChange('fuelType', 'Hybrid')} className='typeinput'/> Hybrid
            <br />
          </div>
          <br />
          <div className="compareInfo">*Scroll down to view comparison</div>
      </div>
    

    </>
  );
}

export default Sidebar;
