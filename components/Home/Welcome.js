import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <>
      <div className="welcome">
        <Hometext />
        <InternsText />
        <EmployersText />
      </div>
    </>
  );
}

const Hometext = ({}) => {
  return (
    <>
      <div className="wel-comp">
        <div className="bk-image">
          <div className="home-text">
            <h1>building and connecting interns with employers</h1>
            <p>
              Interns, enhance your CV here. Employers, find top talent at
              Interns Hub - where opportunities meet ambition
            </p>
            <Link to="/get-started">
              <button>Get started</button>
            </Link>
          </div>
        </div>
        <div className="welcome-logo">
          <img
            src="https://media.istockphoto.com/id/1478060507/photo/internship-programs-concept-chart-with-keywords-and-icons-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=onLXYxmbT2gPO938A1IfUZm1I_o_tDfaR4bXa2XhTco="
            alt=""
          />
        </div>
      </div>
    </>
  );
};
const InternsText = ({}) => {
  return (
    <>
      <div className="wel-comp comp-reversed">
        <div className="welcome-logo">
          <img src="https://media.istockphoto.com/id/1604037104/photo/group-of-happy-medical-and-nursing-at-the-university-looking-at-camera.webp?b=1&s=170667a&w=0&k=20&c=Q8G3D8VXg_m9xRsnNblok41pob-iMpNpYuGDJPQxXhU=" />
        </div>
        <div className="bk-image">
          <div className="home-text">
            <h1>
              Interns, tailor your portfolio according to employers standards
            </h1>
            <p>
              Interns, this is your platform to shine. Enhance your CV, showcase
              your skills, and connect with top employers. Interns Hub is your
              stepping stone to a successful career.
            </p>
            <Link to="/get-started">
              <button>Get started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
const EmployersText = ({}) => {
  return (
    <div className="wel-comp">
      <div className="bk-image">
        <div className="home-text">
          <h1>
            Employers, discover top talent from across the country at Interns
            Hub
          </h1>
          <p>
            Employers, Interns Hub is your go-to platform for recruiting the
            brightest interns. Here, you can explore a diverse pool of talent,
            evaluate their skills through comprehensive CVs, and recruit interns
            who align with your company's ambitions.
          </p>
          <Link to="/get-started">
            <button>Get started</button>
          </Link>
        </div>
      </div>
      <div className="welcome-logo">
        <img src="https://media.istockphoto.com/id/1457731656/photo/abstract-paper-figures-of-people-under-black-magnifying-glass-on-a-blue-background.webp?b=1&s=170667a&w=0&k=20&c=b9nG9he3FJ_R0hdaY4MTDOKHRfwrdm42HMApBa4BjIs=" />
      </div>
    </div>
  );
};
