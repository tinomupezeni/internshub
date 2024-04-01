import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo Files/For Web/png/Color logo - no background.png";
import "./LoginNavbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideBar from "./SideBar";

export default function SignupNavbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [toggleIcon, setToggleIcon] = useState(false);

  const handleIcon = () => {
    setToggleIcon(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="login-navbar">
        <div className="logo">
          <img src={Logo} />
        </div>
        {windowWidth > 400 ? (
          <div className="btn">
            <p>no account yet ?</p>{" "}
            <Link to="/get-started">
              <button>sign up</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="icon">
              <i onClick={handleIcon}>
                <FontAwesomeIcon icon={faBars} />
              </i>
            </div>
          </>
        )}
      </div>
      {toggleIcon && <SideBar signUp={true}/>}
    </>
  );
}
