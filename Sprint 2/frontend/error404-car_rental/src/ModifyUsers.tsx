import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/ModifyUsers.css";
import "./styles/CreateUser.css";
import Navbar from "./components/Navbar/navbar";
import "./components/Navbar/navbar.css"

type user = {
    accType : string, 
    email: string, 
    firstName: string,
    hashedPass: string,
    lastName: string,
    __v: string,
    _id: string
}
export default function ModifyUsers() {
  const [allUsers, setAllUsers] = useState<user[]>([]);

  function pageTitle() {
    return <title>Modify Users</title>;
  }

  function updateUser(userInfo){
    console.log(userInfo)
  }

  function deleteUser(userInfo){
    axios
    .delete("http://localhost:8080/users/" + userInfo._id)
    .then((res) => {
      if (res.status === 200) {
        location.reload();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  }

  function UserRow({userInfo}){

    return(
        <>
        <tr>
            <td className="fieldInputs">
                <input type="text" placeholder={userInfo.firstName} className="inputBoxes" />
            </td>
            <td className="fieldInputs">
                <input type="text" placeholder={userInfo.lastName} className="inputBoxes"/>
            </td>
            <td className="fieldInputs">
                <input type="text" placeholder={userInfo.email} className="inputBoxes"/>
            </td>
            <td className="fieldInputs">
                <input type="text" className="inputBoxes"/>
            </td>
            <td className="fieldInputs">
                <input type="text" className="inputBoxes"/>
            </td>
            <td className="fieldInputs">
                <input type="text" placeholder={userInfo.hashedPass} className="inputBoxes"/>
            </td>
            <td className="fieldInputs">
                <input type="text" placeholder={userInfo.accType} className="inputBoxes"/>
            </td>
            <td className="confirmation">
                <button className="submitButton" id="updateButton" onClick={() =>updateUser(userInfo)}>Update</button>
                <button className="submitButton" id="deleteButton" onClick={() =>deleteUser(userInfo)}>Delete</button>
            </td>
        </tr>
        </>
    )

  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => {
        if (res.status === 200) {
          setAllUsers(res.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
    <Navbar/>
      {pageTitle()}
      <h1>{document.title}</h1>
      
      <table className="userTable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of birth</th>
            <th>License #</th>
            <th>Password</th>
            <th>Account Type</th>
            <th>Confirm</th>
          </tr>
        </thead>
        <tbody>
            {allUsers.map(user =>
                <UserRow key={user._id} userInfo={user}/>
            )}
        </tbody>
      </table>
    </>
  );
}
