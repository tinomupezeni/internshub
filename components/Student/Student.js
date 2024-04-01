import React, { useState, useEffect } from "react";
import "./Student.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faFileText,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import CV from "./CV";
import Potfolio from "./Potfolio";

export default function Student() {
  const [state, setState] = useState({
    showDashboard: false,
    showProjects: true,
    showCv: false,
    showCompanies: false,
    showDashboard: false,
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const openCv = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showCv: true,
        showProjects: false,
        showCompanies: false,
        showDashboard: false,
      };
    });
  };
  const openProjects = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showCv: false,
        showProjects: true,
        showCompanies: false,
        showDashboard: false,
      };
    });
  };
  const openCompanies = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showCv: false,
        showProjects: false,
        showCompanies: true,
        showDashboard: false,
      };
    });
  };

  const openDashboard = () => {
    setState((prevState) => ({
      ...prevState,
      showDashboard: true,
    }));
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <p className="more-icon" onClick={openDashboard}>
        menu
      </p>
      <div
        className={`student ${state.showDashboard ? "show-dash" : "hide-dash"}`}
      >
        {windowWidth > 400 ? (
          <Dashboard
            openCompanies={openCompanies}
            openCv={openCv}
            openProjects={openProjects}
          />
        ) : (
          state.showDashboard && (
            <Dashboard
              openCompanies={openCompanies}
              openCv={openCv}
              openProjects={openProjects}
            />
          )
        )}
        <div className="student-profile">
          {state.showProjects && <Potfolio />}
          {state.showCv && <CV />}
          {state.showCompanies && <Companies />}
        </div>
      </div>
    </>
  );
}

const Dashboard = ({ openCompanies, openCv, openProjects }) => {
  return (
    <>
      <div className="dashboard">
        <ul>
          <li onClick={openProjects}>
            <i>
              <FontAwesomeIcon icon={faTasks} />
            </i>
            <span className="text">projects</span>
          </li>
          <li onClick={openCv}>
            <i>
              <FontAwesomeIcon icon={faFileText} />
            </i>
            <span className="text">my CV</span>
          </li>
          <li onClick={openCompanies}>
            <i>
              <FontAwesomeIcon icon={faBriefcase} />
            </i>
            <span className="text">recruiting companies</span>
          </li>
        </ul>
      </div>
    </>
  );
};

const Companies = ({}) => {
  return (
    <>
      <div className="cv">
        <h3>recruiting companies in your field</h3>
      </div>
    </>
  );
};
