import React, { useState } from "react";
import Logo from "../../assets/Logo Files/For Web/png/Color logo - no background.png";
import "./Navbar.css";

export default function Navbar() {
  const [login, setLogIn] = useState(false);
  const [signup, setSignup] = useState(false);

  const loginbtn = () => {
    setLogIn(true);
    setSignup(false);
  };

  const signinbtn = () => {
    setSignup(true);
    setLogIn(false);
  };
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={Logo} />
        </div>
        <div className="btns">
          <button
            onClick={loginbtn}
            style={
              login
                ? { backgroundColor: "#333855", color: "#fff" }
                : { backgroundColor: "#fff" }
            }
          >
            log in
          </button>
          <button
            onClick={signinbtn}
            style={
              signup
                ? { backgroundColor: "#333855", color: "#fff" }
                : { backgroundColor: "#fff" }
            }
          >
            sign up
          </button>
        </div>
      </div>
    </>
  );
}
