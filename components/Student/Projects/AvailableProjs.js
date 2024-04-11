import ProjectsAi from "../Ai/ProjectsAi";
import React, { useState } from "react";
import InternsData from "../../Company/InternsData";
import VideoPlayer from "../../Hero/VideoPlayer";

export default function AvailableProjs() {
  return (
    <>
      <div className="available-projects">
        <h2>projects you might be interested in doing</h2>
        <ProjectsAi />
        <MyProjects />
      </div>
    </>
  );
}

const MyProjects = () => {
  return (
    <>
      <div className="interns">
        <div className="interns-data">
          <div>
            {InternsData.length > 0 ? (
              InternsData.map((intern, index) => (
                <div key={index} className="intern">
                  <div className="video">
                    <VideoPlayer link="https://www.youtube.com/watch?v=gqI9MB221kw" />
                  </div>
                  <div className="video-info">
                    <div>
                      <h4>e-commerce website</h4>
                      <p>{intern.occupation}</p>
                    </div>
                    <div>
                      <p>{intern.education}</p>
                      <p>{intern.phone}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="intern">
                <p>No projects found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
