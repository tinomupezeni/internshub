import React, { useState, useEffect } from "react";
import "./Signup.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SelectCategory from "./signup-components/SelectCategory";
import CategoryInto from "./signup-components/CategoryIntro";
import CompanySignUp from "./signup-components/CompanySignUp";
import StudentSignUp from "./signup-components/StudentSignUp";
import Button from "react-bootstrap/Button";
import Server from "../Hero/Server";

export default function Signup() {
  const [state, setState] = useState({
    student: false,
    company: false,
    isLoading: false,
    errorMsg: "",
  });
  let navigate = useNavigate();
  // change
  const [selectStatus, setSelectStatus] = useState(false);
  const [status, setStatus] = useState("");

  const statusSelect = (e) => {
    const value = e.currentTarget.getAttribute("data-value");
    console.log(value);
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

  const validationSchemaComp = Yup.object({
    compName: Yup.string().required("Required"),
    compEmail: Yup.string().email("Invalid email").required("Required"),
    compPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must contain 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character(@$!%*?&)"
      )
      .required("Required"),
    confirmCompPassword: Yup.string()
      .oneOf([Yup.ref("compPassword"), null], "Passwords must match")
      .required("Required"),
  });
  const validationSchemaIntern = Yup.object({
    studentName: Yup.string().required("Required"),
    studentSurname: Yup.string().required("Required"),
    studentEmail: Yup.string().email("Invalid email").required("Required"),
    studentPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must contain 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
      )
      .required("Required"),
    confirmPasswordSt: Yup.string()
      .oneOf([Yup.ref("studentPassword"), null], "Passwords must match")
      .required("Required"),
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
  // send data to backend
  const compFormik = useFormik({
    initialValues: {
      status: "company",
      compName: "",
      compEmail: "",
      compPassword: "",
      confirmCompPassword: "",
    },
    validationSchema: validationSchemaComp,
    onSubmit: (values) => {
      setIsLoading();
      Server.signupCompany(values).then(
        () => {
          resetIsLoading();
          navigate("/log-in");
        },
        (error) => {
          resetIsLoading();
          console.log(error);
          setState((prevState) => {
            return {
              ...prevState,
              errorMsg: error.response.data.error,
            };
          });
        }
      );
      // Perform signup logic here
    },
  });
  const InternFormik = useFormik({
    initialValues: {
      status: "student",
      studentName: "",
      studentSurname: "",
      studentEmail: "",
      studentPassword: "",
      confirmPasswordSt: "",
    },
    validationSchema: validationSchemaIntern,
    onSubmit: (values) => {
      setIsLoading();
      Server.signupStudent(values).then(
        () => {
          resetIsLoading();
          navigate("/log-in");
        },
        (error) => {
          resetIsLoading();
          console.log(error);
          setState((prevState) => {
            return {
              ...prevState,
              errorMsg: error.response.data.error,
            };
          });
        }
      );
    },
  });

  useEffect(() => {
    const handleDismissError = (event) => {
      if (state.errorMsg && !event.target.closest(".alert")) {
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg: "",
          };
        });
      }
    };

    window.addEventListener("click", handleDismissError);

    return () => {
      window.removeEventListener("click", handleDismissError); // Cleanup on unmount
    };
  }, [state.errorMsg]); // Run effect only when errorMsg changes

  return (
    <>
      <div className="sign-up">
        {!selectStatus ? (
          <>
            <div className="intro-text" style={{ textAlign: "center" }}>
              <h1>create an account</h1>
              <p>please select type of account you want to create</p>
            </div>
            <SelectCategory statusSelect={statusSelect} />
          </>
        ) : status === "company" ? (
          <>
            <div style={{ padding: "0" + 1 + "rem" }}>
              <h2 style={{ padding: 10 + "px" }}>
                create a new company account
              </h2>
              <p>Post job requirements and find matching students.</p>
            </div>
            <CategoryInto
              status={status}
              statusSelect={statusSelect}
              company={state.company}
              student={state.student}
            />
            <form onSubmit={compFormik.handleSubmit}>
              <CompanySignUp formik={compFormik} />
              {state.errorMsg && (
                <p className="alert alert-danger" role="alert">
                  {state.errorMsg}
                </p>
              )}
              <div className="signup-btn">
                <Button type="submit" disabled={state.isLoading}>
                  create an account{" "}
                  <span
                    className={`spinner-border spinner-border-sm ${
                      state.isLoading ? "" : "d-none"
                    }`}
                    role="status"
                    aria-hidden="true"
                  ></span>
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div style={{ padding: "0" + 1 + "rem" }}>
              <h2 style={{ padding: 10 + "px" }}>
                Sign Up for Your New Intern Account
              </h2>
              <p>
                Build your resume and find companies that match your skills.
              </p>
            </div>
            <CategoryInto
              status={status}
              statusSelect={statusSelect}
              company={state.company}
              student={state.student}
            />
            <form onSubmit={InternFormik.handleSubmit}>
              <StudentSignUp formik={InternFormik} />
              {state.errorMsg && (
                <p className="alert alert-danger" role="alert">
                  {state.errorMsg}
                </p>
              )}
              <div className="signup-btn">
                <Button type="submit" disabled={state.isLoading}>
                  create an account{" "}
                  <span
                    className={`spinner-border spinner-border-sm ${
                      state.isLoading ? "" : "d-none"
                    }`}
                    role="status"
                    aria-hidden="true"
                  ></span>
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
