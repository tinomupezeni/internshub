import React from "react";
import Student from "../components/Student/Student";
import Footer from "../components/Footer/Footer";
import StudentNav from "../components/navbar/StudentNav";

export default function StudentView() {
  return (
    <>
      <StudentNav />
      <Student />
    </>
  );
}
