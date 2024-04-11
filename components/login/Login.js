import React, { useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CategoryInto from "./signup-components/CategoryIntro";
import DOMPurify from "dompurify";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    errorMsg: "",
    loggin: false,
    company: false,
    student: true,
    status: "student",
  });

  let navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Perform login logic here
      // If login is successful, navigate to the appropriate page
      if (state.status === "student") {
        setState((prevState) => {
          return {
            ...prevState,
            company: false,
            student: true,
            status: "student",
          };
        });
        navigate("/student-home");
      } else {
        setState((prevState) => {
          return {
            ...prevState,
            company: true,
            student: false,
            status: "company",
          };
        });
        navigate("/company-departments");
      }
    },
  });

  const handleSanitize = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    formik.setFieldValue(event.target.name, sanitizedValue);
  };

  const statusSelect = (e) => {
    const value = e.currentTarget.getAttribute("data-value");
    console.log(value);
    if (value === "company") {
      setState((prevState) => {
        return { ...prevState, company: true, student: false, status: value };
      });
    } else {
      setState((prevState) => {
        return { ...prevState, company: false, student: true, status: value };
      });
    }
  };
  return (
    <>
      <div className="login">
        <div className="intro-text">
          <h1>welcome back to interns hub</h1>
          <p>
            Are you ready to dive into the world of opportunities? Choose your
            status: Company or Intern, and let's dive in!
          </p>
        </div>
        <CategoryInto
          statusSelect={statusSelect}
          company={state.company}
          student={state.student}
        />
        <div className="comp-signup">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>Email</label>
              <input
                name="email"
                type="email"
                onChange={handleSanitize}
                value={formik.values.email}
                placeholder="email"
              />
              {formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                onChange={handleSanitize}
                value={formik.values.password}
                placeholder="password"
              />
              {formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="signup-btn btn">
              <button type="submit">Log in</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
