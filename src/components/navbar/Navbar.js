import React from "react";
import Logo from '../../assets/Logo Files/For Web/png/Color logo - no background.png'
import './Navbar.css'

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={Logo} />
        </div>
      </div>
    </>
  );
}
