import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";
import CreateUser from "./CreateUser.tsx";
import LogIn from "./LogIn.tsx";
// @ts-ignore
import { ReactComponent as UserSilhouette } from "./svgs/userSilhouette.svg";
// @ts-ignore
import { ReactComponent as Signin } from "./svgs/sign-in.svg";
import {getCookie} from './CookieManager.ts';

export default function NavBar(props) {
  const [homeActive, sethomeActive] = useState(
    props.pageTitle === "Home" || document.title === "Home"
  );
  const [createUserModal, setCreateUserModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    userColor: "",
    accType:"",
    id:"",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function toggleCreateUserModal() {
    if(!isLoggedIn){
      setCreateUserModal(!createUserModal);
    }
  }

  function toggleLoginModal() {
    setLoginModal(!loginModal);
  }

  useEffect(() => {
    sethomeActive(props.pageTitle === "Home" || document.title === "Home");
  }, [props.pageTitle, document.title]);

  //This useeffect is for loading the cookies 
  useEffect(()=>{
    let username = getCookie("username");
    if(username){
      let usernameSplit = username.split(" ");
      console.log(usernameSplit)
      setUserInfo((userInfo) => ({
        ...userInfo,
        fname: usernameSplit[0],
        lname: usernameSplit[1]
      }));
      setIsLoggedIn(true)
    }
  },[])

  return (
    <>
      <div className="navBar">
        <ul>
          <li className="navbarLeft" id={homeActive ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className="navbarLeft">
            <a>About</a>
          </li>

          <li className="navbarRight">
            <a onClick={toggleCreateUserModal}>
              <UserSilhouette
                width="30px"
                height="30px"
                className="userIcon"
                fill={userInfo.userColor}
              />
              {!isLoggedIn
                ? "Create Account"
                : "Welcome back " + userInfo.fname}
            </a>
          </li>

          <li className="navbarRight">
            {!isLoggedIn && 
            <a onClick={toggleLoginModal}>
                <Signin 
                width="30px"
                height="30px"
                className="userIcon"/>
                Log in
            </a>}
            {isLoggedIn &&
              <a> View Reservations</a>
            }
          </li>
        </ul>
      </div>

      {createUserModal && (
        <>
          <div className="overlay" onClick={toggleCreateUserModal} />
          <div className="modal-content">
            <CreateUser
              toggleModal={toggleCreateUserModal}
              setUserInfo={setUserInfo}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
        </>
      )}

      {loginModal && (
        <>
          <div className="overlay" onClick={toggleLoginModal} />
          <div className="modal-content">
            <LogIn
              toggleModal={toggleLoginModal}
              setUserInfo={setUserInfo}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
        </>
      )}
    </>
  );
}
