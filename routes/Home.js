import React from "react";
import Footer from "../components/Footer/Footer";
import Welcome from "../components/Home/Welcome";
import Navbar from '../components/navbar/Navbar'

function Home() {
  return (
    <div>
      <Navbar />
      <Welcome />
      <Footer />
    </div>
  );
}

export default Home
