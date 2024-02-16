import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './Home.css';

export default function Home(){
    return(
        <div>
            <h1>Home Page</h1>
            <Link to ="/createuser">Link to create user page</Link>
            {/* This creates a link on the page that will route 
            to the specified element, CreateUser.tsx, page and will display the 
            specified path in the search bar. The route is specified in the App.js page */}
        </div>
    )
}
