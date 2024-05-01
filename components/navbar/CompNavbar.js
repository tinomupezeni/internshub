import React, { useState, useEffect, forwardRef, useRef } from "react";
import Logo from "../../assets/Logo Files/For Web/png/Color logo - no background.png";
import "./LoginNavbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBuildingColumns,
  faUserGraduate,
  faGears,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Server from "../Hero/Server";

export default function CompNavbar() {
  const [sideBar, setSideBar] = useState(false);
  const loggedInData = secureLocalStorage.getItem("loggedInData");
  let navigate = useNavigate();
  const userProfileRef = useRef(null);
  const navLinksRef = useRef(null);

  const handleIcon = () => {
    setSideBar(true);
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
          <div className="icon" onClick={handleIcon}>
            <i>
              <FontAwesomeIcon icon={faBars} />
            </i>
          </div>
          <div className="profile-error">
            <div className="profile" onClick={openSettings}>
              <span>{loggedInData.name && loggedInData.name[0]}</span>
            </div>
          </div>
        </div>
      </div>
      {settings && (
        <UserProfile
          loggedInData={loggedInData}
          ref={userProfileRef}
          logoutBtn={logoutBtn}
        />
      )}
      {sideBar && <NavLinks ref={navLinksRef} />}
    </>
  );
}

const UserProfile = forwardRef(({ loggedInData, logoutBtn }, ref) => {
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
          </div>
        </div>
        <div className="bottom">
          <Link to="/company-profile/profile-settings">
            <button>
              <FontAwesomeIcon icon={faGears} /> manage account
            </button>
          </Link>
        </div>
      </div>
    </>
  );
});

const NavLinks = forwardRef((props, ref) => {
  return (
    <>
      <div ref={ref} className="nav-links">
        <h4>explore</h4>
        <Link
          to="/company-potential-interns"
          style={{ textDecoration: "none" }}
        >
          <button>
            <FontAwesomeIcon icon={faUserGraduate} /> Interns
          </button>
        </Link>
        <Link to="/company-departments" style={{ textDecoration: "none" }}>
          <button>
            <FontAwesomeIcon icon={faBuildingColumns} /> departments
          </button>
        </Link>
      </div>
    </>
  );
});
