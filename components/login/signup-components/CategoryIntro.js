import React from "react";

export default function CategoryInto({ statusSelect, company, student }) {
  return (
    <>
      <div className="sign-up-nav-btns">
        <button
          data-value="student"
          onClick={statusSelect}
          className={student ? "active-btn-link" : ""}
        >
          i'm a student
        </button>
        <button
          data-value="company"
          onClick={statusSelect}
          className={company ? "active-btn-link" : ""}
        >
          we are a company
        </button>
      </div>
    </>
  );
}
