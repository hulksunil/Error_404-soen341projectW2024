import React, { useEffect } from 'react';
import './styles/CreateUser.css';

export default function CreateUser(){

    function pageTitle(){
        return(<title>Creat Account</title>)
    }

    return(
        <>
            {pageTitle()}
            <h1>Create User Page</h1>
        </>
    )

}