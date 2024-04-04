import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";
import Navbar from "./components/Navbar/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Car = {
  _id: string;
  make: string;
  model: string;
  year: string;
  price: number;
  url: string;
};

export default function Home() {
  const history = useNavigate();

  const [cars, setCars] = useState([]);
  function getFirstCoupleCars() {
    // This function will be used to get the first couple cars from the database
    // and display them on the home page
    axios.get("http://localhost:8080/vehicles").then((response) => {
      console.log(response);
      setCars(response.data);
    });
  }

  useEffect(() => {
    getFirstCoupleCars();
  }, []);

  function pageTitle() {
    return <title>Home</title>;
  }

  function NavigateTo(pageTitle: String) {
    history("/" + pageTitle);
  }

  return (
    <>
      <div className="background" />
      <div className="content">
        {pageTitle()}
        <Navbar />
        <h1>Cars R Us</h1>

        <div className="homePageContent">
          <div className="homePageButtons">
            <button
              className="buttonContainer"
              onClick={() => {
                NavigateTo("browse");
              }}
            >
              <img
                src={require("./images/roadtrip.jpg")}
                alt="People on an advdnture"
                className="image"
              />
              <Link to="/browse" className="centeredText">
                {" "}
                Find A Car!{" "}
              </Link>
            </button>

            <button
              className="buttonContainer"
              onClick={() => {
                NavigateTo("viewreservation");
              }}
            >
              <img
                src={require("./images/handingOverKeys.jpg")}
                alt="handingOverKeys"
                className="image"
              />
              <Link to="/viewreservation" className="centeredText">
                {" "}
                View Reservations{" "}
              </Link>
            </button>
          </div>
          <div className="info">
            <div className="missionStatement">
              <h2>Our Mission</h2>
              <p>
                Our mission is to provide you with the best car rental
                experience possible. We offer a wide variety of cars to choose
                from, and we are dedicated to providing you with the best
                customer service possible. We are committed to making your car
                rental experience as easy and stress-free as possible. We look
                forward to serving you!
              </p>
            </div>
            <div className="missionStatement">
              <h2>Why Choose Us?</h2>
              <ul>
                <li>Wide variety of cars to choose from</li>
                <li>Easy and stress-free car rental experience</li>
                <li>Best customer service possible</li>
              </ul>
            </div>
          </div>
          <div className="carsSneakPeak">
            <h2>Some of our offered cars</h2>
            <div>
              {cars.slice(0, 5).map((car: Car) => (
                <div key={car._id}>
                  <img src={car.url} alt="Car" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* This creates a link on the page that will route 
            to the specified element, CreateUser.tsx, page and will display the 
            specified path in the search bar. The route is specified in the App.js page */}
      </div>
    </>
  );
}
