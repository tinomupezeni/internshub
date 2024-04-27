import React, { useEffect, useState } from "react";
import AutoResizingTextarea from "../Hero/AutoResizingTextarea";
import Server from "../Hero/Server";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Hero/UserProvider";

export default function AddCompDept(props) {
  const { loggedInData } = useUser();
  let navigate = useNavigate();
  const [state, setState] = useState({
    departments: [],
    addDeptTemp: false,
    newDepartment: { departmentId: null, department: "", newRequirement: [] },
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

  const compAddDept = (e) => {
    const dep = JSON.parse(e.target.value);
    const newDepart = {
      departmentId: dep.departmentId,
      department: dep.department,
      newRequirement: [""],
    };
    setState((prevState) => {
      return {
        ...prevState,
        newDepartment: newDepart,
      };
    });
  };

  const handleNewRequirementChange = (event, reqIndex) => {
    const newRequirements = [...state.newDepartment.newRequirement];
    newRequirements[reqIndex] = event.target.value;
    setState((prevState) => {
      return {
        ...prevState,
        newDepartment: {
          ...prevState.newDepartment,
          newRequirement: newRequirements,
        },
      };
    });

    if (
      reqIndex === state.newDepartment.newRequirement.length - 1 &&
      event.target.value !== ""
    ) {
      newRequirements.push("");
      setState((prevState) => ({
        ...prevState,
        newDepartment: {
          ...prevState.newDepartment,
          newRequirement: newRequirements,
        },
      }));
    } else if (
      reqIndex === state.newDepartment.newRequirement.length - 2 &&
      event.target.value === ""
    ) {
      newRequirements.pop();
      setState((prevState) => ({
        ...prevState,
        newDepartment: {
          ...prevState.newDepartment,
          newRequirement: newRequirements,
        },
      }));
    }
  };

  const addDept = () => {
    setIsLoading();
    const newDepartment = {
      departmentId: state.newDepartment.departmentId,
      department: state.newDepartment.department,
      newRequirement: state.newDepartment.newRequirement.filter(
        (req) => req.trim() !== ""
      ),
    };
    if (newDepartment.newRequirement.length === 0) {
      setState((prevState) => {
        return {
          ...prevState,
          errorMsg: "please add at least one requirement",
        };
      });
      resetIsLoading();
      return;
    } else {
      Server.addCompanyDept(newDepartment, loggedInData.token).then(
        (response) => {
          resetIsLoading();
          props.fetchData();
          setState((prevState) => {
            return {
              ...prevState,
              successMsg: response.data.message,
            };
          });
          fetchDept();
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
    }
  };
  const removeDept = () => {
    const newDepart = {
      department: "",
      newRequirement: [""],
    };
    setState((prevState) => {
      return {
        ...prevState,
        newDepartment: newDepart,
      };
    });
  };

  const fetchDept = () => {
    Server.getAllDept(loggedInData.token).then(
      (response) => {
        setState((prevState) => {
          return {
            ...prevState,
            departments: response.data,
          };
        });
      },
      (error) => {
        console.log(error);
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg: error.response.data,
          };
        });
      }
    );
  };

  useEffect(fetchDept, []);

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
      {!state.newDepartment.department ? (
        <div className="select">
          <select
            id="departmentSelect"
            class="form-select"
            onChange={(e) => compAddDept(e)}
          >
            <option selected disabled>
              Select a department
            </option>
            {state.departments.map((dep, index) => (
              <option value={JSON.stringify(dep)} key={index}>
                {dep.department}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="ava-depts">
          <ul>
            <h4>{state.newDepartment.department}</h4>
            <div style={{ marginLeft: "50px" }}>
              {state.newDepartment.newRequirement.map((requirem, reqIndex) => (
                <div key={reqIndex} className="mb-3">
                  <li>
                    <AutoResizingTextarea
                      name={`newRequirement${reqIndex}`}
                      value={requirem}
                      style={{ width: "100%" }}
                      className="form-control"
                      onChange={(event) =>
                        handleNewRequirementChange(event, reqIndex)
                      }
                      placeholder="Add new requirement"
                    />
                  </li>
                </div>
              ))}
            </div>
            {state.errorMsg && (
              <p className="alert alert-danger text-center" role="alert">
                {state.errorMsg}
              </p>
            )}
            {state.successMsg && (
              <p className="alert alert-success text-center" role="alert">
                {state.successMsg}
              </p>
            )}
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-success w-80 text-center"
                  onClick={() => addDept()}
                >
                  done{" "}
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
                  className="btn btn-danger w-80 text-center"
                  onClick={() => removeDept()}
                >
                  cancel{" "}
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
        </div>
      )}
    </>
  );
}
