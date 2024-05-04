import React from "react";

export default function CategoryInto({
  statusSelect,
  company,
  student,
  handleVerifyPhone,
}) {
  const startingPoint = (e) => {
    statusSelect(e);
    handleVerifyPhone(false);
  };
  return (
    <>
      <div className="sign-up-nav-btns">
        <button
          data-value="student"
          onClick={(e) => startingPoint(e)}
          className={student ? "active-btn-link" : ""}
        >
          i'm a student
        </button>
        <button
          data-value="company"
          onClick={(e) => startingPoint(e)}
          className={company ? "active-btn-link" : ""}
        >
          we are a company
        </button>
      </div>
    </>
  );
}
