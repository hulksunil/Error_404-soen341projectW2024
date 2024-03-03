import React from 'react';
import "./sidebar.css";

function sidebar() {
  return (
    <div className='filtersidebar'> 
        <h2 className='filterTitle'>Filter</h2>
        <div className="cartype">
          <h3 className='titlecheck'>Car Type:</h3>
          <input type="checkbox"  className='typeinput'/> SUV
          <br />
          <input type="checkbox"  className='typeinput'/> Sedan
          <br />
          <input type="checkbox"  className='typeinput'/> Van
          <br />
          <input type="checkbox"  className='typeinput'/> Sports Car
          <br />
          <input type="checkbox"  className='typeinput'/> Pick-Up
          <br />
          <input type="checkbox"  className='typeinput'/> Hatchback
          <br />
          
        </div>

        <div className="nopassenger">
          <h3 className='titlecheck'>No. of Passengers:</h3>
          <input type="checkbox"  className='typeinput'/> 2
          <br />
          <input type="checkbox"  className='typeinput'/> 3-5
          <br />
          <input type="checkbox"  className='typeinput'/> 6-7
          <br />
        </div>
    
        <div className="powertrain">
          <h3 className='titlecheck'>Powertrain:</h3>
          <input type="checkbox"  className='typeinput'/> Gas
          <br />
          <input type="checkbox"  className='typeinput'/> Electric
          <br />
          <input type="checkbox"  className='typeinput'/> Hybrid
          <br />
        </div>
    </div>
  )
}

export default sidebar