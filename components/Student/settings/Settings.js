import React, { useEffect, useState } from "react";
import Server from "../../Hero/Server";
import { useUser } from "../../Hero/UserProvider";
import "./Settings.css";
import { useFormik } from "formik";
import AutoResizingTextarea from "../../Hero/AutoResizingTextarea";
import DOMPurify from "dompurify";

export default function Settings() {
  const { loggedInData } = useUser();
  const [state, setState] = useState({
    departments: [],
    institution: [],
    isLoading: false,
    settingsData: [],
    institutionId: null,
    departmentId: null,
    errorMsg: "",
    successMsg: "",
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
  const handleSanitize = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    formik.setFieldValue(event.target.name, sanitizedValue);
  };
  const formik = useFormik({
    initialValues: {
      studyProgram: "",
      intro: "",
    },

    onSubmit: (values) => {
      setIsLoading();
      const data = {};
      if (values.intro) {
        data.intro = values.intro;
      }
      if (values.studyProgram) {
        data.studyProgram = values.studyProgram;
      }
      if (state.departmentId) {
        data.departmentId = state.departmentId;
      }
      if (state.institutionId) {
        data.institutionId = state.institutionId;
      }
      console.log(data);
      Server.studentSettings(data, loggedInData.token).then(
        () => {
          resetIsLoading();
          // navigate("/log-in");
          setState((prevState) => {
            return {
              ...prevState,
              successMsg: error.response.data.error,
            };
          });
        },
        (error) => {
          resetIsLoading();
          if (error.response && error.response.status === 401) {
            navigate("/log-in");
          }
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
  const fetchDept = () => {
    //  Server.getAllDept(loggedInData.token).then(
    //    (response) => {
    //      setState((prevState) => {
    //        return {
    //          ...prevState,
    //          departments: response.data,
    //        };
    //      });
    //    },
    //    (error) => {
    //      console.log(error);
    //      setState((prevState) => {
    //        return {
    //          ...prevState,
    //          errorMsg: error.response.data,
    //        };
    //      });
    //    }
    //  );
  };

  const compAddDept = (e) => {
    const dep = JSON.parse(e.target.value);
    setState((prevState) => {
      return {
        ...prevState,
        departmentId: dep.departmentId,
      };
    });
  };
  const selectInst = (e) => {
    const inst = JSON.parse(e.target.value);
    setState((prevState) => {
      return {
        ...prevState,
        institutionId: inst.institutionId,
      };
    });
  };

  

  useEffect(fetchDept, []);
  useEffect(() => {
    const handleDismissError = (event) => {
      if (
        (state.errorMsg || state.successMsg) &&
        !event.target.closest(".alert")
      ) {
        setState((prevState) => {
          return {
            ...prevState,
            errorMsg: "",
            successMsg: "",
          };
        });
      }
    };

    window.addEventListener("click", handleDismissError);

    return () => {
      window.removeEventListener("click", handleDismissError);
    };
  }, [state.errorMsg, state.successMsg]);
  return (
    <>
      <div className="settings">
        <div>
          <h1>settings</h1>
          <p>
            Welcome to your personalized settings! Whether you’re fine-tuning
            your preferences or customizing your experience, this is the place
            to do it.
          </p>
        </div>
        <p className="alert alert-danger text-center">
          please complete your profile
        </p>
        <SettingsInput
          formik={formik}
          handleSanitize={handleSanitize}
          institution={state.institution}
          selectInst={selectInst}
          isLoading={state.isLoading}
          compAddDept={compAddDept}
          departments={state.departments}
        />
      </div>
    </>
  );
}

const SettingsInput = ({
  formik,
  handleSanitize,
  institution,
  selectInst,
  isLoading,
  compAddDept,
  departments,
}) => {
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <>
          <div className="comp-signup settings-input">
            <div className="select">
              <label>department</label>
              <select
                id="departmentSelect"
                class="form-select"
                onChange={(e) => compAddDept(e)}
              >
                <option selected disabled>
                  Select your department
                </option>
                {departments &&
                  departments.map((dep, index) => (
                    <option value={JSON.stringify(dep)} key={index}>
                      {dep.department}
                    </option>
                  ))}
              </select>
            </div>
            <div className="select">
              <label>institution</label>
              <select
                id="departmentSelect"
                class="form-select"
                onChange={(e) => selectInst(e)}
              >
                <option selected disabled>
                  Select your institution
                </option>
                {institution &&
                  institution.map((inst, index) => (
                    <option value={JSON.stringify(inst)} key={index}>
                      {inst.institution}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>study program</label>
              <input
                name="studyProgram"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.studyProgram}
                placeholder="Software engineering"
              />
            </div>
            <div>
              <label>self introduction</label>
              <div
                style={{
                  width: "100%",
                  border: "1px solid #000",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <AutoResizingTextarea
                  name="intro" // Add the name attribute
                  type="text"
                  style={{ width: "100%", border: "1px solid" }}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.intro}
                  placeholder="software engineering student, proficient in..."
                />
              </div>
            </div>
          </div>
          <div className="row" style={{ margin: "0 auto" }}>
            <div className="col">
              <button
                className="btn btn-danger"
                // onClick={() => deleteCompDeptBtn(dep.departmentId)}
                type="submit"
              >
                delete account{" "}
                <span
                  className={`spinner-border spinner-border-sm ${
                    isLoading ? "" : "d-none"
                  }`}
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-success"
                // onClick={() => saveNewReq()}
                type="submit"
              >
                save{" "}
                <span
                  className={`spinner-border spinner-border-sm ${
                    isLoading ? "" : "d-none"
                  }`}
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </div>
        </>
      </form>
    </>
  );
};
