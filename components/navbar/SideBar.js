import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faUserPlus,
  faBuildingColumns,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar({ signUp, companyAccount }) {
  return (
    <>
      <div className="side-bar">
        {!companyAccount &&
          (signUp ? (
            <Link to="/get-started">
              <button>
                <FontAwesomeIcon icon={faUserPlus} /> sign up
              </button>
            </Link>
          ) : (
            <Link to="/log-in">
              <button>
                <FontAwesomeIcon icon={faSignIn} />
                log in
              </button>
            </Link>
          ))}
        {companyAccount && <NavLinks />}
      </div>
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
