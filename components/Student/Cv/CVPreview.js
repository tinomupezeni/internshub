import React, { useState } from "react";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";

export default function CVPreview() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (selectedFile) {
      // Step 1: Send the file name to your Django server to get a pre-signed URL
      const response = await axios.get(
        `/presigned-url?file_name=${selectedFile.name}`
      );
      const presignedUrl = response.data.url;

      // Step 2: Use the pre-signed URL to upload the file to S3
      const result = await axios.put(presignedUrl, selectedFile, {
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (result.status === 200) {
        console.log("Upload Success");
      } else {
        console.log("Upload Failed");
      }
    }
  };

  return (
    <>
      <div className="cv">
        <h2>Your CV in PDF format</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
        <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
      </div>
    </>
  );
}
