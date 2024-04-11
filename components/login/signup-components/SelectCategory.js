import React from "react";

export default function SelectCategory({statusSelect}) {
  return (
    <div className="account-option">
      <div
        style={{ border: "1px solid blue" }}
        data-value="company"
        onClick={statusSelect}
      >
        <img src="https://media.istockphoto.com/id/1490859962/photo/power-soft-skills-multi-skills-responsibility-hr-human-resources-concept-personal-attribute.jpg?s=612x612&w=0&k=20&c=ToS6Yl5eZgQUc0t9FWp7tHkabQvoEe0ge1PFbPYvf7A=" />
        <h3>company</h3>
        <p>company looking for potential interns.</p>
      </div>
      <div
        style={{ border: "1px solid orange" }}
        data-value="student"
        onClick={statusSelect}
      >
        <img src="https://media.istockphoto.com/id/1498104828/photo/beautiful-indian-female-student-portrait-while-looking-at-camera.jpg?s=612x612&w=0&k=20&c=XtSRUx8Q-AuN7hw6q_cS-sOyfjBpONp2MQgYuMp7hCw=" />
        <h3>student</h3>
        <p>student looking to build my resume based on company requirements.</p>
      </div>
    </div>
  );
}
