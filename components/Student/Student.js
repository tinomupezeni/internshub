import React, { useState } from "react";
import "./Student.css";

import CV from "./Cv/CV";
import { useUser } from "../Hero/UserProvider";

export default function Student() {
  const {loggedInData} = useUser()
  return (
    <>
      <div className="student">
        <div className="student-heading">
          <h1>Welcome, {loggedInData.name} {loggedInData.surname}!</h1>
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
