import React, { useState, useEffect } from "react";
import "./Login.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CategoryInto from "./signup-components/CategoryIntro";
import DOMPurify from "dompurify";
import Server from "../Hero/Server";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    errorMsg: "",
    loggin: false,
    company: false,
    student: true,
    status: "student",
    isLoading: false,
  });

  let navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading();
      if (state.status === "student") {
        Server.loginstudent(values).then(
          () => {
            resetIsLoading();
            navigate("/student-home");
          },
          (error) => {
            setState((prevState) => {
              return {
                ...prevState,
                errorMsg:
                  error.response.data.error.non_field_errors?.[0] ||
                  error.response.data.error.email?.[0],
              };
            });
            resetIsLoading();
          }
        );
      } else {
        setState((prevState) => {
          return {
            ...prevState,
            company: true,
            student: false,
            status: "company",
          };
        });
        Server.logincompany(values).then(
          () => {
            resetIsLoading();
            navigate("/company-departments");
          },
          (error) => {
            setState((prevState) => {
              return {
                ...prevState,
                errorMsg: error.response.data.error.non_field_errors[0],
              };
            });
            resetIsLoading();
          }
        );
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
            {state.errorMsg && (
              <p className="alert alert-danger" role="alert">
                {state.errorMsg}
              </p>
            )}
            <div className="signup-btn btn">
              <button type="submit" disabled={state.isLoading}>
                Log in{" "}
                <span
                  className={`spinner-border spinner-border-sm ${
                    state.isLoading ? "" : "d-none"
                  }`}
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
