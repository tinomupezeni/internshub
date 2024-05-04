import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Server from "../../Hero/Server";
import { isValidPhoneNumber } from "libphonenumber-js";
import countryCodes from "country-codes-list";

export default function VerifyEmail({ signupdata }) {
  const [state, setState] = useState({
    isLoading: false,
    codeSent: false,
    callCodes: [],
    callCode: "+263",
    phoneNumber: "",
    errorMsg: "",
    successMsg: "",
    countDown: false,
  });
  const [seconds, setSeconds] = useState(120);
  let navigate = useNavigate();

  const myCountryCodesObject = countryCodes.customList(
    "countryCode",
    "+{countryCallingCode}"
  );
  const handleCountryCode = (e) => {
    const selectedCountry = e.target.value.split(" ")[1].replace(/\D/g, "");
    setState((prevState) => {
      return {
        ...prevState,
        callCode: selectedCountry,
      };
    });
  };
  const validatePhoneNumber = (phoneNumber) => {
    const isValid = isValidPhoneNumber(
      state.callCode + phoneNumber,
      state.callCode
    );
    return isValid;
  };

  const handleSanitize = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    formik.setFieldValue(event.target.name, sanitizedValue);
  };
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
  // send data to backend
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    onSubmit: (values) => {
      setIsLoading();
      const isValidNumber = validatePhoneNumber(values.phoneNumber);
      if (isValidNumber) {
        Server.sendEmail(state.callCode + values.phoneNumber).then(
          () => {
            setState((prevState) => {
              return {
                ...prevState,
                successMsg:
                  "verification code successfully sent, please check your phone",
                codeSent: true,
                phoneNumber: state.callCode + values.phoneNumber,
              };
            });
            setSeconds(120);
            resetIsLoading();
          },
          (error) => {
            resetIsLoading();
            setState((prevState) => {
              return {
                ...prevState,
                errorMsg:
                  "network error, please check your network and try again",
              };
            });
          }
        );
      } else {
        resetIsLoading();
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg:
              "invalid phone number, please verify your phone number format",
          };
        });
      }
      setState((prevState) => {
        return {
          ...prevState,
          data: values,
          verifyPhone: true,
        };
      });
    },
  });

  const resendCode = () => {
    console.log(state.callCode + state.phoneNumber);
    Server.sendEmail(state.phoneNumber).then(
      () => {
        setState((prevState) => {
          return {
            ...prevState,
            successMsg:
              "verification code successfully sent, please check your phone",
            codeSent: true,
          };
        });
        setSeconds(120);
        resetIsLoading();
      },
      (error) => {
        resetIsLoading();
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg: "network error, please check your network and try again",
          };
        });
      }
    );
  };
  const codeformik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      setIsLoading();
      if (values.code === "") {
        resendCode();
      } else {
        Server.sendReceivedEmailCode(state.phoneNumber, values.code).then(
          () => {
            signupdata.phoneNumber = state.phoneNumber;
            if (signupdata.status === "student") {
              Server.signupStudent(signupdata).then(
                () => {
                  resetIsLoading();
                  navigate("/log-in", {
                    state: { successMsg: "signup successfull! please log in." },
                  });
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
            } else {
              Server.signupCompany(signupdata).then(
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
            }
          },
          (error) => {}
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
    setState((prevState) => {
      return {
        ...prevState,
        callCodes: Object.entries(myCountryCodesObject),
      };
    });
  }, []);
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
              your phone number is used for user verification when you sign in
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
        {!state.codeSent ? (
          <form onSubmit={formik.handleSubmit}>
            <SendPhonenumber
              handleCountryCode={handleCountryCode}
              formik={formik}
              handleSanitize={handleSanitize}
              isLoading={state.isLoading}
              callCodes={state.callCodes}
            />
          </form>
        ) : (
          <form onSubmit={codeformik.handleSubmit}>
            <SendCode
              codeformik={codeformik}
              handleSanitize={handleCodeSanitize}
              isLoading={state.isLoading}
              minutes={minutes}
              displaySeconds={displaySeconds}
            />
          </form>
        )}
      </div>
    </>
  );
}

const SendPhonenumber = ({
  handleCountryCode,
  formik,
  handleSanitize,
  isLoading,
  callCodes,
}) => {
  return (
    <div>
      <label className="send-label">enter phone number</label>
      <div className="send-phonenumber">
        <select
          defaultValue="ZW"
          style={{
            border: "1px solid #383838",
            padding: "10px",
            borderRadius: "4px",
          }}
          onClick={handleCountryCode}
        >
          <option selected disabled>
            ZW (+263)
          </option>
          {callCodes.map(([countryCode, callCode]) => (
            <option key={countryCode} value={countryCode.callCode}>
              {countryCode} ({callCode})
            </option>
          ))}
        </select>
        <input
          type="number"
          name="phoneNumber"
          placeholder="712345678"
          value={formik.values.phoneNumber}
          onChange={handleSanitize}
        />
      </div>
      <div className="signup-btn" style={{ display: "flex" }}>
        <Button type="submit" disabled={!formik.values.phoneNumber}>
          verify phone number{" "}
          <span
            className={`spinner-border spinner-border-sm ${
              isLoading ? "" : "d-none"
            }`}
            role="status"
            aria-hidden="true"
          ></span>
        </Button>
      </div>
    </div>
  );
};

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
