import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './styles/Home.css'


export default function Home(){
    function pageTitle() {
        return <title>This is the home page</title>;
      }
    
    
    return(
        <div>
            {pageTitle()}
            <h1>Home Page</h1>
            <Link to ="/createuser">Link to create user page</Link>
            <br/>
            <Link to ="/browse">Link to browse</Link>
            <br/>
            <Link to ="/viewreservation">Link to reservation</Link>

            {/* This creates a link on the page that will route 
            to the specified element, CreateUser.tsx, page and will display the 
            specified path in the search bar. The route is specified in the App.js page */}
        </div>
    )
}
