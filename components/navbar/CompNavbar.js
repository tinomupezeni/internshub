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
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "./SideBar";

export default function CompNavbar() {
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
        <div className="icon-links">
          {windowWidth > 850 ? (
            <>
              <div className="links">
                <NavLinks windowWidth={windowWidth} />
                <div className="login-out-btn">
                  <button>
                    log out <FontAwesomeIcon icon={faSignOut} />
                  </button>
                </div>
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
        </div>
      </div>
      {toggleIcon && windowWidth < 850 && <SideBar companyAccount={true} />}
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