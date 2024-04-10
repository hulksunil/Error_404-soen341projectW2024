import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import axios from "axios";
import {storeCookies} from '../CookieManager.ts';
import Navbar from "../components/Navbar/navbar";
import { useNavigate } from 'react-router-dom';


export default function CSRView() {
    const history = useNavigate();

    function pageTitle() {
        return <title>Customer Service Representative</title>;
    }

    function NavigateTo(pageTitle : String){
        history('/'+pageTitle); 
    }

    return(
        <>
        {pageTitle()}
        <div className='content'>
                {pageTitle()}
                <Navbar/>
                <h1>CSR View</h1>

                <button className="buttonContainer" onClick={()=>{NavigateTo('check_in')}}>
                    <Link to="/check_in" className="centeredText">Check In</Link>
                </button>

                <button className="buttonContainer" onClick={()=>{NavigateTo('checkout')}}>
                    <Link to="/checkout" className="centeredText">Check Out</Link>
                </button>

                <button className="buttonContainer" onClick={()=>{NavigateTo('view-checkouts')}}>
                    <Link to="/view-checkouts" className="centeredText">View Checkouts</Link>
                </button>
                
               
            </div>
        </>
    )
}