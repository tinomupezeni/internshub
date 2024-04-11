import React from "react";
import UploadProjAi from "../Ai/UploadProjAi";
import Button from "react-bootstrap/Button";
import "./UploadProject.css";

export default function UploadProject() {
  return (
    <>
      <div className="upload-video">
        <div>
          <h2>upload project</h2>
          <p>
            please check out the guidelines below on key points to take note of
            in your video
          </p>
        </div>
        <UploadProjAi />
        <Button>understood, proceed</Button>
      </div>
    </>
  );
}
