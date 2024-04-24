import React, { useState } from "react";
import AutoResizingTextarea from "../Hero/AutoResizingTextarea";
import Server from "../Hero/Server";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Hero/UserProvider";

export default function AddCompDept() {
  const { loggedInData } = useUser();

  let navigate = useNavigate();
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
    addDeptTemp: false,
    newDepartment: { department: "", newRequirement: [""] },
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
    const newDepart = {
      department: e.target.value,
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
    console.log(loggedInData.token);
    Server.addCompanyDept(state.newDepartment, loggedInData.token).then(
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

  return (
    <>
      {!state.newDepartment.department ? (
        <div className="login">
          <label for="departmentSelect">Select Department</label>
          <select
            id="departmentSelect"
            class="form-select"
            onChange={(e) => compAddDept(e)}
          >
            {state.departments.map((dep, index) => (
              <option value={dep} key={index}>
                {dep}
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
              <p className="alert alert-danger" role="alert">
                {state.errorMsg}
              </p>
            )}
            {state.successMsg && (
              <p className="alert alert-success" role="alert">
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
