import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";
import axios from "axios";
import {storeCookies} from './CookieManager.ts';
import Navbar from "./components/Navbar/navbar";


export default function AdminView() {

    function pageTitle() {
        return <title>Admin View</title>;
    }

    return(
        <>
        {pageTitle()}
        <div className='content'>
                {pageTitle()}
                <Navbar/>
                <h1>Admin View</h1>

                <button className="buttonContainer">
                    <Link to="/modifyusers" className="centeredText">Modify Users</Link>
                </button>

                <button className="buttonContainer">
                    <Link to="/modifycars" className="centeredText">Modify Cars</Link>
                </button>
                <button className="buttonContainer">
                    <Link to="/modifyreservations" className="centeredText">Modify Reservations</Link>
                </button>
                {/* This creates a link on the page that will route 
            to the specified element, CreateUser.tsx, page and will display the 
            specified path in the search bar. The route is specified in the App.js page */}
            </div>
        </>
    )
}