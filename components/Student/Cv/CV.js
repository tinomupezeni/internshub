import React, { useState, useEffect } from "react";
import { Document, Page } from "@react-pdf/renderer";
import axios from "axios";
import "./CV.css";
import UploadPdf from "../../Hero/UploadPdf";
import { useUser } from "../../Hero/UserProvider";

const API_URL = "http://localhost:8000/";

export default function CV() {
  const token = localStorage.getItem("token");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadCv, setUploadCv] = useState(false);
  const {} = useUser();

  const previewCv = () => {
    setUploadCv(!uploadCv);
  };

  useEffect(() => {
    const fetchPDF = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_URL + "student/cv/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (response.status === 200) {
          setPdfUrl(response.data.presigned_url);
        } else {
          setError("An error occurred while downloading the PDF.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPDF();
  }, []);

  return (
    <>
      <div className="cv">
        {uploadCv ? (
          <UploadPdf />
        ) : (
          <ViewCv isLoading={isLoading} error={error} pdfUrl={pdfUrl} />
        )}
        <button onClick={previewCv} className="cv-preview">
          {!uploadCv ? "upload cv" : "view-cv"}
        </button>
      </div>
    </>
  );
}

const ViewCv = ({ isLoading, error, pdfUrl }) => {
  return (
    <div>
      {isLoading && (
        <p>
          fetching your cv{" "}
          <span
            className={`spinner-border spinner-border-sm ${
              isLoading ? "" : "d-none"
            }`}
            role="status"
            aria-hidden="true"
          ></span>
        </p>
      )}
      {error && <p>Error: {error}</p>}
      {pdfUrl && (
        <div className="card">
          <div className="card-body">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                src={pdfUrl}
                width="100%"
                height="500px"
                title="Intern CV"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
