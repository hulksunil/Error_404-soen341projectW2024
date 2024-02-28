import React, { useEffect } from 'react';
import './styles/CreateUser.css';
import NavBar from './NavBar.tsx';

export default function CreateUser(){

    function pageTitle(){
        return(<title>Create Account</title>)
    }

    return(
        <>
            {pageTitle()}
            <NavBar pageTitle = {document.title}/>

            <h1>Create User Page</h1>
        </>
    )

}