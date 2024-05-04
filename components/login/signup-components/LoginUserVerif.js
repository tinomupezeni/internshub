import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Server from "../../Hero/Server";
import secureLocalStorage from "react-secure-storage";

export default function LoginUserVerif({ status }) {
  const [state, setState] = useState({
    isLoading: false,
    errorMsg: "",
    successMsg: "",
    countDown: false,
  });
  const [seconds, setSeconds] = useState(120);
  let navigate = useNavigate();
  const loggedInData = secureLocalStorage.getItem("loggedInData");

  const handleCodeSanitize = (event) => {
    console.log(event);
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    codeformik.setFieldValue(event.target.name, sanitizedValue);
  };

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
  const profileData = () => {
    Server.getstudentSettings().then(
      (response) => {
        resetIsLoading();
        secureLocalStorage.setItem("studentProfileData", response.data);
        navigate("/student-home");
      },
      (error) => {
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg:
              error?.response?.data?.error?.non_field_errors?.[0] ||
              error?.response?.data?.error?.email?.[0] ||
              error?.response?.data?.error ||
              "an internal error has occurred, please try again",
          };
        });
        resetIsLoading();
      }
    );
  };

  const resendCode = () => {
    setIsLoading();
    setSeconds(120);
    if (status === "student") {
      Server.getStudentVerifCode().then(
        () => {
          resetIsLoading();
        },
        () => {
          resetIsLoading();
          setState((prevState) => {
            return {
              ...prevState,
              errorMsg: "an internal error occured, please try agin later",
            };
          });
        }
      );
    } else {
      Server.getCompVerifCode().then(
        () => {
          resetIsLoading();
        },
        () => {
          resetIsLoading();
          setState((prevState) => {
            return {
              ...prevState,
              errorMsg: "an internal error occured, please try agin later",
            };
          });
        }
      );
    }
  };
  const codeformik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      setIsLoading();
      if (values.code === "") {
        resendCode();
        return;
      }
      if (status === "student") {
        Server.sendStudentLoginVerifCode(values.code).then(
          (response) => {
            let loggedInData = secureLocalStorage.getItem("loggedInData");

            loggedInData = {
              ...loggedInData,
              ...response.data,
            };
            secureLocalStorage.setItem("loggedInData", loggedInData);
            profileData();
          },
          (error) => {
            setState((prevState) => {
              return {
                ...prevState,
                errorMsg:
                  error?.response?.data?.error ||
                  error?.response?.data?.error?.email?.[0] ||
                  "an internal error has occurred, please try again",
              };
            });
            resetIsLoading();
          }
        );
      } else {
        Server.sendCompLoginVerifCode(values.code).then(
          (response) => {
            let loggedInData = secureLocalStorage.getItem("loggedInData");
            loggedInData = {
              ...loggedInData,
              ...response.data,
            };

            secureLocalStorage.setItem("loggedInData", loggedInData);
            resetIsLoading();
            navigate("/company-departments");
          },
          (error) => {
            setState((prevState) => {
              return {
                ...prevState,
                errorMsg:
                  error?.response?.data?.error ||
                  error?.response?.data?.error?.email?.[0] ||
                  "an internal error has occurred, please try again",
              };
            });
            resetIsLoading();
          }
        );
      }
    },
  });

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [seconds]);
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
  }, [state.errorMsg]);
  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;
  return (
    <>
      <div>
        <div className="comp-signup">
          {!state.errorMsg && !state.successMsg && (
            <p className="alert alert-info text-center" role="alert">
              a verification code has been sent to your phone number that ends
              in <b>{loggedInData.phoneNumber}</b>
            </p>
          )}
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
        </div>

        <form onSubmit={codeformik.handleSubmit}>
          <SendCode
            codeformik={codeformik}
            handleSanitize={handleCodeSanitize}
            isLoading={state.isLoading}
            minutes={minutes}
            displaySeconds={displaySeconds}
          />
        </form>
      </div>
    </>
  );
}

const SendCode = ({
  codeformik,
  handleSanitize,
  isLoading,
  minutes,
  displaySeconds,
}) => {
  return (
    <div className="comp-signup">
      <>
        <div>
          <input
            type="number"
            name="code"
            style={{ textAlign: "center", letterSpacing: "0.9rem" }}
            placeholder="712345"
            value={codeformik.values.code}
            onChange={handleSanitize}
          />
        </div>
        <div className="signup-btn" style={{ display: "flex" }}>
          <Button
            type="submit"
            disabled={displaySeconds !== 0 && !codeformik.values.code}
          >
            {displaySeconds === 0 && !codeformik.values.code
              ? "resend code"
              : "verify phone number"}
            <span
              className={`spinner-border spinner-border-sm ${
                isLoading ? "" : "d-none"
              }`}
              role="status"
              aria-hidden="true"
            ></span>
          </Button>
        </div>
        <p>
          resend code in: {minutes}:{displaySeconds < 10 ? "0" : ""}
          {displaySeconds}{" "}
        </p>
      </>
    </div>
  );
};
