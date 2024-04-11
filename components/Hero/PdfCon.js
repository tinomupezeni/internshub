import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfCon = ({ data }) => {
  const printDocument = () => {
    const input = document.getElementById("my-component");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  return (
    <div id="my-component">
      {/* Your component code here */}
      <button onClick={printDocument}>Download PDF</button>
    </div>
  );
};

export default PdfCon;
