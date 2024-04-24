import React, { useEffect, useState } from "react";
import "./Company.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faPlusCircle, faUndo } from "@fortawesome/free-solid-svg-icons";
import AutoResizingTextarea from "../Hero/AutoResizingTextarea";
import AddCompDept from "./AddCompDept";
import { useUser } from "../Hero/UserProvider";
import Server from "../Hero/Server";

export default function CompanyProfile() {
  let navigate = useNavigate();
  const { loggedInData } = useUser();
  const [state, setState] = useState({
    departments: [
      "Computer Engineering",
      "Accounting and Information Systems",
      "Banking and Finance",
      "Management Studies",
      "Economics",
      "Graduate Business School",
      "Technology",
      "Agriculture",
      "Commerce",
      "Applied Social Sciences",
      "Arts, Culture and Heritage Studies",
      "Science",
      "Law",
      "Education",
      "Agriculture Environment",
      "Arts And Humanities",
      "Business Management",
      "Veterinary Science",
    ],
    compDepartments: [{ newRequirement: [""] }],
    addDeptTemp: false,
    newDepartment: {},
    newDeptRequirements: [""],
    isLoading: false,
    errorMsg: "",
    successMsg: "",
  });

  const setIsLoading = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });
  };
  const resetIsLoading = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: false,
      };
    });
  };

  const addCompDeptBtn = () => {
    setState((prevState) => {
      return { ...prevState, addDeptTemp: !state.addDeptTemp };
    });
  };
  const deleteCompDeptBtn = (id) => {
    setIsLoading();
    const data = {};
    data.dept_id = id;
    Server.deleteCompanyDept(data, loggedInData.token).then(
      (response) => {
        resetIsLoading();
        setState((prevState) => {
          return {
            ...prevState,
            successMsg: response.data.message,
          };
        });
        console.log(response);
      },
      (error) => {
        resetIsLoading();
        if (error.response && error.response.status === 401) {
          navigate("/log-in");
        }
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg: error.response.data.message,
          };
        });
        console.log(error);
      }
    );
    console.log(data);
  };

  const handleRequirementChange = (event, reqIndex, depIndex) => {
    console.log("fumc");
    const newDepartments = [...state.compDepartments];
    newDepartments[depIndex].requirements[reqIndex] = event.target.value;
    setState((prevState) => {
      return { ...prevState, compDepartments: newDepartments };
    });

    if (
      reqIndex === state.compDepartments[depIndex].requirements.length - 1 &&
      event.target.value !== "" &&
      newDepartments[depIndex].requirements[
        state.compDepartments[depIndex].requirements.length - 1
      ] === ""
    ) {
      newDepartments[depIndex].requirements.push("");
      setState((prevState) => ({
        ...prevState,
        compDepartments: newDepartments,
      }));
    }
  };

  const handleNewRequirementChange = (event, reqIndex, depIndex) => {
    const newDepartments = [...state.compDepartments];
    newDepartments[depIndex].newRequirement[reqIndex] = event.target.value;
    setState((prevState) => {
      return { ...prevState, compDepartments: newDepartments };
    });

    if (
      reqIndex === state.compDepartments[depIndex].newRequirement.length - 1 &&
      event.target.value !== ""
    ) {
      newDepartments[depIndex].newRequirement.push("");
      setState((prevState) => ({
        ...prevState,
        compDepartments: newDepartments,
      }));
    } else if (
      reqIndex === state.compDepartments[depIndex].newRequirement.length - 2 &&
      event.target.value === ""
    ) {
      newDepartments[depIndex].newRequirement.pop();
      setState((prevState) => ({
        ...prevState,
        compDepartments: newDepartments,
      }));
    }
  };
  

  useEffect(() => {
    Server.getCompanyDept(loggedInData.token).then(
      (response) => {
        const updatedCompDepartments = response.data.map((dept) => ({
          ...dept,
          newRequirement: [""],
        }));
        setState((prevState) => {
          return {
            ...prevState,
            compDepartments: updatedCompDepartments,
          };
        });
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          navigate("/log-in");
        }
      }
    );
  });
  return (
    <>
      <div className="company">
        <h1>{loggedInData.name}</h1>
        <h4>your departments</h4>
        <p>
          add or remove departments with the necessary requirements for interns
          to meet
        </p>
        {!state.addDeptTemp ? (
          <div className="ava-depts">
            {state.compDepartments.map((dep, index) => (
              <ul key={index}>
                <h4>{dep.department}</h4>
                <div style={{ marginLeft: "50px" }}>
                  <Requirements
                    requirements={dep.requirements}
                    newRequirement={dep.newRequirement}
                    index={index}
                    handleNewRequirementChange={handleNewRequirementChange}
                    handleRequirementChange={handleRequirementChange}
                  />
                </div>
                {state.errorMsg && (
                  <p className="alert alert-danger" role="alert">
                    {state.errorMsg}
                  </p>
                )}
                {state.successMsg && (
                  <p className="alert alert-success" role="alert">
                    {state.successMsg}
                  </p>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCompDeptBtn(dep.departmentId)}
                >
                  delete{" "}
                  <span
                    className={`spinner-border spinner-border-sm ${
                      state.isLoading ? "" : "d-none"
                    }`}
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              </ul>
            ))}
          </div>
        ) : (
          <>
            <AddCompDept />
          </>
        )}
        <button className="new-dept" onClick={addCompDeptBtn}>
          {state.addDeptTemp ? (
            <FontAwesomeIcon icon={faUndo} />
          ) : (
            <FontAwesomeIcon icon={faPlusCircle} />
          )}
        </button>
      </div>
    </>
  );
}

const Requirements = ({
  requirements,
  newRequirement,
  index,
  handleNewRequirementChange,
  handleRequirementChange,
}) => {
  return (
    <>
      {requirements &&
        requirements.map((requirem, reqIndex) => (
          <div key={reqIndex} className="mb-3">
            <li>
              <AutoResizingTextarea
                name={`requirement${reqIndex}`}
                value={requirem}
                style={{ width: "100%", border: "1px solid" }}
                className="form-control"
                onChange={(event) =>
                  handleRequirementChange(event, reqIndex, index)
                }
                placeholder={requirem}
              />
            </li>
          </div>
        ))}
      {newRequirement.map((requirem, reqIndex) => (
        <div key={index} className="mb-3">
          <li>
            <AutoResizingTextarea
              name={`newRequirement${reqIndex}`}
              value={requirem}
              style={{ width: "100%" }}
              className="form-control"
              onChange={(event) =>
                handleNewRequirementChange(event, reqIndex, index)
              }
              placeholder="Add new requirement"
            />
          </li>
        </div>
      ))}
    </>
  );
};
