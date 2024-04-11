import React, { useState } from "react";
import "../styles/CreateUser.css";
import axios from "axios";
// @ts-ignore
import { ReactComponent as CloseModal } from "../svgs/close-square.svg";
import { storeCookies } from "../utils/CookieManager.ts";

export default function CreateUser(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState(""); // [street, city, state, zip
  const [contactNum, setContactNum] = useState("");
  const [dob, setDob] = useState("");
  const [license, setLicense] = useState("");
  const [password, setPassword] = useState("");

  const [errorVisibility, setErrorVisibility] = useState({
    name: false,
    email: false,
    dob: false,
    license: false,
    contactNum: false,
    password: false,
    status: false,
  });
  // False means that the errors will not show and true means they will show

  const emailRegEx = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"; // from chatGPT and tested
  const passwordRegEx =
    "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$";
  const phoneRegEx = "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";
  const maxDob = 20091231;
  const minDob = 19241231;

  function submitCheck() {
    setErrorVisibility((errorVisibility) => ({
      ...errorVisibility,
      name: fname.length < 2 || lname.length < 2,
    }));
    //First name and Last name cannot be less than 2 letters
    setErrorVisibility((errorVisibility) => ({
      ...errorVisibility,
      email: !RegExp(emailRegEx).test(email),
    }));

    let dobCompare = parseInt(dob.replace(/-/g, ""));

    setErrorVisibility((errorVisibility) => ({
      ...errorVisibility,
      dob: dobCompare >= minDob && dobCompare <= maxDob && dob.length != 10,
    }));
    //dob must be at least 15 years ago date out of range but also check if it is at least 2009
    setErrorVisibility((errorVisibility) => ({
      ...errorVisibility,
      password: !RegExp(passwordRegEx).test(password),
    }));
    setErrorVisibility((errorVisibility) => ({
      ...errorVisibility,
      license: license.length < 2,
    }));
    setErrorVisibility((errorVisibility) => ({
      ...errorVisibility,
      contactNum: !RegExp(phoneRegEx).test(contactNum),
    }));

    if (
      !errorVisibility.name &&
      !errorVisibility.password &&
      !errorVisibility.email &&
      !errorVisibility.dob &&
      !errorVisibility.license &&
      !errorVisibility.contactNum
    ) {
      submit();
    }
  }

  function submit() {
    const userData = {
      fname: fname,
      lname: lname,
      email: email,
      dob: dob,
      licenseNum: license,
      address: address,
      contactNum: contactNum,
      password: password,
      accType: "customer",
    };

    let status: number = 0;

    axios
      .post("http://localhost:8080/createUser", userData)
      .then((res) => {
        status = res.status;

        if (status == 200) {
          setErrorVisibility((errorVisibility) => ({
            ...errorVisibility,
            status: true,
          }));

          if (!props.isAdmin) {
            //Setting props to be read in the previous page, NavBar.tsx
            props.setUserInfo(res.data);
            storeCookies(
              "username",
              res.data.firstName + " " + res.data.lastName
            );
            storeCookies("userid", res.data._id);

            props.setIsLoggedIn(true);
          }
          props.toggleModal();
          window.location.reload();
        } else {
          setErrorVisibility((errorVisibility) => ({
            ...errorVisibility,
            status: false,
          }));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="createAccount">
      <div id="createAccountMainContent" className="mainContent">
        <CloseModal className="close" onClick={props.toggleModal} />
        <div className="rightContainer">
          <table>
            <tbody>
              <tr>
                <td className="fieldLabels">First name</td>
                <td className="fieldInputs">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    autoFocus
                    autoComplete="off"
                    onChange={(e) => setFname(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="fieldLabels">Last name</td>
                <td className="fieldInputs">
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    autoComplete="off"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="fieldLabels">Email</td>
                <td className="fieldInputs">
                  <input
                    type="text "
                    placeholder="Email"
                    required
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="fieldLabels">Date of birth</td>
                <td className="fieldInputs">
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    required
                    onChange={(e) => setDob(e.target.value)}
                    max="2009-12-31"
                  />
                </td>
              </tr>

              <tr>
                <td className="fieldLabels">License #</td>
                <td className="fieldInputs">
                  <input
                    type="text"
                    placeholder="License #"
                    required
                    onChange={(e) => setLicense(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="fieldLabels">Address</td>
                <td className="fieldInputs">
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="fieldLabels">Contact Number</td>
                <td className="fieldInputs">
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    required
                    onChange={(e) => setContactNum(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="fieldLabels">Password</td>
                <td className="fieldInputs">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p className={errorVisibility.name ? "errorVisible" : "error"}>
            {" "}
            Verify that your first and last name exceede 2 characters
          </p>
          <p className={errorVisibility.email ? "errorVisible" : "error"}>
            {" "}
            Verify that your email is in the correct format
          </p>
          <p className={errorVisibility.dob ? "errorVisible" : "error"}>
            {" "}
            Verify that your date of birth is between 1924 and 2009{" "}
          </p>
          <p className={errorVisibility.license ? "errorVisible" : "error"}>
            {" "}
            Verify that your license number is alphanumeric
          </p>
          <p className={errorVisibility.contactNum ? "errorVisible" : "error"}>
            {" "}
            Verify that your contact number is in the correct format
          </p>
          <p className={errorVisibility.password ? "errorVisible" : "error"}>
            {" "}
            Verify that your password meets the conditons
          </p>

          <ul className={errorVisibility.password ? "errorVisible" : "error"}>
            <li>At least 2 uppercase letters</li>
            <li>At least 1 special character [!@#$?..] </li>
            <li>At least 2 digits</li>
            <li>At least 3 lowercase letters</li>
            <li>At least a length of 8</li>
          </ul>

          <button className="submitButton" onClick={submitCheck}>
            Submit
          </button>
          <p className={errorVisibility.status ? "errorVisible" : "error"}>
            There has been an error creating your account
          </p>
        </div>
      </div>
    </div>
  );
}
