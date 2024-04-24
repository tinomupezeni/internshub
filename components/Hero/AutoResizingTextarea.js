import React, { useEffect, useRef } from "react";

const AutoResizingTextarea = ({ placeholder, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const resizeTextarea = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };
    resizeTextarea();
    textarea.addEventListener("input", resizeTextarea);
    return () => {
      textarea.removeEventListener("input", resizeTextarea);
    };
  }, []);

  return (
    <textarea
      ref={textareaRef}
      rows="1"
      placeholder={placeholder}
      onChange={onChange}
      style={{ width: "100%" }}
    />
  );
};

export default AutoResizingTextarea;
