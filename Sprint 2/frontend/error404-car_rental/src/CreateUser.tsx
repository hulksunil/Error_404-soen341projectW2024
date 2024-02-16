import React from 'react';
import './CreateUser.css';

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