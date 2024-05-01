import React, { useEffect, useState } from "react";
import "./Interns.css";
import Server from "../Hero/Server";
import { Link, useNavigate } from "react-router-dom";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/esm/Button";
import secureLocalStorage from "react-secure-storage";

export default function Interns() {
  let navigate = useNavigate();
  const [state, setState] = useState({
    internsInDepartment: [],
    isLoading: false,
  });

  const viewPotfolio = (id) => {
    console.log(id);
    secureLocalStorage.removeItem("studentId");
    secureLocalStorage.setItem("studentId", id);
  };
  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });
    Server.getCompInterns().then(
      (response) => {
        setState((prevState) => {
          return {
            ...prevState,
            internsInDepartment: [response.data],
            isLoading: false,
          };
        });
      },
      (error) => {
        setState((prevState) => {
          return {
            ...prevState,
            isLoading: false,
          };
        });
        if (error.response && error.response.status === 401) {
          navigate("/log-in");
        }
      }
    );
  }, []);

  return (
    <>
      <div className="comp-interns">
        <div className="comp-interns-heading">
          <h1>interns you might be interested in</h1>
          <p>
            Below are profiles of promising interns who have skills that align
            with your company's needs. Browse through their profiles to find
            potential matches for your internship positions.
          </p>
        </div>
        <div className="comp-interns-data">
          {state.isLoading && (
            <div
              style={{
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <div
                class="d-flex justify-content-center align-items-center"
                style={{
                  height: "50px",
                }}
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
                <b>preparing interns for you...</b>
              </p>
            </div>
          )}
          {state.internsInDepartment &&
            state.internsInDepartment.map((depart, index) => {
              return (
                <div key={index}>
                  <h3>{depart.department_name}</h3>
                  <ul>
                    {depart.students.length > 0 ? (
                      depart.students.map((intern, index) => (
                        <div key={index} className="intern">
                          <div className="intern-pers-data">
                            <i className="icon-intern">
                              <FontAwesomeIcon icon={faUserGraduate} />
                            </i>
                            <div className="in-data">
                              <h4>
                                {intern.studentName} {intern.studentSurname}
                              </h4>
                              <p>
                                <a
                                  href={`mailto:${intern.studentEmail}`}
                                  style={{ textTransform: "lowercase" }}
                                >
                                  {intern.studentEmail}
                                </a>
                              </p>
                              <p>{intern.program}</p>
                              <p>{intern.institution}</p>
                            </div>
                          </div>
                          <p
                            className="alert alert-info text-center"
                            role="alert"
                          >
                            {intern.summary}
                          </p>
                          <Link to="/company/intern/potfolio">
                            <Button
                              onClick={() => viewPotfolio(intern.studentId)}
                            >
                              view portfolio
                            </Button>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="intern">
                        <p>No interns found under {depart}</p>
                      </div>
                    )}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
