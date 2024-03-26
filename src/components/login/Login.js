import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    errorMsg: "",
    loggin: false,
  });

  const handleInputInfo = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  let navigate = useNavigate();
  const loginbtn = () => {
    if (!state.password || !state.email) {
      setState((prevState) => {
        return { ...prevState, errorMsg: "invalid email or password" };
      });
    } else {
      const data = {
        email: state.email,
        password: state.password,
      };
      // after data backend processing.... then
      navigate("/student-profile");
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
      <div className="login">
        <label>
          {state.errorMsg ? (
            <p className="error" style={{ color: "red" }}>
              {state.errorMsg}
            </p>
          ) : (
            <p>Email</p>
          )}
        </label>
        <input name="email" type="email" onChange={(e) => handleInputInfo(e)} />
        <label>password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => handleInputInfo(e)}
        />

        <button onClick={loginbtn}>log in</button>
      </div>
    </>
  );
}
