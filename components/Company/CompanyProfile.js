import React, { useState } from "react";
import "./Company.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import AutoResizingTextarea from "../Hero/AutoResizingTextarea";

export default function CompanyProfile() {
  const [state, setState] = useState({
    departments: [
      "Arts and Humanities",
      "Business Administration",
      "Computer Science",
      "Engineering",
      "Environmental Science",
      "Health and Medicine",
      "Life Sciences",
      "Physical Sciences",
      "Social Sciences",
    ],
    compDepartments: [
      {
        department: "Arts and Humanities",
        requirements: [
          "Application criteria",
          "secured internship",
          "enrollment in ARTHUM 3000A/B/Y",
          "specific assignments.",
        ],
        newRequirement: [""],
      },
      {
        department: "Business Administration",
        requirements: [
          "Bachelor's degree",
          "relevant experience",
          "proficiency in Microsoft Office",
          "communication skills.",
        ],
        newRequirement: [""],
      },
      {
        department: "Computer Science",
        requirements: [
          "16 months of supervised work experience",
          "completion of CMPT 401, 402, 403, and 404.",
        ],
        newRequirement: [""],
      },
      {
        department: "Engineering",
        requirements: [
          "Degree or enrollment in an engineering program",
          "high GPA",
          "willingness to learn",
          "flexible schedule.",
        ],
        newRequirement: [""],
      },
    ],
    addDeptTemp: true,
    newDepartment: "",
    newDeptRequirements: [""],
  });

  const compAddDept = (e) => {
    const newDepartment = {
      department: e.target.value,
      requirements: [],
      newRequirement: [""],
    };

    setState((prevState) => {
      return {
        ...prevState,
        compDepartments: [...prevState.compDepartments, newDepartment],
      };
    });
  };

  const addCompDeptBtn = () => {
    setState((prevState) => {
      return { ...prevState, addDeptTemp: true };
    });
  };

  const addNewDept = (e) => {
    
  }

  const compRemoveDept = (depToRemove) => {
    setState((prevState) => {
      return {
        ...prevState,
        compDepartments: prevState.compDepartments.filter(
          (dep) => dep !== depToRemove
        ),
      };
    });
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
    console.log("function call");
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

  return (
    <>
      <div className="company">
        <h1>your departments</h1>
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
                <button onClick={() => compRemoveDept(dep)}>
                  remove department
                </button>
              </ul>
            ))}
          </div>
        ) : (
          <div className="other-depts">
            <CompDepts
              departments={state.departments.filter(
                (dep) =>
                  !state.compDepartments.some(
                    (compDep) => compDep.department === dep
                  )
              )}
              compAddDept={compAddDept}
            />
          </div>
        )}
        <button className="new-dept" onClick={addCompDeptBtn}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      </div>
    </>
  );
}

const CompDepts = ({ departments, compAddDept }) => {
  return (
    <div className="login">
      <label>select department </label>
      <select onChange={(e) => compAddDept(e)}>
        {departments.map((dep, index) => (
          <option value={dep} key={index}>
            {dep}
          </option>
        ))}
      </select>
    </div>
  );
};

const Requirements = ({
  requirements,
  newRequirement,
  index,
  handleNewRequirementChange,
  handleRequirementChange,
}) => {
  return (
    <>
      {requirements.map((requirem, reqIndex) => (
        <div key={reqIndex}>
          <li>
            <AutoResizingTextarea
              name={`requirement${reqIndex}`}
              value={requirem}
              style={{ width: "100%", border: "1px solid" }}
              onChange={(event) =>
                handleRequirementChange(event, reqIndex, index)
              }
              placeholder={requirem}
            />
          </li>
        </div>
      ))}
      {newRequirement.map((requirem, reqIndex) => (
        <div key={index}>
          <li>
            <AutoResizingTextarea
              name={`newRequirement${reqIndex}`}
              value={requirem}
              style={{ width: "100%" }}
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
