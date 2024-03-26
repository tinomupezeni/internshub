import React, { useState } from "react";
import "./Welcome.css";
import logo from "../../assets/Logo Files/For Web/png/Color logo - no background.png";
import Login from "../login/Login";
import Signup from "../login/Signup";

export default function Welcome() {
  const [login, setLogIn] = useState(false);
  const [signup, setSignup] = useState(false);
  const [hometext, setHometext] = useState(true);

  const loginbtn = () => {
    setLogIn(true);
    setSignup(false);
    setHometext(false);
  };

  const signinbtn = () => {
    setSignup(true);
    setLogIn(false);
    setHometext(false);
  };
  return (
    <>
      <div className="welcome">
        <div className="welcome-logo">
          <img src={logo} alt="" />
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
        <p>Welcome to Interns Hub </p>
        {hometext ? (
          <Hometext />
        ) : (
          (login && <Login />) || (signup && <Signup />)
        )}
      </div>
    </>
  );
}

const Hometext = ({}) => {
  return (
    <div className="bk-image">
      <div className="home-text">
        <p>
          Your journey to professional growth starts here. As an intern, you can
          craft a standout CV and display your projects, shining a spotlight on
          your skills for potential employers.
          <br />
          Employers, get ready to discover your next star employee among our
          talented pool of interns. Interns Hub is where ambitions align and
          opportunities unfold.
          <br /> Let's build the future together!
        </p>
      </div>
    </div>
  );
};
