import React from "react";
import ReactPlayer from "react-player";
import "../Company/Interns.css";

function VideoPlayer({ link }) {
  return (
    
      <ReactPlayer
        url={link}
        className="react-player"
        width="100%"
        height="100%" 
      />
  );
}

export default VideoPlayer;
