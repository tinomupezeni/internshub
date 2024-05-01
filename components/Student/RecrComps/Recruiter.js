import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import "./Recruiter.css";
import Server from "../../Hero/Server";
import { useNavigate } from "react-router-dom";

export default function Recruiter() {
  let navigate = useNavigate();
  const [state, setState] = useState({
    companies: [],
    errorMsg: "",
  });
  const studentProfileData = secureLocalStorage.getItem("studentProfileData");
  useEffect(() => {
    Server.getstudentComps().then(
      (response) => {
        setState((prevState) => {
          return {
            ...prevState,
            companies: response.data,
          };
        });
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          navigate("/log-in");
        }
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg: "an error occured",
          };
        });
      }
    );
  }, []);
  return (
    <>
      <div className="recruiter">
        <h1>Companies in {studentProfileData.student_profile.department}</h1>
        <p>
          Dive in and explore the exciting opportunities waiting for you!
          Discover the key requirements set by leading companies in your field.
        </p>
        {state.errorMsg && (
          <p className="alert alert-danger text-center" role="alert">
            {state.errorMsg}
          </p>
        )}
        <div className="company">
          <div className="ava-depts">
            {state.companies &&
              state.companies.map((dep, deptIndex) => (
                <ul key={deptIndex}>
                  <h3>{dep.companyName}</h3>
                  <p style={{ textTransform: "none" }}>{dep.companyEmail}</p>
                  <div style={{ marginLeft: "50px" }}>
                    <h5>requirements</h5>
                    {dep.requirements.map((req) => (
                      <li>{req}</li>
                    ))}
                  </div>
                </ul>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
