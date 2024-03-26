import React, { useState } from "react";
import "./Student.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faFileText,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import CVData from "./CVData";

export default function Student() {
  const [state, setState] = useState({
    showDashboard: false,
    showProjects: false,
    showCv: true,
    showCompanies: false,
  });

  const openCv = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showCv: true,
        showProjects: false,
        showCompanies: false,
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
      };
    });
  };
  return (
    <>
      <div className="student">
        <Dashboard
          openCompanies={openCompanies}
          openCv={openCv}
          openProjects={openProjects}
        />
        <div className="student-profile">
          {state.showProjects && <Projects />}
          {state.showCv && <CV CVData={CVData} />}
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

const Projects = ({}) => {
  return (
    <>
      <div className="projects">
        <h3>my potfolio</h3>
      </div>
    </>
  );
};

const CV = ({ CVData }) => {
  return (
    <>
      <div className="cv">
        <h3>my cv</h3>
        <div className="cv-document">
          <div className="right-temp">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input placeholder={CVData.fullName} style={{fontSize: '3rem'}} />
              <input placeholder={CVData.programOfStudy} />
              <textarea placeholder={CVData.briefIntroduction} />
            </div>
            {CVData.qualities.map((quality, ind) => (
              <input placeholder={quality} key={ind} />
            ))}
            {CVData.languagesSpoken.map((lang, ind) => (
              <input placeholder={lang} key={ind} />
            ))}
            {CVData.references.map((ref, ind) => (
              <>
                <input placeholder={ref.name} />
                <input placeholder={ref.relation} />
                <input placeholder={ref.contact} />
              </>
            ))}
          </div>
          <div className="left-temp">
            <input placeholder={CVData.objective} />
            <h4>personal Information</h4>
            <input placeholder={CVData.personalInformation.email} />
            <input placeholder={CVData.personalInformation.cell} />
            <input placeholder={CVData.personalInformation.address} />
            <input placeholder={CVData.personalInformation.nationality} />
            <input placeholder={CVData.personalInformation.age} />
            <input placeholder={CVData.personalInformation.gender} />

            <h4>education</h4>
            {CVData.education.map((ed, ind) => (
              <>
                <div key={ind}>
                  <input placeholder={ed.degree} />
                  <input placeholder={ed.institution} />
                  <input placeholder={ed.year} />
                </div>
              </>
            ))}

            <h4>skills</h4>
            {CVData.skills.map((skill, ind) => (
              <input placeholder={skill} key={ind} />
            ))}
          </div>
        </div>
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
