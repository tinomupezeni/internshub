import React, { useState } from "react";
import "./Student.css";

import CV from "./Cv/CV";

export default function Student() {
  return (
    <>
      <div className="student">
        <div className="student-heading">
          <h1>Welcome, Tino!</h1>
          <p>
            Feel free to upload, edit, and share your latest work. We're excited
            to see what you create!
          </p>
        </div>
        <CV />
      </div>
    </>
  );
}
