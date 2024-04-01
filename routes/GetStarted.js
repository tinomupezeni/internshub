import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Signup from "../components/login/Signup";
import LoginNavbar from "../components/navbar/LoginNavbar";

export default function GetStarted() {
  return (
    <>
      <LoginNavbar />
      <Signup />
      <Footer />
    </>
  );
}
