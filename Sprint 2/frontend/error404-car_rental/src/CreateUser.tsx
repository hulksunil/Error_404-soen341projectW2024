import React, { useEffect, useState } from 'react';
import './styles/CreateUser.css';
import NavBar from './NavBar.tsx';
// @ts-ignore
import { ReactComponent as UserSilhouette } from './svgs/userSilhouette.svg';
export default function CreateUser(){
    const [color, setColor] = useState("black");

    function pageTitle(){
        return(<title>Create Account</title>)
    }

    function colorsetter(event : any){
        const elementStyle = window.getComputedStyle(event.target);
        setColor(elementStyle.backgroundColor);
    }


    return(
        <div >
            {pageTitle()}
            <NavBar pageTitle = {document.title}/>
            <h3>Create Your Account!</h3>
            <div className='mainContent'>
                <div className='leftContainer'>
                    <div className='imageContainer'>
                       <UserSilhouette className="UserSilhouette-svg" fill = {color}/>
                    </div>

                    <div className='colorOptions'>
                        <button className='colorButton' style = {{backgroundColor: 'blue'}} onClick={colorsetter}/>
                        <button className='colorButton' style = {{backgroundColor: 'red'}} onClick={colorsetter}/>
                        <button className='colorButton' style = {{backgroundColor: 'purple'}} onClick={colorsetter}/>
                        <button className='colorButton' style = {{backgroundColor: 'green'}} onClick={colorsetter}/>
                        <button className='colorButton' style = {{backgroundColor: 'pink'}} onClick={colorsetter}/>
                        <button className='colorButton' style = {{backgroundColor: 'black'}} onClick={colorsetter}/>
                    </div>

                </div>
                <div className='rightContainer'>
                    <h3>First name</h3>
                    <h3>Last name</h3>
                    <h3>Email</h3>
                    <h3>Date of birth</h3>
                    <h3>Lisence #</h3>
                    <h3>Password</h3>
                </div>
            </div>

        </div>
    )

}