import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function FileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      })
      .then(() => {
        setUploadProgress(0);
      })
      .catch(() => {
        setUploadProgress(0);
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      {uploadProgress > 0 && (
        <progress max="100" value={uploadProgress}>
          {uploadProgress}%
        </progress>
      )}
    </div>
  );
}

export default FileUpload;
