import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ModifyUsers.css";
import "../styles/CreateUser.css";
import Navbar from "../components/Navbar/navbar";
import "../components/Navbar/navbar.css";
import CreateUser from "./CreateUser.tsx";

export default function ModifyUsers() {
  type user = {
    accType: string;
    email: string;
    firstName: string;
    hashedPass: string;
    lastName: string;
    __v: string;
    _id: string;
    licenseNum: string;
    address: string;
    contactNum: string;
    dob: string;
    newPass: string;
  };

  const [allUsers, setAllUsers] = useState<user[]>([]);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  function pageTitle() {
    return <title>Modify Users</title>;
  }

  function deleteUser(userInfo) {
    axios
      .delete("http://localhost:8080/users/" + userInfo._id)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleSubmit(event: React.FormEvent, newUserInfo) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/updateUser", newUserInfo)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function toggleCreateUserModal() {
    setCreateUserModal(!createUserModal);
  }

  function UserRow({ userInfo }) {
    userInfo.newPass = "";
    let updatedUserInfo: user = userInfo;

    return (
      <>
        <tr>
          <td className="hiddenForm">
            <form
              id={userInfo._id}
              onSubmit={(e) => handleSubmit(e, updatedUserInfo)}
            />
          </td>
          <td className="fieldInputs">
            <input
              type="text"
              placeholder={userInfo.firstName}
              className="inputBoxes"
              form={userInfo._id}
              name="firstName"
              onChange={(e) => (updatedUserInfo.firstName = e.target.value)}
              autoComplete="off"
            />
          </td>
          <td className="fieldInputs">
            <input
              type="text"
              placeholder={userInfo.lastName}
              className="inputBoxes"
              form={userInfo._id}
              name="lastName"
              onChange={(e) => (updatedUserInfo.lastName = e.target.value)}
              autoComplete="off"
            />
          </td>
          <td className="fieldInputs">
            <input
              type="text"
              placeholder={userInfo.email}
              className="inputBoxes"
              form={userInfo._id}
              name="email"
              onChange={(e) => (updatedUserInfo.email = e.target.value)}
              autoComplete="off"
            />
          </td>
          <td className="fieldInputs">
            <input
              type="text"
              placeholder={userInfo.dob}
              className="inputBoxes"
              form={userInfo._id}
              name="dob"
              onChange={(e) => (updatedUserInfo.dob = e.target.value)}
              autoComplete="off"
            />
          </td>
          <td className="fieldInputs">
            <input
              type="text"
              placeholder={userInfo.licenseNum}
              className="inputBoxes"
              form={userInfo._id}
              name="licenseNum"
              onChange={(e) => (updatedUserInfo.licenseNum = e.target.value)}
              autoComplete="off"
            />
          </td>
          <td className="fieldInputs">
            <input
              type="text"
              placeholder={userInfo.address}
              className="inputBoxes"
              form={userInfo._id}
              name="address"
              onChange={(e) => (updatedUserInfo.address = e.target.value)}
              autoComplete="off"
            />
          </td>
          <td className="fieldInputs">
            <input
              type="tel"
              placeholder={userInfo.contactNum}
              className="inputBoxes"
              form={userInfo._id}
              name="contactNum"
              onChange={(e) => (updatedUserInfo.contactNum = e.target.value)}
              autoComplete="off"
            />
          </td>
          <td className="fieldInputs">
            <input
              type="text"
              placeholder="Enter a new password"
              className="inputBoxes"
              form={userInfo._id}
              name="password"
              onChange={(e) => (updatedUserInfo.newPass = e.target.value)}
              autoComplete="off"
            />
          </td>
          <td className="fieldInputs">
            <select
              className="fieldInputs"
              onChange={(e) => {
                updatedUserInfo.accType = e.target.value;
              }}
              form={userInfo._id}
              defaultValue={userInfo.accType}
            >
              <option value="admin">Admin</option>
              <option value="csr">Customer Service Rep</option>
              <option value="customer">Regular Customer</option>
            </select>
          </td>
          <td className="confirmation">
            <input
              type="submit"
              className="submitButton"
              id="updateButton"
              form={userInfo._id}
              value="Update"
            />
            <button
              className="submitButton"
              id="deleteButton"
              form={userInfo._id}
              onClick={() => deleteUser(userInfo)}
            >
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => {
        if (res.status === 200) {
          setAllUsers(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {pageTitle()}
      <h1>{document.title}</h1>
      <button className="LogBtn" onClick={toggleCreateUserModal}>
        Create Account
      </button>
      <table className="userTable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of birth</th>
            <th>License #</th>
            <th>Address</th>
            <th>Contact #</th>
            <th>New Password</th>
            <th>Account Type</th>
            <th>Confirm</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <UserRow key={user._id} userInfo={user} />
          ))}
        </tbody>
      </table>

      {createUserModal && (
        <>
          <div className="overlay" onClick={toggleCreateUserModal} />
          <div className="modal-content2">
            <CreateUser toggleModal={toggleCreateUserModal} isAdmin={true} />
          </div>
        </>
      )}
    </>
  );
}
