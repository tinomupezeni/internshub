import React, { useState } from "react";
import { Document, Page } from "react-pdf";
// import { pdfjsLib } from 'pdfjs-dist/build/pdf';
import pdfJS from 'pdfjs-dist/build/pdf.js';

import CVPreview from "./CVPreview";
import "./CV.css";
pdfJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.js';
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function CV() {
  const [uploadCv, setUploadCv] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const previewCv = () => {
    setUploadCv(true);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <div className="cv">
        <Document
          file="https://interns-cvs.s3.amazonaws.com/Interns+Hub+(Security).pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
        <button onClick={previewCv} className="cv-preview">
          {uploadCv ? "edit cv" : "cv preview"}
        </button>
        {uploadCv && <CVPreview />}
      </div>
    </>
  );
}
// s3://interns-cvs/Interns Hub (Security).pdf
