import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import Box from "@mui/material/Box";
import AutoResizingTextarea from "../../Hero/AutoResizingTextarea";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useState, useEffect, useRef } from "react";
import Server from "../../Hero/Server";
import Dropzone from "dropzone";
import axios from "axios";
import "./Ai.css";
import { useFormik } from "formik";
import { useUser } from "../../Hero/UserProvider";
const API_URL = "http://localhost:8000/";

const UploadPdf = () => {
  const token = localStorage.getItem("token");
  const uploadRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { loggedInData } = useUser();
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const uploadUrl = "student/upload-project/";

  let navigate = useNavigate();
  const [state, setState] = useState({
    departments: [],
    institution: [],
    isLoading: false,
    uploading: false,
    settingsData: [],
    institutionId: null,
    departmentId: null,
    errorMsg: "",
    successMsg: "",
    myDropzoneInst: null,
    isMyDropzoneReady: false,
  });
  const resetIsLoading = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: false,
      };
    });
  };

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      await axios.post(API_URL + uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${loggedInData.token}`,
        },
      });

      setUploadedFile(acceptedFiles[0]);
      setUploadError(null);
    } catch (error) {
      setUploadError("An error occurred during upload. Please try again.");
    }
  };

  const handleSanitize = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    formik.setFieldValue(event.target.name, sanitizedValue);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },

    onSubmit: (values) => {
      setIsLoading();
      const data = {};
      if (values.title) {
        data.title = values.title;
      }
      if (values.description) {
        data.description = values.description;
      }

      state.myDropzoneInst.on("sending", (file, xhr, formData) => {
        formData.append("X-CSRFToken", getCsrfToken());
        formData.append("title", values.title);
        formData.append("description", values.description);
      });
      state.myDropzoneInst.processQueue();
      setState((prevState) => {
        return {
          ...prevState,
          uploading: true,
        };
      });
    },
  });

  const resetForm = () => {
    // Reset formik values
    formik.resetForm();

    // Remove all files from Dropzone
    if (state.myDropzoneInst) {
      state.myDropzoneInst.removeAllFiles(true);
    }
    setState((prevState) => {
      return {
        ...prevState,
        uploading: false,
      };
    });
  };

  useEffect(() => {
    setUploadProgress(0);
    const myDropzone = new Dropzone(uploadRef.current, {
      headers: {
        "X-Requested-With": null,
        Authorization: `Token ${token}`,
      },
      autoProcessQueue: false,
      url: API_URL + uploadUrl,
      acceptedFiles: ".mp4",
      maxFiles: 1,
      parallelUploads: 1,
      addRemoveLinks: true,
      chunking: false,
      init: function () {
        this.on("sending", (file, xhr, formData) => {
          formData.append("X-CSRFToken", getCsrfToken());
          formData.append("title", formik.values.title);
          formData.append("description", formik.values.description);
        });
        // this.on("drop", onDrop);
      },
    });

    myDropzone.on("error", function (file, message) {
      console.log("Upload error: ", message);
      setState((prevState) => {
        return {
          ...prevState,
          errorMsg: "troublesome network connection",
          uploading: false,
        };
      });
    });

    myDropzone.on("success", (file, response) => {
      resetForm();
      setState((prevState) => {
        return {
          ...prevState,
          uploading: false,
          successMsg: response.message,
        };
      });
    });

    setState((prevState) => {
      return {
        ...prevState,
        myDropzoneInst: myDropzone,
      };
    });
    setState((prevState) => {
      return {
        ...prevState,
        isMyDropzoneReady: true,
      };
    });

    return () => {
      myDropzone.destroy();
      setIsLoading(false);
    };
  }, []);
  const getCsrfToken = async () => {
    try {
      const response = await axios.get(API_URL + "student/upload-cv/token/");
      return response.data.csrf_token;
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      <div className="dropzone-container">
        {state.errorMsg && (
          <p className="alert alert-danger" role="alert">
            {state.errorMsg}
          </p>
        )}
        {state.successMsg && (
          <p className="alert alert-success text-center" role="alert">
            {state.successMsg}
          </p>
        )}
        <div ref={uploadRef} className="dropzone">
          <p className="alert alert-info" role="alert">
            click to select a video to upload,
            <br /> <b>don't drop, select</b>{" "}
          </p>
        </div>
        {state.uploading && (
          <div
            style={{
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
            className="alert alert-success text-center"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style={{
                height: "50px",
              }}
            >
              <div className="spinner-border text-primary" role="status">
                <span class="visually-hidden"></span>
              </div>
            </div>
            <p>
              <b>processing your project...</b>
            </p>
          </div>
        )}
        {uploadSuccess && (
          <p className="alert alert-success text-center" role="alert">
            {uploadSuccess}
          </p>
        )}
        {uploadedFile && (
          <p className="alert alert-danger" role="alert">
            {" "}
            File uploaded: {uploadedFile.name}
          </p>
        )}
        {uploadError && (
          <p className="alert alert-danger" role="alert">
            {uploadError}
          </p>
        )}
      </div>
      <Inputs
        formik={formik}
        handleSanitize={handleSanitize}
        isLoading={state.isLoading}
        isMyDropzoneReady={state.isMyDropzoneReady}
        resetForm={resetForm}
      />
    </>
  );
};

export default UploadPdf;

const Inputs = ({ formik, isLoading, isMyDropzoneReady, resetForm }) => {
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <>
          <div className="comp-signup settings-input">
            <div>
              <label>
                <div style={{ display: "flex" }}>
                  {!formik.values.title && (
                    <span className="red-dot-input"></span>
                  )}
                </div>
                <span>title</span>
              </label>
              <input
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Software engineering"
              />
            </div>
            <div>
              <label>
                <div>
                  {!formik.values.description && (
                    <span className="red-dot-input"></span>
                  )}
                </div>
                description
              </label>
              <div
                style={{
                  width: "100%",
                  border: "1px solid #000",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <AutoResizingTextarea
                  name="description"
                  type="text"
                  style={{ width: "100%", border: "1px solid" }}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  placeholder="software engineering student, proficient in..."
                />
              </div>
            </div>
          </div>
          <div className="row" style={{ margin: "0 auto" }}>
            <div className="col">
              <button
                className="btn btn-success"
                type="submit"
                disabled={!isMyDropzoneReady}
              >
                done{" "}
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
                className="btn btn-danger"
                onClick={resetForm}
                type="submit"
              >
                Cancel{" "}
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
