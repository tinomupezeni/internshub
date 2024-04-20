import React, { useState, useEffect } from "react";
import Dropzone from "dropzone";
import axios from "axios"; // For API requests

const UploadPdf = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // Replace with your Django API endpoint URL
  const uploadUrl = "/api/v1/pdf-upload/";

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      setUploadedFile(acceptedFiles[0]);
      setUploadError(null); // Clear any previous errors on successful upload
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("An error occurred during upload. Please try again.");
    }
  };

  // Initialize Dropzone with security considerations (explained below)
  useEffect(() => {
    const myDropzone = new Dropzone("#pdf-dropzone", {
      url: uploadUrl, // Replace with your API endpoint
      acceptedFiles: ".pdf", // Only accept PDF files
      maxFiles: 1, // Limit to one file upload
      parallelUploads: 1, // Avoid overloading server with parallel uploads
      autoProcessQueue: false, // Manually trigger upload to control security

      // Security considerations
      addRemoveLinks: true, // Allow users to remove files before upload
      dictCancelUpload: "Cancel Upload", // Informative message
      dictRemoveFile: "Remove File", // Informative message
      chunking: false, // Disable file chunking for security (explained below)

      // Call upload function on sending
      init: function () {
        this.on("sending", (file, xhr, formData) => {
          // Add any necessary security headers to the request (e.g., CSRF token)
          formData.append("X-CSRFToken", getCsrfToken()); // Replace with your CSRF token retrieval function
        });
      },
    });

    // Cleanup function to remove event listeners
    return () => {
      myDropzone.destroy();
    };
  }, []);

  const getCsrfToken = () => {
    // Implement logic to retrieve the CSRF token from your Django backend (cookies, meta tag, etc.)
    // This example assumes you have a way to access the CSRF token
    return "your-csrf-token-here"; // Replace with actual token retrieval
  };

  return (
    <div className="dropzone-container">
      <div id="pdf-dropzone">
        <p>Drag and drop a PDF file here, or click to select.</p>
      </div>
      {uploadedFile && <p>File uploaded: {uploadedFile.name}</p>}
      {uploadError && <p className="error">{uploadError}</p>}
    </div>
  );
};

export default UploadPdf;
