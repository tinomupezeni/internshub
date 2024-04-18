import React, { useState } from "react";
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
      Server.signupCompany(values).then(
        () => {
          navigate("/log-in");
        },
        (error) => {
          console.log(error);
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
      console.log("hi");
      console.log(values);
      // Perform signup logic here
      navigate("/log-in");
    },
  });

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
              <div className="signup-btn">
                <Button type="submit">create an account</Button>
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
              <div className="signup-btn">
                <Button type="submit">create an account</Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
