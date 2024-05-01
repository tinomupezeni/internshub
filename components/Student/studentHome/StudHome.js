import React, { useState } from "react";
import "./StudHome.css";
import WelcomeAi from "../Ai/WelcomeAi";
import { Link } from "react-router-dom";
import AvailableProjs from "../Projects/AvailableProjs";
import Button from "react-bootstrap/esm/Button";

export default function StudHome() {

  return (
    <>
      <div className="stud-welcome">
        <div className="stud-welcome-text">
          <h1>Welcome to your portfolio</h1>
          <p>
            Here, you can showcase your projects, achievements, and experiences.
            Upload your CV, share your work, and let your talent shine!
          </p>
        </div>
        <AvailableProjs />
        <Link to="/student-profile/upload-project">
          <Button className="upload-btn">upload</Button>
        </Link>
      </div>
    </>
  );
}
