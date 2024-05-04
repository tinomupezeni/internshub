import React, { useEffect, useState } from "react";
import "./Ai.css";
import Server from "../../Hero/Server";
import secureLocalStorage from "react-secure-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleRight,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";

const ProjectsAi = () => {
  const [proj, setProjects] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    setErrorMsg(null);
    setProjects([]);
    Server.getstudentAiProjects().then(
      (response) => {
        setProjects(response.data);
        setIsLoading(false);
        setErrorMsg(null);
      },
      (error) => {
        setErrorMsg("something went wrong, retrying...");
        setIsLoading(false);
        fetchData();
      }
    );
  };

  // const proj = secureLocalStorage.getItem("projects");

  useEffect(fetchData, []);

  return (
    <div className="projects-ai">
      <div>
        {errorMsg && (
          <p className="alert alert-danger" role="alert">
            {errorMsg}
          </p>
        )}

        {proj && (
          <ul>
            <p className="alert alert-info text-center" role="alert">
              projects that can make you shine
            </p>
            {isLoading && (
              <div
                style={{
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  class="d-flex justify-content-center align-items-center"
                >
                  <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{ width: "2rem", height: "2rem" }}
                  >
                    <span class="visually-hidden"></span>
                  </div>
                </div>
                <p>
                  <b>generating projects...</b>
                </p>
              </div>
            )}
            {proj.map((project) => {
              return <li>{project.project}</li>;
            })}
            <Button
              style={{ margin: "0 auto", width: "100%" }}
              onClick={fetchData}
            >
              refresh <FontAwesomeIcon icon={faSync} />
            </Button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectsAi;
