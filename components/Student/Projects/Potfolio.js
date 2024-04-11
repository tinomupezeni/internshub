import React from "react";
import { Link } from "react-router-dom";
import "./Potfolio.css";
import AvailableProjs from "./AvailableProjs";

export default function Potfolio() {
  return (
    <>
      <div className="potfolio">
        <h1>my potfolio</h1>
        <AvailableProjs />
        <Link to="/student-profile/upload-project">
          <button>upload project</button>
        </Link>
      </div>
    </>
  );
}
