import React, { useEffect } from "react";
import "./styles/Browse.css";
import Navbar from "./components/Navbar/navbar";
import CarBrowse from "./components/CardBrowse/cardbrowse"
import Sidebar from "./components/Sidebar/sidebar"

export default function Browse() {

  
  return (
    <div className="mainBrowse">
      <Navbar/>
      <Sidebar/>
      <div className="card-list">
        <CarBrowse
        titleName ="Ferrari SF90"
        imageUrl="https://media.wired.com/photos/5cf0413114e889d1d895c5d9/master/pass/techintwo_Ferrari.jpg"
        CarType ="Sports Car"
        NoOfPass ="2"
        PTrain = "Hybrid"/>

        <CarBrowse
        titleName ="Toyota Prius"
        imageUrl="https://toyotacanada.scene7.com/is/image/toyotacanada/2023_Prius_Limited_ReservoirBlue_001?ts=1696207870625&$Media-Large$&dpr=off"
        CarType ="Hatchback"
        NoOfPass ="5"
        PTrain = "Hybrid"/>

        <CarBrowse
        titleName ="Tesla Model X"
        imageUrl="https://hips.hearstapps.com/hmg-prod/images/2020-tesla-model-x-123-656e3825810bc.jpg?crop=0.345xw:0.413xh;0.324xw,0.303xh&resize=768:*"
        CarType ="Hatchback"
        NoOfPass ="7"
        PTrain = "Electric"/>

        <CarBrowse
        titleName ="Toyota Sienna"
        imageUrl="https://toyotacanada.scene7.com/is/image/toyotacanada/2021_Toyota_Sienna-1?ts=1698952768352&$Media-Large$&dpr=off"
        CarType ="Van"
        NoOfPass ="7"
        PTrain = "Gas"/>

        <CarBrowse
        titleName ="Ford F150"
        imageUrl="https://cdn.motor1.com/images/mgl/nAmAgo/s1/2024-ford-f-150-stx-exterior.jpg"
        CarType ="Pick-Up"
        NoOfPass ="5"
        PTrain = "Gas"/>

        <CarBrowse
        titleName ="Toyota Sienna"
        imageUrl="https://toyotacanada.scene7.com/is/image/toyotacanada/2021_Toyota_Sienna-1?ts=1698952768352&$Media-Large$&dpr=off"
        CarType ="Van"
        NoOfPass ="7"
        PTrain = "Gas"/>

        <CarBrowse
        titleName ="Toyota Prius"
        imageUrl="https://toyotacanada.scene7.com/is/image/toyotacanada/2023_Prius_Limited_ReservoirBlue_001?ts=1696207870625&$Media-Large$&dpr=off"
        CarType ="Hatchback"
        NoOfPass ="5"
        PTrain = "Hybrid"/>


      </div>
      
    </div>
  );
}
