import React from 'react';
import { Link } from "react-router-dom";
import './styles/Home.css';
import Navbar from "./components/Navbar/navbar";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const history = useNavigate();

    function pageTitle() {
        return <title>Home</title>;
    }

    function NavigateTo(pageTitle : String){
        history('/'+pageTitle); 
    }


    return (
        <>
            <div className='background' />
            <div className='content'>
                {pageTitle()}
                <Navbar/>
                <h1>Cars R Us</h1>

                <button className="buttonContainer" onClick={()=>{NavigateTo('browse')}}>
                    <img src={require('./images/roadtrip.jpg')} alt="People on an advdnture" className='image' />
                    <Link to="/browse" className="centeredText"> Find A Car! </Link>
                </button>

                <button className="buttonContainer" onClick={()=>{NavigateTo('viewreservation')}}>
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
