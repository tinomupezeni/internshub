import React, { useState, useEffect, useRef, forwardRef } from "react";
import Logo from "../../assets/Logo Files/For Web/png/Color logo - no background.png";
import "./LoginNavbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faComments,
  faUserCircle,
  faGears,
  faBook,
  faHome,
  faUpload,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Ai from "../Student/Ai/Ai";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Server from "../Hero/Server";

export default function StudentCvNav() {
  const [aiChat, setAiChat] = useState(false);
  const userProfileRef = useRef(null);
  const navLinksRef = useRef(null);

  const studentProfileData = secureLocalStorage.getItem("studentProfileData");
  const loggedInData = secureLocalStorage.getItem("loggedInData");
  let navigate = useNavigate();

  const handleAi = () => {
    setAiChat(true);
  };

  const closeAi = () => {
    setAiChat(false);
  };
  const [sideBar, setSideBar] = useState(false);

  const openSideBar = () => {
    setSideBar(!sideBar);
  };

  const [settings, setSettings] = useState(false);

  const openSettings = () => {
    setSettings(!settings);
  };

  const logoutBtn = () => {
    Server.logout().then(
      () => {
        navigate("/log-in");
        secureLocalStorage.clear();
      },
      (error) => {
        navigate("/log-in");
        secureLocalStorage.clear();
      }
    );
  };

  useEffect(() => {
    if (!loggedInData || !studentProfileData) {
      navigate("/log-in");
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settings &&
        userProfileRef.current &&
        !userProfileRef.current.contains(event.target)
      ) {
        setSettings(false);
      }

      if (
        sideBar &&
        navLinksRef.current &&
        !navLinksRef.current.contains(event.target)
      ) {
        setSideBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settings, sideBar]);

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
          <div className="icon" onClick={openSideBar}>
            <i>
              <FontAwesomeIcon icon={faBars} />
            </i>
          </div>
          <div className="profile-error">
            <div className="profile" onClick={openSettings}>
              <span>{loggedInData.name && loggedInData.name[0]}</span>
            </div>
            {(!studentProfileData.student_profile.program ||
              !studentProfileData.student_profile.introduction ||
              !studentProfileData.student_profile.department ||
              !studentProfileData.student_profile.institution) && (
              <div className="red-dot"></div>
            )}
          </div>
        </div>
      </div>
      {settings && (
        <UserProfile
          studentProfileData={studentProfileData}
          loggedInData={loggedInData}
          ref={userProfileRef}
          logoutBtn={logoutBtn}
        />
      )}
      {sideBar && <NavLinks ref={navLinksRef} />}
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

const UserProfile = forwardRef(
  ({ studentProfileData, loggedInData, logoutBtn }, ref) => {
    return (
      <>
        <div ref={ref} className="userprofile">
          <div className="top">
            <img src={Logo} />
            <button onClick={logoutBtn}>sign out</button>
          </div>
          <div className="middle">
            <i>
              <FontAwesomeIcon icon={faUserCircle} />
            </i>
            <div>
              <h3>{loggedInData.name}</h3>
              <p>{loggedInData.email}</p>
              <p>{studentProfileData.student_profile.program}</p>
            </div>
          </div>
          <div className="bottom">
            <Link to="/student-profile/profile-settings">
              <button>
                <div className="profile-error">
                  <FontAwesomeIcon icon={faGears} /> manage account
                  {(!studentProfileData.student_profile.program ||
                    !studentProfileData.student_profile.introduction ||
                    !studentProfileData.student_profile.department ||
                    !studentProfileData.student_profile.institution) && (
                    <div className="red-dot"></div>
                  )}
                </div>
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
);

const NavLinks = forwardRef((props, ref) => {
  return (
    <>
      <div ref={ref} className="nav-links">
        <h4>explore</h4>
        <Link to="/student-home" style={{ textDecoration: "none" }}>
          <button>
            <FontAwesomeIcon icon={faHome} /> home
          </button>
        </Link>
        <Link
          to="/student-profile/cv-builder"
          style={{ textDecoration: "none" }}
        >
          <button>
            <FontAwesomeIcon icon={faBook} /> resume
          </button>
        </Link>
        <Link
          to="/student-profile/upload-project"
          style={{ textDecoration: "none" }}
        >
          <button>
            <FontAwesomeIcon icon={faUpload} /> upload project
          </button>
        </Link>
        <Link
          to="/student-profile/recruiting-companies"
          style={{ textDecoration: "none" }}
        >
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} /> recruiting companies
          </button>
        </Link>
      </div>
    </>
  );
});
