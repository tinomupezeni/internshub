import React, { useState, useEffect } from "react";
import "./Signup.css";

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
    passError: "",
    student: false,
    company: false,
  });
  // change
  const [selectStatus, setSelectStatus] = useState(false);
  const [status, setStatus] = useState("company");

  const handleInputInfo = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const statusSelect = (e) => {
    const value = e.currentTarget.getAttribute("data-value");
    setStatus(value);
    if (value === "company") {
      setState((prevState) => {
        return { ...prevState, company: true, student: false };
      });
    } else {
      setState((prevState) => {
        return { ...prevState, company: false, student: true };
      });
    }
    setStatus(value);
    setSelectStatus(true);
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
          return { ...prevState, passError: "password does not match" };
        });
      } else if (!state.studentPassword || !state.confirmPasswordSt) {
        setState((prevState) => {
          return { ...prevState, passError: "password required" };
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
      <div className="sign-up">
        {!selectStatus ? (
          <div>
            <div className="intro-text" style={{ textAlign: "center" }}>
              <h1>create an account</h1>
              <p>please select type of account you want to create</p>
              <SelectCategory statusSelect={statusSelect} />
            </div>
          </div>
        ) : status === "company" ? (
          <>
            <CategoryInto
              status={status}
              statusSelect={statusSelect}
              company={state.company}
              student={state.student}
            />
            <div style={{ padding: "0" + 1 + "rem" }}>
              <h2 style={{ padding: 10 + "px" }}>
                create a new company account
              </h2>
              <p>Post job requirements and find matching students.</p>
            </div>
            <CompanyLogin
              compProceed={compProceed}
              handleInputInfo={handleInputInfo}
              errorMsg={state.errorMsg}
            />
            <CompDepts
              handleInputInfo={handleInputInfo}
              compSelectedDepts={compSelectedDepts}
              selectedDept={state.selectedDept}
              signupbtn={signupbtn}
              passError={state.passError}
            />
          </>
        ) : (
          <>
            <CategoryInto
              status={status}
              statusSelect={statusSelect}
              company={state.company}
              student={state.student}
            />
            <div style={{ padding: "0" + 1 + "rem" }}>
              <h2 style={{ padding: 10 + "px" }}>
                Sign Up for Your New Intern Account
              </h2>
              <p>
                Build your resume and find companies that match your skills.
              </p>
            </div>

            <StudentSignUp
              studentProceed={studentProceed}
              handleInputInfo={handleInputInfo}
              errorMsg={state.errorMsg}
            />

            <StudentSignUpSecForm
              signupbtn={signupbtn}
              handleInputInfo={handleInputInfo}
              errorMsg={state.errorMsg}
              passError={state.passError}
            />
          </>
        )}
      </div>
    </>
  );
}

const SelectCategory = ({ statusSelect }) => {
  return (
    <div className="account-option">
      <div
        style={{ border: "1px solid blue" }}
        data-value="company"
        onClick={statusSelect}
      >
        <img src="https://media.istockphoto.com/id/1490859962/photo/power-soft-skills-multi-skills-responsibility-hr-human-resources-concept-personal-attribute.jpg?s=612x612&w=0&k=20&c=ToS6Yl5eZgQUc0t9FWp7tHkabQvoEe0ge1PFbPYvf7A=" />
        <h3>company</h3>
        <p>company looking for potential interns.</p>
      </div>
      <div
        style={{ border: "1px solid orange" }}
        data-value="student"
        onClick={statusSelect}
      >
        <img src="https://media.istockphoto.com/id/1498104828/photo/beautiful-indian-female-student-portrait-while-looking-at-camera.jpg?s=612x612&w=0&k=20&c=XtSRUx8Q-AuN7hw6q_cS-sOyfjBpONp2MQgYuMp7hCw=" />
        <h3>student</h3>
        <p>student looking to build my resume based on company requirements.</p>
      </div>
    </div>
  );
};

const CategoryInto = ({ statusSelect, company, student }) => {
  return (
    <>
      <div className="sign-up-nav-btns">
        <button
          data-value="company"
          onClick={statusSelect}
          className={company && "active-btn-link"}
        >
          we are a company
        </button>
        <button
          data-value="student"
          onClick={statusSelect}
          className={student && "active-btn-link"}
        >
          i'm a student
        </button>
      </div>
    </>
  );
};

const StudentSignUp = ({ handleInputInfo, errorMsg }) => {
  return (
    <div className="comp-signup">
      {errorMsg && (
        <p className="error" style={{ color: "red" }}>
          {errorMsg}
        </p>
      )}
      <div>
        <label>Name</label>
        <input
          name="studentName"
          onChange={(e) => handleInputInfo(e)}
          placeholder="Jane"
        />
      </div>
      <div>
        <label>surname</label>
        <input
          name="studentSurname"
          onChange={(e) => handleInputInfo(e)}
          placeholder="Doe"
        />
      </div>
    </div>
  );
};
const StudentSignUpSecForm = ({
  signupbtn,
  handleInputInfo,
  errorMsg,
  passError,
}) => {
  return (
    <>
      <div className="comp-signup">
        {errorMsg && (
          <p className="error" style={{ color: "red" }}>
            {errorMsg}
          </p>
        )}
        <div>
          <label>Email</label>
          <input
            name="studentEmail"
            type="email"
            onChange={(e) => handleInputInfo(e)}
            placeholder="email.email@email.com"
          />
        </div>
        {passError && (
          <p className="error" style={{ color: "red" }}>
            {passError}
          </p>
        )}
        <div className="passwords">
          <div>
            <label>password</label>
            <input
              name="studentPassword"
              type="password"
              placeholder="8+ character minimum"
              onChange={(e) => handleInputInfo(e)}
            />
          </div>
          <div>
            <label>confirm password</label>
            <input
              name="confirmPasswordSt"
              type="password"
              placeholder="passwords must match"
              onChange={(e) => handleInputInfo(e)}
            />
          </div>
        </div>
      </div>
      <div className="signup-btn">
        <button onClick={signupbtn}>create account</button>
      </div>
    </>
  );
};

const CompanyLogin = ({ handleInputInfo, errorMsg }) => {
  return (
    <div className="comp-signup">
      {errorMsg && (
        <p className="error" style={{ color: "red" }}>
          {errorMsg}
        </p>
      )}
      <div>
        <label>company name</label>
        <input
          name="compName"
          onChange={(e) => handleInputInfo(e)}
          placeholder="Nash Paints"
        />
      </div>
      <div>
        <label>email</label>
        <input
          name="compEmail"
          type="email"
          placeholder="email.email@email.com"
          onChange={(e) => handleInputInfo(e)}
        />
      </div>
    </div>
  );
};

const CompDepts = ({ handleInputInfo, signupbtn, passError }) => {
  return (
    <>
      <div className="comp-signup passwords">
        {passError && (
          <p className="error" style={{ color: "red" }}>
            {passError}
          </p>
        )}
        <div>
          <label>password</label>
          <input
            name="compPassword"
            type="password"
            placeholder="8+ character minimum"
            onChange={(e) => handleInputInfo(e)}
          />
        </div>
        <div>
          <label>confirm password</label>
          <input
            name="confirmCompPassword"
            type="password"
            placeholder="passwords must match"
            onChange={(e) => handleInputInfo(e)}
          />
        </div>
      </div>
      <div className="signup-btn">
        <button onClick={signupbtn}>create an account</button>
      </div>
    </>
  );
};
