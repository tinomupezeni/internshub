import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo Files/For Web/png/Color logo - no background.png";
import "./LoginNavbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSignOut,
  faBuildingColumns,
  faUserGraduate,
  faClose,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import Ai from "../Student/Ai/Ai";
import InternsSideBar from "./InternsSideBar";

export default function StudentCvNav() {
  const [aiChat, setAiChat] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [toggleIcon, setToggleIcon] = useState(false);

  const handleIcon = () => {
    setToggleIcon(true);
  };

  const handleAi = () => {
    setAiChat(true);
  };

  const closeAi = () => {
    setAiChat(false);
  };

  const closeSideBar = () => {
    setToggleIcon(false);
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
        <div className="icon-links">
          {windowWidth > 850 ? (
            <>
              <div className="links">
                <NavLinks windowWidth={windowWidth} />
              </div>
            </>
          ) : (
            <>
              <div className="icon">
                <i onClick={handleIcon}>
                  <FontAwesomeIcon icon={faBars} />
                </i>
              </div>
            </>
          )}
          <button onClick={handleAi} className="ai-btn">
            <FontAwesomeIcon icon={faComments} /> ai chat
          </button>
        </div>
      </div>
      {toggleIcon && windowWidth < 850 && (
        <>
          <div className="side-bar">
            <div className="side-bar-heading">
              <h4>explore</h4>
              <i onClick={closeSideBar}>
                <FontAwesomeIcon icon={faClose} />
              </i>
            </div>
            <InternsSideBar />
          </div>
        </>
      )}
      {aiChat && (
        <div className="ai-cont">
          <div className="ai-heading">
            <h3>max the manager</h3>
            <i onClick={closeAi}>
              <FontAwesomeIcon icon={faClose} />
            </i>
          </div>
          <Ai />
        </div>
      )}
    </>
  );
}

const NavLinks = ({ windowWidth }) => {
  return (
    <>
      <div className="nav-links">
        <ul>
          {windowWidth < 850 && (
            <Link to="/">
              <div className="login-out-btn">
                <button>
                  log out <FontAwesomeIcon icon={faSignOut} />
                </button>
              </div>
            </Link>
          )}
          <Link to="/company-departments">
            <li>
              <FontAwesomeIcon icon={faBuildingColumns} /> departments
            </li>
          </Link>
          <Link to="/company-potential-interns">
            <li>
              <FontAwesomeIcon icon={faUserGraduate} /> Interns
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};
