import DOMPurify from "dompurify";
const CompanySignUp = ({ formik }) => {
  const handleSanitize = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    formik.setFieldValue(event.target.name, sanitizedValue);
  };
  return (
    <>
      <div className="comp-signup">
        <div>
          <label>company name</label>
          <input
            name="compName"
            type="text"
            onChange={handleSanitize}
            value={formik.values.compName}
            placeholder="Nash Paints"
          />
          {formik.errors.compName ? (
            <div className="text-danger">{formik.errors.compName}</div>
          ) : null}
        </div>
        <div>
          <label>email</label>
          <input
            name="compEmail"
            type="email"
            placeholder="email.email@email.com"
            onChange={handleSanitize}
            value={formik.values.email}
          />
          {formik.errors.compEmail ? (
            <div className="text-danger">{formik.errors.compEmail}</div>
          ) : null}
        </div>
      </div>

      <div className="comp-signup passwords">
        <div>
          <label>Password</label>
          <input
            name="compPassword"
            type="password"
            onChange={handleSanitize}
            value={formik.values.compPassword}
            placeholder="password"
          />
          {formik.errors.compPassword ? (
            <div className="text-danger">{formik.errors.compPassword}</div>
          ) : null}
        </div>
        <div>
          <label>confirm password</label>
          <input
            name="confirmCompPassword"
            type="password"
            onChange={handleSanitize}
            value={formik.values.confirmCompPassword}
            placeholder="password"
          />
          {formik.errors.confirmCompPassword ? (
            <div className="text-danger">
              {formik.errors.confirmCompPassword}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CompanySignUp;
