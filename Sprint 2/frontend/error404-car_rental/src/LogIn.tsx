import React, { useState } from "react";
import "./styles/CreateUser.css";
import "./styles/LogIn.css";
import axios from "axios";
// @ts-ignore
import { ReactComponent as CloseModal } from "./svgs/close-square.svg";

export default function LogIn(props) {
  const [userData, setUserData] = useState({ email: "", password: "",accType:"" });
  const [incorrect, setIncorrect] = useState(false);
  const [emailErrorVisibility, setEmailErrorVisibility] = useState(false);

  const emailRegEx = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";

  function submitCheck() {
    setEmailErrorVisibility(!RegExp(emailRegEx).test(userData.email));
    if(!emailErrorVisibility){
        submit()
    }
    else{

    }
  }

  function submit() {
    const passedUserData = {
      email: userData.email,
      password: userData.password,
    };

    let status: number = 0;

    axios
      .post("http://localhost:8080/findUserByEmail", passedUserData)
      .then((res) => {
        status = res.status;

        if (!res.data.ERROR) {
            setIncorrect(false);

          //Setting props to be read in the previous page, NavBar.tsx
          props.setUserInfo({
            fname: res.data.fname,
            lname: res.data.lname,
            // userColor: color,
            accType: res.data.accType
          });

          props.setIsLoggedIn(true);
          props.toggleModal();

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
    <div className="mainContent" id="signin">
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
