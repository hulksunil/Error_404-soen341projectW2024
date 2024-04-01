import React, { useState } from "react";
import "./styles/CreateUser.css";
import axios from "axios";
// @ts-ignore
import { ReactComponent as CloseModal } from "./svgs/close-square.svg";
import { storeCookies } from './CookieManager.ts';

export default function LogIn(props) {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [incorrect, setIncorrect] = useState(false);
  const [emailErrorVisibility, setEmailErrorVisibility] = useState(false);

  const emailRegEx = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";

  function submitCheck() {
    setEmailErrorVisibility(!RegExp(emailRegEx).test(userData.email));
    if (!emailErrorVisibility) {
      submit()
    }
  }

  function submit() {
    const passedUserData = {
      email: userData.email,
      password: userData.password,
    };

    axios
      .post("http://localhost:8080/findUserByEmail", passedUserData)
      .then((res) => {

        if (!res.data.ERROR && res.status === 200) {
          setIncorrect(false);

          //Setting props to be read in the previous page, NavBar.tsx
          props.setUserInfo(res.data);

          storeCookies("username", res.data.firstName + " " + res.data.lastName);
          storeCookies("userid", res.data._id);

          console.log(res.data);

          props.setIsLoggedIn(true);
          props.toggleModal();
          window.location.reload();

        } else {
          setIncorrect(true)
          props.setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="mainContent">
      <CloseModal className="close" onClick={props.toggleModal} />
      <div className="rightContainer">
        <table>
          <tbody>
            <tr>
              <td className="fieldLabels">Email</td>
              <td className="fieldInputs">
                <input
                  type="text "
                  placeholder="Email"
                  required
                  autoComplete="on"
                  onChange={(e) =>
                    setUserData((userData) => ({
                      ...userData,
                      email: e.target.value,
                    }))
                  }
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
                  onChange={(e) =>
                    setUserData((userData) => ({
                      ...userData,
                      password: e.target.value,
                    }))
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button className="submitButton" onClick={submitCheck}>
          Submit
        </button>

        <p className={incorrect ? "errorVisible" : "error"}>
          The email and/or password is incorrect
        </p>
        <p className={emailErrorVisibility ? "errorVisible" : "error"}>
          {" "}
          Verify that your email is in the correct format
        </p>
      </div>
    </div>
  );
}
