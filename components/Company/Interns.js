import React, { useState } from "react";
import InternsData from "./InternsData";
import "./Interns.css";
import VideoPlayer from "../Hero/VideoPlayer";

export default function Interns() {
  const [state, setState] = useState({
    compDepartments: [
      "Arts and Humanities",
      "Business Administration",
      "Computer Science",
      "Environmental Science",
    ],
  });
  return (
    <>
      <div className="interns">
        <div className="interns-heading">
          <h1>interns you might be interested in</h1>
          <p>
            Below are profiles of promising interns who have skills that align
            with your company's needs. Browse through their profiles to find
            potential matches for your internship positions.
          </p>
        </div>

        <div className="interns-data">
          {state.compDepartments.map((depart, index) => {
            const internsInDepartment = InternsData.filter(
              (intern) => intern.department === depart
            );

            return (
              <div key={index}>
                <h3>{depart}</h3>
                {internsInDepartment.length > 0 ? (
                  internsInDepartment.map((intern, index) => (
                    <div key={index} className="intern">
                      <div className="video">
                        <VideoPlayer link="https://www.youtube.com/watch?v=gqI9MB221kw" />
                      </div>
                      <div className="video-info">
                        <div>
                          <h4>{intern.name}</h4>
                          <p>{intern.occupation}</p>
                        </div>
                        <div>
                          <p>{intern.education}</p>
                          <p>{intern.phone}</p>
                        </div>
                        <button>view portfolio</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="intern">
                    <p>No interns found under {depart}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
