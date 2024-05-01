// YoutubeEmbed.js
import React from "react";

const VideoPlayer = ({ link }) => (
  <div className="video-responsive">
    <iframe
      src={link}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ border: 'none' }} 
    />
  </div>
);

export default VideoPlayer;
