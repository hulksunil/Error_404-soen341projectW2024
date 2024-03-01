import React, { useEffect } from "react";
import "./styles/Browse.css";
import Navbar from "./components/Navbar/navbar";
import CarBrowse from "./components/CardBrowse/cardbrowse"


export default function Browse() {

  
  return (
    <div className="mainBrowse">
      <Navbar/>
      <div className="card-list">
        <CarBrowse
        titleName ="Ferrari SF90"
        imageUrl="https://media.wired.com/photos/5cf0413114e889d1d895c5d9/master/pass/techintwo_Ferrari.jpg"
        body="bbbbbbbbbrrrrrrrrrrrrrrrrrrrrr"/>

        <CarBrowse
        titleName ="Ferrari SF90"
        imageUrl="https://media.wired.com/photos/5cf0413114e889d1d895c5d9/master/pass/techintwo_Ferrari.jpg"
        body="bbbbbbbbbrrrrrrrrrrrrrrrrrrrrr"/>

      </div>
      
    </div>
  );
}
