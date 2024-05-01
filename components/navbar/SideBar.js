import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faUserPlus,
  faUserGraduate,
  faBook,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar({ signUp, companyAccount }) {
  const [state, setState] = useState({
    signUpBool: signUp,
    companyAccountBool: companyAccount,
  });
  const closeSideBar = () => {
    setState((prevState) => {
      return { ...prevState, signUpBool: false, companyAccountBool: false };
    });
  };
  return (
    <>
      <div className="side-bar">
        <div className="side-bar-heading">
          <h4>explore</h4>
          <i onClick={closeSideBar}>
            <FontAwesomeIcon icon={faClose} />
          </i>
        </div>
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
        <Link to="/company-departments" style={{ textDecoration: "none" }}>
          <button>
            <FontAwesomeIcon icon={faBook} /> Departments
          </button>
        </Link>
        <Link
          to="/company-potential-interns"
          style={{ textDecoration: "none" }}
        >
          <button>
            <FontAwesomeIcon icon={faUserGraduate} /> Interns
          </button>
        </Link>
      </div>
    </>
  );
};
