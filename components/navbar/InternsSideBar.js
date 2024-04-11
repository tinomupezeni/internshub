import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faBook,
  faHome,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

export default function InternsSideBar() {
  return (
    <>
      <NavLinks />
    </>
  );
}
const NavLinks = ({}) => {
  return (
    <>
      <div className="nav-links">
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
        <Link to="/student-profile/projects" style={{ textDecoration: "none" }}>
          <button>
            <FontAwesomeIcon icon={faUserGraduate} /> my projects
          </button>
        </Link>
      </div>
    </>
  );
};
