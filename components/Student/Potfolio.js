import React, { useState } from "react";
import "./Potfolio.css";
import AvailableProjs from "./AvailableProjs";
import UploadProject from "./UploadProject";

export default function Potfolio() {
  const [state, setState] = useState({ addProject: false });

  const addProjectBtn = () => {
    setState((prevState) => {
      return { ...prevState, addProject: !prevState.addProject };
    });
  };
  return (
    <>
      <div className="potfolio">
        <h3>my potfolio</h3>
        {!state.addProject && <AvailableProjs />}
        {state.addProject && <UploadProject />}
        <button onClick={addProjectBtn}>
          {state.addProject ? "view projects" : "add project"}
        </button>
      </div>
    </>
  );
}
