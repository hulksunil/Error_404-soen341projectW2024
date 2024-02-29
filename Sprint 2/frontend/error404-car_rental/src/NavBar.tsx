import React, {useState,useEffect } from 'react';
import {Link } from "react-router-dom";
import './styles/NavBar.css'


export default function NavBar(props){
    const [homeActive,sethomeActive] = useState(props.pageTitle === "Home" || document.title === "Home");
    const [createAccountActive,setcreateAccountActive] = useState(props.pageTitle === "Create Account" || document.title === "Create Account");


    useEffect(() => {
        sethomeActive(props.pageTitle === "Home" || document.title === "Home" );
        setcreateAccountActive(props.pageTitle === "Create Account" || document.title === "Create Account");

        if(homeActive === createAccountActive){
            if(document.title === "Home"){
                setcreateAccountActive(false)
            }

            else if (document.title === "Create Account"){
                sethomeActive(false);
            }
        }

    }, [props.pageTitle,document.title]);
    

    return(
        <div className='navBar'>
            <ul >
                <li className='navbarLeft' id={homeActive ?"active":""}>
                        <Link to ="/">Home</Link>
                </li>
                <li className='navbarLeft'>
                    <a>
                        About
                    </a>
                </li>

                <li className='centerNav'>
                    {document.title}
                </li>

                <li className='navbarRight'>
                    <a>
                        Sign in
                    </a>                
                </li>
                
                <li className='navbarRight' id={createAccountActive ?"active":""}>
                    <Link to ="/createuser">Create Account</Link>
                </li>
            </ul>

        </div>
    )

}