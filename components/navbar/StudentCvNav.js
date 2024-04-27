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
  faUserCircle,
  faUser,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import Ai from "../Student/Ai/Ai";
import InternsSideBar from "./InternsSideBar";
import { useNavigate } from "react-router-dom";

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

  const [settings, setSettings] = useState(false);

  const openSettings = () => {
    setSettings(!settings);
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
          <button onClick={handleAi} className="ai-btn">
            <FontAwesomeIcon icon={faComments} /> ai chat
          </button>
          <div className="icon" onClick={handleIcon}>
            <i>
              <FontAwesomeIcon icon={faBars} />
            </i>
          </div>
          <div className="profile-error">
            <div className="profile" onClick={openSettings}>
              <span>t</span>
            </div>
            <div className="red-dot"></div>
          </div>
        </div>
      </div>
      {settings && <UserProfile />}
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

const UserProfile = () => {
  return (
    <>
      <div className="userprofile">
        <div className="top">
          <img src={Logo} />
          <button>sign out</button>
        </div>
        <div className="middle">
          <i>
            <FontAwesomeIcon icon={faUserCircle} />
          </i>
          <div>
            <h3>Tinotenda</h3>
            <p>emailsnsjsjnjwnjs@mdk.com</p>
            <p>software engineer</p>
          </div>
        </div>
        <div className="bottom">
          <Link to="/student-profile/profile-settings">
            <button>
              <div className="profile-error">
                <FontAwesomeIcon icon={faGears} /> manage account
                <div className="red-dot"></div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
