import React from "react";
import "./StudHome.css";
import WelcomeAi from "../Ai/WelcomeAi";

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
        <h2>guess what!!</h2>
        <WelcomeAi />
      </div>
    </>
  );
}
