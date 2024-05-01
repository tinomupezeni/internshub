import React, { useEffect, useState } from "react";
import "./InternPotfolio.css";
import Server from "../Hero/Server";
import VideoPlayer from "../Hero/VideoPlayer";
import secureLocalStorage from "react-secure-storage";

export default function InternPotfolio() {
  const [state, setState] = useState({
    projects: {},
  });

  useEffect(() => {
    const id = secureLocalStorage.getItem("studentId");
    Server.getInternPotfolio(id).then((response) => {
      console.log(response);
      setState((prevState) => {
        return {
          ...prevState,
          projects: response.data,
        };
      });
    });
  }, []);
  return (
    <>
      <div className="intern-potfolio">
        <h1>
          {state.projects.name} {state.projects.surname}
        </h1>
        <p>
          <a
            href={`mailto:${state.projects.email}`}
            style={{ textTransform: "lowercase" }}
          >
            {state.projects.email}
          </a>
        </p>
        <div className="card">
          <div className="card-body">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                src={state.projects.cv}
                width="100%"
                height="500px"
                title="Intern CV"
              />
            </div>
          </div>
        </div>
        <div className="available-projects">
          <h2>projects</h2>
          <MyProjects projects={state.projects.student_projects} />
        </div>
      </div>
    </>
  );
}

const MyProjects = ({ projects }) => {
  return (
    <>
      <div className="interns">
        <div className="interns-data">
          {projects ? (
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
