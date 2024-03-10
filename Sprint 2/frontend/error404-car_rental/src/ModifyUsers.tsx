import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/ModifyUsers.css";
import "./styles/CreateUser.css";
import Navbar from "./components/Navbar/navbar";
import "./components/Navbar/navbar.css"

export default function ModifyUsers() {
    type user = {
        accType: string,
        email: string,
        firstName: string,
        hashedPass: string,
        lastName: string,
        __v: string,
        _id: string
    }

    const [allUsers, setAllUsers] = useState<user[]>([]);

    function pageTitle() {
        return <title>Modify Users</title>;
    }

    function updateUser(userInfo) {
        console.log(userInfo)
    }

    function deleteUser(userInfo) {
        axios
            .delete("http://localhost:8080/users/" + userInfo._id)
            .then((res) => {
                if (res.status === 200) {
                    // location.reload();
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function handleSubmit(event: React.FormEvent, newUserInfo) {
        event.preventDefault();
        console.log(newUserInfo);
        axios.post("http://localhost:8080/updateUser", newUserInfo)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            })
    }

    function UserRow({ userInfo }) {

        let updatedUserInfo: user = userInfo;
        console.log(updatedUserInfo)

        return (
            <>
                <tr>
                    <td className="hiddenForm"><form id={userInfo._id} onSubmit={(e) => handleSubmit(e, updatedUserInfo)} /></td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={userInfo.firstName} className="inputBoxes" form={userInfo._id} name="firstName" onChange={(e) => updatedUserInfo.firstName = e.target.value} />
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={userInfo.lastName} className="inputBoxes" form={userInfo._id} name="lastName" onChange={(e) => updatedUserInfo.lastName = e.target.value} />
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={userInfo.email} className="inputBoxes" form={userInfo._id} name="email" onChange={(e) => updatedUserInfo.email = e.target.value} />
                    </td>
                    <td className="fieldInputs">
                        <input type="text" className="inputBoxes" form={userInfo._id} /> {/*Date of birth*/}
                    </td>
                    <td className="fieldInputs">
                        <input type="text" className="inputBoxes" form={userInfo._id} /> {/*License*/}
                    </td>
                    <td className="fieldInputs">
                        <input type="text" placeholder={userInfo.hashedPass} className="inputBoxes" form={userInfo._id} name="password" onChange={(e) => updatedUserInfo.hashedPass = e.target.value} />
                    </td>
                    <td className="fieldInputs">
                        <select
                            className="fieldInputs"
                            onChange={(e) => {
                                updatedUserInfo.accType = e.target.value;
                            }}
                            form={userInfo._id}
                            defaultValue={userInfo.accType}>
                            <option value="admin">Admin</option>
                            <option value="csr">Customer Service Rep</option>
                            <option value="customer">Regular Customer</option>
                        </select>
                    </td>
                    <td className="confirmation">
                        <input type="submit" className="submitButton" id="updateButton" form={userInfo._id} value="Update" />
                        <button className="submitButton" id="deleteButton" form={userInfo._id} onClick={() => deleteUser(userInfo)}>Delete</button>
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
            <Navbar />
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
                        <UserRow key={user._id} userInfo={user} />
                    )}
                </tbody>
            </table>
        </>
    );
}
