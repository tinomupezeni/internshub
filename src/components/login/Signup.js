import React, { useState, useEffect } from "react";
import "./Login.css";

export default function Signup() {
  const [state, setState] = useState({
    compName: "",
    compEmail: "",
    compPassword: "",
    confirmCompPassword: "",
    // -------students
    studentName: "",
    studentSurname: "",
    studentEmail: "",
    studentPassword: "",
    confirmPasswordSt: "",
    proceed: false,
    studentProccd: false,
    selectedDept: [],
    errorMsg: "",
  });
  // change
  const [selectStatus, setSelectStatus] = useState(false);
  const [status, setStatus] = useState("company");
  const departments = [
    "Arts and Humanities",
    "Business Administration",
    "Computer Science",
    "Engineering",
    "Environmental Science",
    "Health and Medicine",
    "Life Sciences",
    "Physical Sciences",
    "Social Sciences",
  ];

  const handleInputInfo = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const statusSelect = (e) => {
    setSelectStatus(true);
    setStatus(e.target.value);
  };

  const compProceed = () => {
    if (state.compName && state.compEmail) {
      setState((prevState) => {
        return { ...prevState, proceed: true };
      });
    } else {
      setState((prevState) => {
        return { ...prevState, errorMsg: "invalid name or email address" };
      });
    }
  };

  const studentProceed = () => {
    if (state.studentName && state.studentSurname) {
      setState((prevState) => {
        return { ...prevState, studentProccd: true };
      });
    } else {
      setState((prevState) => {
        return { ...prevState, errorMsg: "invalid name or email address" };
      });
    }
  };

  const compSelectedDepts = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        selectedDept: [...prevState.selectedDept, e.target.value],
      };
    });
  };

  // send data to backend
  const signupbtn = () => {
    if (status === "company") {
      const data = {
        status: status,
        selectedDept: state.selectedDept,
        compEmail: state.compEmail,
        compName: state.compName,
        compPassword: state.compPassword,
      };
      console.log(data);
    } else {
      if (!state.studentEmail) {
        setState((prevState) => {
          return { ...prevState, errorMsg: "email address" };
        });
      }
      if (state.studentPassword !== state.confirmPasswordSt) {
        setState((prevState) => {
          return { ...prevState, errorMsg: "password does not match" };
        });
      } else if (!state.studentPassword || !state.confirmPasswordSt) {
        setState((prevState) => {
          return { ...prevState, errorMsg: "password required" };
        });
      }
      const data = {
        status: status,
        studentName: state.studentName,
        studentSurname: state.studentSurname,
        studentEmail: state.studentEmail,
        studentPassword: state.studentPassword,
      };
      console.log(data);
    }
  };

  // hide error message
  const handleClickOutside = (e) => {
    if (!e.target.closest(".error")) {
      setState((prevState) => {
        return { ...prevState, errorMsg: "" };
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <>
      {!selectStatus ? (
        <div className="login">
          <label>please select to continue</label>
          <select onChange={statusSelect}>
            <option>status : </option>
            <option value="student">student</option>
            <option value="company">company</option>
          </select>
        </div>
      ) : status === "company" ? (
        !state.proceed ? (
          <CompanyLogin
            compProceed={compProceed}
            handleInputInfo={handleInputInfo}
            errorMsg={state.errorMsg}
          />
        ) : (
          <CompDepts
            departments={departments}
            handleInputInfo={handleInputInfo}
            compSelectedDepts={compSelectedDepts}
            selectedDept={state.selectedDept}
            signupbtn={signupbtn}
          />
        )
      ) : !state.studentProccd ? (
        <StudentSignUp
          studentProceed={studentProceed}
          handleInputInfo={handleInputInfo}
          errorMsg={state.errorMsg}
        />
      ) : (
        <StudentSignUpSecForm
          signupbtn={signupbtn}
          handleInputInfo={handleInputInfo}
          errorMsg={state.errorMsg}
        />
      )}
    </>
  );
}

const StudentSignUp = ({ handleInputInfo, studentProceed, errorMsg }) => {
  return (
    <div className="login">
      <label>
        {errorMsg ? (
          <p className="error" style={{ color: "red" }}>
            {errorMsg}
          </p>
        ) : (
          <p>Name</p>
        )}
      </label>
      <input name="studentName" onChange={(e) => handleInputInfo(e)} />
      <label>surname</label>
      <input name="studentSurname" onChange={(e) => handleInputInfo(e)} />
      <button onClick={studentProceed}>proceed</button>
    </div>
  );
};
const StudentSignUpSecForm = ({ signupbtn, handleInputInfo, errorMsg }) => {
  return (
    <div className="login">
      <label>
        {" "}
        {errorMsg ? (
          <p className="error" style={{ color: "red" }}>
            {errorMsg}
          </p>
        ) : (
          <p>Email</p>
        )}
      </label>
      <input
        name="studentEmail"
        type="email"
        onChange={(e) => handleInputInfo(e)}
      />
      <label>password</label>
      <input
        name="studentPassword"
        type="password"
        onChange={(e) => handleInputInfo(e)}
      />
      <label>confirm password</label>
      <input
        name="confirmPasswordSt"
        type="password"
        onChange={(e) => handleInputInfo(e)}
      />
      <button onClick={signupbtn}>sign up</button>
    </div>
  );
};

const CompanyLogin = ({ compProceed, handleInputInfo, errorMsg }) => {
  return (
    <div className="login">
      <label>
        {" "}
        {errorMsg ? (
          <p className="error" style={{ color: "red" }}>
            {errorMsg}
          </p>
        ) : (
          <p>company name</p>
        )}
      </label>
      <input name="compName" onChange={(e) => handleInputInfo(e)} />
      <label>email</label>
      <input
        name="compEmail"
        type="email"
        onChange={(e) => handleInputInfo(e)}
      />
      <button onClick={compProceed}>proceed</button>
    </div>
  );
};

const CompDepts = ({
  departments,
  handleInputInfo,
  compSelectedDepts,
  selectedDept,
  signupbtn,
}) => {
  return (
    <div className="login">
      {selectedDept &&
        selectedDept.map((dept) => (
          <ul className="depts">
            <li>{dept}</li>
          </ul>
        ))}
      <label>select department(s) </label>
      <select onChange={(e) => compSelectedDepts(e)}>
        {departments.map((dep, index) => (
          <option value={dep} key={index}>
            {dep}
          </option>
        ))}
      </select>
      <label>password</label>
      <input
        name="compPassword"
        type="password"
        onChange={(e) => handleInputInfo(e)}
      />
      <label>confirm password</label>
      <input
        name="confirmCompPassword"
        type="password"
        onChange={(e) => handleInputInfo(e)}
      />
      <button onClick={signupbtn}>Sign up</button>
    </div>
  );
};
