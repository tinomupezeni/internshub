import React, { useState } from "react";
import "./Motivational.css";
import FileUpload from "./FileUpload";

export default function Motivational() {
  const [uploadTemp, setUploadTemp] = useState(false);
  const uploadMotivationalLetter = () => {
    setUploadTemp(true);
  };
  return (
    <>
      <div className="motivational">
        <h1>motivational letter</h1>
        <p>
          A motivational letter is your chance to present yourself and make a
          strong case for your candidacy.{" "}
        </p>
        {!uploadTemp ? (
          <MotiText />
        ) : (
          <div className="upload-pdf">
            <FileUpload />
          </div>
        )}
        <button onClick={uploadMotivationalLetter}>upload letter</button>
      </div>
    </>
  );
}

const MotiText = () => {
  return (
    <>
      <p>
        It’s an opportunity to express your passion for the role, explain how
        your skills and experiences align with what we’re looking for, and
        convey your unique qualities that set you apart from other candidates.
      </p>{" "}
      <h3>
        Here are some tips to help you write an effective motivational letter:
      </h3>
      <ul>
        <li>
          <p>
            <strong>Start with a Strong Opening: </strong> <br /> Your opening
            paragraph should grab the reader’s attention. You could start by
            explaining why you’re interested in the role or the industry.
          </p>
        </li>
        <li>
          <p>
            <strong>Showcase Your Skills and Experiences:</strong> <br />
            Highlight relevant skills and experiences that make you a strong
            candidate for the role. Use specific examples to demonstrate these
            skills.
          </p>
        </li>
        <li>
          <p>
            <strong> Express Your Enthusiasm:</strong> <br />
            Show your passion for the role and the company. Explain why you’re
            interested in the industry and how you can contribute to the
            company’s mission.
          </p>
        </li>
        <li>
          <p>
            <strong>Be Professional and Positive: </strong> <br />
            Maintain a professional tone throughout your letter. Be positive and
            express your eagerness to contribute and learn.
          </p>
        </li>
        <li>
          <p>
            <strong>Proofread:</strong>
            <br /> Make sure your letter is free of spelling and grammatical
            errors. A well-written, error-free letter shows that you pay
            attention to detail.
          </p>
        </li>
      </ul>
      <p>
        <strong>still need clarity, checkout our ai chat bot</strong>
      </p>
    </>
  );
};
