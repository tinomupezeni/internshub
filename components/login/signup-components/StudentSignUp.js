import DOMPurify from "dompurify";

const StudentSignUp = ({ formik }) => {
  const handleSanitize = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    formik.setFieldValue(event.target.name, sanitizedValue);
  };
  return (
    <>
      <div className="comp-signup">
        <div>
          <label>Name</label>
          <input
            name="studentName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.studentName}
            placeholder="Jane"
          />
          {formik.errors.studentName ? (
            <div className="text-danger">{formik.errors.studentName}</div>
          ) : null}
        </div>
        <div>
          <label>surname</label>
          <input
            name="studentSurname"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.studentSurname}
            placeholder="Doe"
          />
          {formik.errors.studentSurname ? (
            <div className="text-danger">{formik.errors.studentSurname}</div>
          ) : null}
        </div>
      </div>
      <div className="comp-signup">
        <div>
          <label>Email</label>
          <input
            name="studentEmail"
            type="email"
            placeholder="email.email@email.com"
            onChange={handleSanitize}
            value={formik.values.studentEmail}
          />
          {formik.errors.studentEmail ? (
            <div className="text-danger">{formik.errors.studentEmail}</div>
          ) : null}
        </div>
        <div className="passwords">
          <div>
            <label>password</label>
            <input
              name="studentPassword"
              type="password"
              placeholder="password"
              onChange={handleSanitize}
              value={formik.values.studentPassword}
            />
            {formik.errors.studentPassword ? (
              <div className="text-danger">{formik.errors.studentPassword}</div>
            ) : null}
          </div>
          <div>
            <label>confirm password</label>
            <input
              name="confirmPasswordSt"
              type="password"
              placeholder="confirm password"
              onChange={handleSanitize}
              value={formik.values.confirmPasswordSt}
            />
            {formik.errors.confirmPasswordSt ? (
              <div className="text-danger">
                {formik.errors.confirmPasswordSt}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSignUp;
