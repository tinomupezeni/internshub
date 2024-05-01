import ProjectsAi from "../Ai/ProjectsAi";
import React, { useEffect, useState } from "react";
import VideoPlayer from "../../Hero/VideoPlayer";
import Server from "../../Hero/Server";
import "./Potfolio.css";

export default function AvailableProjs() {
  const [state, setState] = useState({
    projects: [],
  });

  useEffect(() => {
    Server.getstudentVideos().then((response) => {
      setState((prevState) => {
        return {
          ...prevState,
          projects: response.data.presigned_urls,
        };
      });
    });
  }, []);
  return (
    <>
      <div className="available-projects">
        <ProjectsAi />
        <MyProjects projects={state.projects} />
      </div>
    </>
  );
}

const MyProjects = ({ projects }) => {
  return (
    <>
      <div className="interns">
        <div className="interns-data">
          {projects.length > 0 ? (
            projects.map((intern, index) => (
              <ul>
                <div key={index} className="intern-video ">
                  <div className="video">
                    <VideoPlayer link={intern.url} />
                  </div>
                  <div className="video-info card-footer">
                    <div>
                      <h4>{intern.project_name}</h4>
                      <p className="card-text">{intern.description}</p>
                    </div>
                  </div>
                </div>
              </ul>
            ))
          ) : (
            <div className="intern">
              <p>No projects found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
