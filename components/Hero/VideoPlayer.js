// YoutubeEmbed.js
import React from "react";

const VideoPlayer = ({ link }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={link}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded YouTube Video"
    />
  </div>
);

export default VideoPlayer;
