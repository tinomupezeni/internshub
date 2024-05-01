import React, { useEffect, useState } from "react";
import "./Company.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCircleMinus,
  faCircleXmark,
  faPlusCircle,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import AutoResizingTextarea from "../Hero/AutoResizingTextarea";
import AddCompDept from "./AddCompDept";
import Server from "../Hero/Server";
import secureLocalStorage from "react-secure-storage";

export default function CompanyProfile() {
  let navigate = useNavigate();
  const loggedInData = secureLocalStorage.getItem("loggedInData");
  const [state, setState] = useState({
    compDepartments: [],
    newDepartment: { department: "", newRequirement: [] },
    compData: true,
    addDeptTemp: false,
    updatedRequirements: [],
    newRequirements: { departmentId: null, requirements: [""] },
    isLoading: false,
    errorMsg: "",
    successMsg: "",
    activeIndex: null,
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

  const setActiveIndex = (id) => {
    setState((prevState) => {
      return {
        ...prevState,
        activeIndex: id,
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
    let dept_id = id;
    Server.deleteCompanyDept(dept_id, loggedInData.token).then(
      (response) => {
        resetIsLoading();
        setState((prevState) => {
          return {
            ...prevState,
            successMsg: response.data.message,
            compDepartments: prevState.compDepartments.filter(
              (dept) => dept.departmentId !== dept_id
            ),
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
  };

  const handleRequirementChange = (event, id) => {
    const value = event.target.value;
    const data = {};
    data.requirementId = id;
    data.requirement = value;

    setState((prevState) => {
      return { ...prevState, updatedRequirements: [data] };
    });
  };

  const saveNewReq = () => {
    const newState = { ...state };

    for (const departmentId in newRequirements) {
      const departmentIdInt = parseInt(departmentId, 10);

      const departmentNewRequirements = newRequirements[departmentId];

      const nonEmptyRequirements = departmentNewRequirements.filter(
        (requirement) => requirement !== ""
      );

      if (nonEmptyRequirements.length > 0) {
        newState.updatedRequirements.push({
          departmentId: departmentIdInt,
          requirements: nonEmptyRequirements,
        });
      }
    }

    // Update the state
    setState(newState);

    Server.updateCompanyReq(
      newState.updatedRequirements,
      loggedInData.token
    ).then(
      (response) => {
        setState((prevState) => {
          return {
            ...prevState,
            successMsg: response.data.message,
          };
        });
        fetchData();
      },
      (error) => {
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg: error.response.data.message,
          };
        });
      }
    );

    console.log(newState.updatedRequirements);
    newState.updatedRequirements = [];
  };

  const [newRequirements, setNewRequirements] = useState({});

  const handleNewRequirementChange = (event, deptIndex, index) => {
    const newRequirementsCopy = { ...newRequirements };

    // Get the departmentId of the current department
    const departmentId = deptIndex;

    // If newRequirements for this departmentId doesn't exist, initialize it
    if (!newRequirementsCopy[departmentId]) {
      newRequirementsCopy[departmentId] = [""];
    }

    // Update the requirement at the given index
    newRequirementsCopy[departmentId][index] = event.target.value;

    // If the updated requirement is not empty and it's the last one, add a new empty requirement
    if (
      event.target.value !== "" &&
      index === newRequirementsCopy[departmentId].length - 1
    ) {
      newRequirementsCopy[departmentId].push("");
    }

    if (
      event.target.value === "" &&
      newRequirementsCopy[departmentId].length > 1
    ) {
      newRequirementsCopy[departmentId].splice(index, 1);
    }

    setNewRequirements(newRequirementsCopy);
  };

  const deleteReq = (id) => {
    console.log(id);
    Server.deleteRequirement(id, loggedInData.token).then(
      (response) => {
        setState((prevState) => {
          return {
            ...prevState,
            successMsg: response.data.message,
          };
        });
        fetchData();
      },
      (error) => {
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg: error.response.data.message,
          };
        });
      }
    );
  };

  const fetchData = () => {
    Server.getCompanyDept().then(
      (response) => {
        if (response.data.length === 0) {
          setState((prevState) => {
            return {
              ...prevState,
              compData: true,
              compDepartments: [],
            };
          });
        } else {
          const updatedCompDepartments = response.data.map((dept) => ({
            ...dept,
            newRequirements: [""],
          }));
          setState((prevState) => {
            return {
              ...prevState,
              compData: false,
              compDepartments: updatedCompDepartments,
            };
          });
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          navigate("/log-in");
        }
      }
    );
  };

  useEffect(fetchData, []);

  useEffect(() => {
    const handleDismissError = (event) => {
      if (
        (state.errorMsg || state.successMsg) &&
        !event.target.closest(".alert")
      ) {
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg: "",
            successMsg: "",
          };
        });
      }
    };

    window.addEventListener("click", handleDismissError);

    return () => {
      window.removeEventListener("click", handleDismissError);
    };
  }, [state.errorMsg, state.successMsg]);
  return (
    <>
      <div className="company">
        <h1 className="display-4">
          <b>{loggedInData.name}</b>
        </h1>
        <p>
          Enhance your organization by adding or removing departments, each with
          its own set of requirements for interns.
        </p>

        {state.successMsg && (
          <p className="alert alert-success text-center" role="alert">
            {state.successMsg}
          </p>
        )}
        {state.addDeptTemp && (
          <>
            <AddCompDept fetchData={fetchData} />
          </>
        )}
        <>
          <div className="ava-depts">
            {state.compDepartments &&
              state.compDepartments.map((dep, deptIndex) => (
                <ul key={deptIndex}>
                  <h4>{dep.department}</h4>
                  <p>feel free to edit your requirements</p>
                  <div style={{ marginLeft: "50px" }}>
                    <Requirements
                      requirements={dep.requirements}
                      newRequirements={
                        newRequirements[dep.departmentId] || [""]
                      }
                      deptIndex={dep.departmentId}
                      handleNewRequirementChange={handleNewRequirementChange}
                      handleRequirementChange={handleRequirementChange}
                      deleteReq={deleteReq}
                    />
                  </div>
                  {state.errorMsg && (
                    <p className="alert alert-danger text-center" role="alert">
                      {state.errorMsg}
                    </p>
                  )}
                  <div className="row">
                    <div className="col">
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
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-success"
                        onClick={() => saveNewReq()}
                      >
                        save{" "}
                        <span
                          className={`spinner-border spinner-border-sm ${
                            state.isLoading ? "" : "d-none"
                          }`}
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                    </div>
                  </div>
                </ul>
              ))}
          </div>
          {state.compData && (
            <p className="alert alert-warning text-center">
              no requirements available, use the button below to add a
              requirement
            </p>
          )}
        </>

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
  newRequirements,
  handleNewRequirementChange,
  handleRequirementChange,
  deptIndex,
  deleteReq,
}) => {
  return (
    <>
      {requirements &&
        requirements.map((requirem, reqIndex) => (
          <div key={reqIndex} className="mb-3">
            <li className="d-flex justify-content-between align-items-center">
              <AutoResizingTextarea
                name={`requirement${reqIndex}`}
                value={requirem.requirement}
                style={{ width: "100%", border: "1px solid" }}
                className="form-control"
                onChange={(e) =>
                  handleRequirementChange(e, requirem.requirementId)
                }
                placeholder={requirem.requirement}
              />
              <i
                className="btn btn-danger"
                onClick={() => deleteReq(requirem.requirementId)}
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </i>
            </li>
          </div>
        ))}
      {newRequirements.map((requirem, index) => (
        <div key={index} className="mb-3">
          <li>
            <AutoResizingTextarea
              name={`newRequirement${index}`}
              value={requirem}
              style={{ width: "100%" }}
              className="form-control"
              onChange={(event) =>
                handleNewRequirementChange(event, deptIndex, index)
              }
              placeholder="Add new requirement"
            />
          </li>
        </div>
      ))}
    </>
  );
};
