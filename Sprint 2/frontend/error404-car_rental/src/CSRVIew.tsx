import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";
import axios from "axios";
import {storeCookies} from './CookieManager.ts';
import Navbar from "./components/Navbar/navbar";


export default function CSRView() {

    function pageTitle() {
        return <title>Customer Service Representative</title>;
    }

    return(
        <>
        {pageTitle()}
        <div className='content'>
                {pageTitle()}
                <Navbar/>
                <h1>CSR View</h1>

                <button className="buttonContainer">
                    <Link to="/modifyusers" className="centeredText">Check In</Link>
                </button>

                <button className="buttonContainer">
                    <Link to="/checkout" className="centeredText">Check Out</Link>
                </button>
                
               
            </div>
        </>
    )
}