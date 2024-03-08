import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './styles/Home.css'
import NavBar from './NavBar.tsx';


export default function Home() {
    function pageTitle() {
        return <title>Home</title>;
    }


    return (
        <>
            <div className='background' />
            <div className='content'>
                {pageTitle()}
                <NavBar pageTitle={document.title} />
                <h1>Cars R Us</h1>

                <button className="buttonContainer">
                    <img src={require('./images/roadtrip.jpg')} alt="People on an advdnture" className='image' />
                    <Link to="/browse" className="centeredText"> Find A Car! </Link>
                </button>

                <button className="buttonContainer">
                    <img src={require('./images/handingOverKeys.jpg')} alt="handingOverKeys" className='image' />
                    <Link to="/viewreservation" className="centeredText"> View Reservations </Link>
                </button>

                {/* This creates a link on the page that will route 
            to the specified element, CreateUser.tsx, page and will display the 
            specified path in the search bar. The route is specified in the App.js page */}
            </div>
        </>

    )
}
