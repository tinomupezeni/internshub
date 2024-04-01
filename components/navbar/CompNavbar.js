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
  const [state, setState] = useState({
    showDashboard: false,
    showCompProfile: true,
    showInterns: false,
  });
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
              <NavLinks />
              <div className="login-out-btn">
                <button>
                  log out <FontAwesomeIcon icon={faSignOut} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="login-out-btn">
                <button>
                  log out <FontAwesomeIcon icon={faSignOut} />
                </button>
              </div>
              <div className="icon">
                <i onClick={handleIcon}>
                  <FontAwesomeIcon icon={faBars} />
                </i>
              </div>
            </>
          )}
        </div>
      </div>
      {toggleIcon && <SideBar companyAccount={true} />}
    </>
  );
}

const NavLinks = ({}) => {
  return (
    <>
      <div className="nav-links">
        <ul>
          <Link to="/company-departments">
            <li>
              <i>
                <FontAwesomeIcon icon={faBuildingColumns} />
              </i>{" "}
              departments
            </li>
          </Link>
          <Link to="/company-potential-interns">
            <li>
              <i>
                <FontAwesomeIcon icon={faUserGraduate} />
              </i>{" "}
              interns
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};
