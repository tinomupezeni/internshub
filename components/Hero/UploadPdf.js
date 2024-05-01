import React, { useState, useEffect, useRef } from "react";
import Dropzone from "dropzone";
import axios from "axios"; // For API requests
const API_URL = "http://localhost:8000/";

const UploadPdf = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const uploadRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const uploadUrl = "student/upload-cv/";

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      await axios.post(API_URL + uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfToken,
          Authorization: `Token ${token}`,
        },
      });

      setUploadedFile(acceptedFiles[0]);
      setUploadError(null);
    } catch (error) {
      setUploadError("An error occurred during upload. Please try again.");
    }
  };

  useEffect(() => {
    const myDropzone = new Dropzone(uploadRef.current, {
      headers: {
        "X-Requested-With": null,
        Authorization: `Token ${token}`,
      },
      url: API_URL + uploadUrl,
      acceptedFiles: ".pdf",
      maxFiles: 1,
      parallelUploads: 1,
      addRemoveLinks: true,
      dictCancelUpload: "Cancel Upload",
      dictRemoveFile: "Remove File",
      chunking: false,

      // Call upload function on sending
      init: function () {
        this.on("sending", (file, xhr, formData) => {
          formData.append("X-CSRFToken", getCsrfToken());
        });
        this.on("drop", onDrop);
      },
    });
    
    console.log("token", token);
    getCsrfToken();
    return () => {
      myDropzone.destroy();
    };
  }, []);

  const getCsrfToken = async () => {
    try {
      const response = await axios.get(API_URL + "student/upload-cv/token/");
      setCsrfToken(response.data.csrf_token);
      return response.data.csrf_token;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="dropzone-container">
      <div ref={uploadRef} className="dropzone">
        <p>click to select a pdf to upload</p>
      </div>
      {uploadedFile && <p>File uploaded: {uploadedFile.name}</p>}
      {uploadError && (
        <p className="alert alert-danger" role="alert">
          {uploadError}
        </p>
      )}
    </div>
  );
};

export default UploadPdf;
