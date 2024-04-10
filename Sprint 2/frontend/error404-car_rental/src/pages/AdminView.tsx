import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Navbar from "../components/Navbar/navbar";
import { useNavigate } from 'react-router-dom';


export default function AdminView() {
    const history = useNavigate();

    function pageTitle() {
        return <title>Admin View</title>;
    }

    function NavigateTo(pageTitle : String){
        history('/'+pageTitle); 
    }

    return(
        <>
        {pageTitle()}
        <div className='content'>
                <Navbar/>
                <h1>Admin View</h1>

                <button className="buttonContainer" onClick={()=>{NavigateTo('modifyusers')}}>
                    <Link to="/modifyusers" className="centeredText">Modify Users</Link>
                </button>

                <button className="buttonContainer" onClick={()=>{NavigateTo('modifycars')}}>
                    <Link to="/modifycars" className="centeredText">Modify Cars</Link>
                </button>
                <button className="buttonContainer" onClick={()=>{NavigateTo('modifyreservations')}}>
                    <Link to="/modifyreservations" className="centeredText">Modify Reservations</Link>
                </button>
                {/* This creates a link on the page that will route 
            to the specified element, CreateUser.tsx, page and will display the 
            specified path in the search bar. The route is specified in the App.js page */}
        </div>
        </>
    )
}