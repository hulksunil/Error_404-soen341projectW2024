// Sidebar.js
import React from 'react';
import "./sidebar.css";

function Sidebar({ handleFilterChange }) {
  return (
    <div className='filtersidebar'> 
        <h2 className='filterTitle'>Filter</h2>
        <div className="cartype">
          <h3 className='titlecheck'>Car Type:</h3>
          <input type="checkbox" onChange={() => handleFilterChange('carType', 'SUV',)} className='typeinput'/> SUV
          <br />
          <input type="checkbox" onChange={() => handleFilterChange('carType', 'Hatchback',)} className='typeinput'/> Hatchback
          <br />
          <input type="checkbox" onChange={() => handleFilterChange('carType', 'Sedan',)} className='typeinput'/> Sedan
          <br />
          <input type="checkbox" onChange={() => handleFilterChange('carType', 'Pick-Up',)} className='typeinput'/> Pick-Up
          <br />
          <input type="checkbox" onChange={() => handleFilterChange('carType', 'Sports Car',)} className='typeinput'/> Sports Car
          <br />
        </div>

        <div className="nopassenger">
          <h3 className='titlecheck'>No. of Passengers:</h3>
          <input type="checkbox" onChange={() => handleFilterChange('passengers', '2')} className='typeinput'/> 2
          <br />
          <input type="checkbox" onChange={() => handleFilterChange('passengers', '5')} className='typeinput'/> 5
          <br />
          <input type="checkbox" onChange={() => handleFilterChange('passengers', '7')} className='typeinput'/> 7
          <br />
          
        </div>
    
        <div className="powertrain">
          <h3 className='titlecheck'>Powertrain:</h3>
          <input type="checkbox" onChange={() => handleFilterChange('powertrain', 'Gas')} className='typeinput'/> Gas
          <br />
          <input type="checkbox" onChange={() => handleFilterChange('powertrain', 'Electric')} className='typeinput'/> Electric
          <br />
          <input type="checkbox" onChange={() => handleFilterChange('powertrain', 'Hybrid')} className='typeinput'/> Hybrid
          <br />
        </div>
    </div>
  );
}

export default Sidebar;
