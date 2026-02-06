import { jsPDF } from 'jspdf';

const CODES = {
  1: { label: "Code 1", desc: "No dental benefits offered", color: "#64748b" },
  2: { label: "Code 2", desc: "Employee only coverage", color: "#0369a1" },
  3: { label: "Code 3", desc: "Spouse & children eligible", color: "#059669" },
  4: { label: "Code 4", desc: "Spouse only eligible", color: "#7c3aed" },
  5: { label: "Code 5", desc: "Children only eligible", color: "#d97706" },
};

export function generateCompliancePDF(inputs, code) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 25;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = margin;

  // Helper functions
  const addText = (text, x, y, options = {}) => {
    doc.text(text, x, y, options);
  };

  const addLine = (y) => {
    doc.setDrawColor(229, 229, 229);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
  };

  const addThickLine = (y, color = [185, 28, 28]) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
  };

  // Generate timestamp
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  const timestamp = now.toISOString();
  const recordId = crypto.randomUUID?.() || Math.random().toString(36).substr(2, 16);

  // HEADER
  doc.setFontSize(9);
  doc.setTextColor(153, 153, 153);
  addText("COMPLIANCE MEMORANDUM", margin, yPos);
  yPos += 8;

  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(185, 28, 28);
  addText("T4 Box 45 — Dental Benefits Code Determination", margin, yPos);
  yPos += 6;

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(102, 102, 102);
  addText(`Generated ${dateStr}`, margin, yPos);
  yPos += 8;

  addThickLine(yPos);
  yPos += 12;

  // EMPLOYER INFORMATION
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(26, 26, 26);
  addText("Employer Information", margin, yPos);
  yPos += 8;
  addLine(yPos);
  yPos += 8;

  doc.setFontSize(9);
  doc.setTextColor(136, 136, 136);
  addText("EMPLOYER / BUSINESS NAME", margin, yPos);
  yPos += 5;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(26, 26, 26);
  addText(inputs.employerName || "Not provided", margin, yPos);
  yPos += 15;

  // DETERMINATION INPUTS
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  addText("Determination Inputs", margin, yPos);
  yPos += 8;
  addLine(yPos);
  yPos += 8;

  doc.setFontSize(9);
  doc.setTextColor(136, 136, 136);
  addText("DENTAL BENEFITS OFFERED TO EMPLOYEES?", margin, yPos);
  yPos += 5;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(26, 26, 26);
  addText(inputs.offeredDental ? "Yes" : "No", margin, yPos);
  yPos += 10;

  if (inputs.offeredDental) {
    doc.setFontSize(9);
    doc.setTextColor(136, 136, 136);
    addText("SPOUSE ELIGIBLE FOR COVERAGE (AS OF DEC 31, 2025)?", margin, yPos);
    yPos += 5;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(26, 26, 26);
    addText(inputs.spouseEligible ? "Yes" : "No", margin, yPos);
    yPos += 10;

    doc.setFontSize(9);
    doc.setTextColor(136, 136, 136);
    addText("CHILDREN ELIGIBLE FOR COVERAGE (AS OF DEC 31, 2025)?", margin, yPos);
    yPos += 5;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(26, 26, 26);
    addText(inputs.childrenEligible ? "Yes" : "No", margin, yPos);
    yPos += 10;
  }

  yPos += 5;

  // RESULT BOX
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(1);
  doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, 'FD');

  doc.setFontSize(36);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(5, 150, 105);
  addText(`Code ${code}`, pageWidth / 2, yPos + 18, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(51, 51, 51);
  addText(CODES[code].desc, pageWidth / 2, yPos + 27, { align: 'center' });

  yPos += 45;

  // BASIS OF DETERMINATION
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(26, 26, 26);
  addText("Basis of Determination", margin, yPos);
  yPos += 8;
  addLine(yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(51, 51, 51);

  const basisText = "This code was determined based on the eligibility status of the employee's dental plan as of December 31, 2025, in accordance with CRA guidelines for T4 Box 45 reporting. The code reflects who was eligible for coverage, regardless of whether benefits were actually used during the tax year.";

  const splitText = doc.splitTextToSize(basisText, contentWidth);
  doc.text(splitText, margin, yPos);
  yPos += (splitText.length * 5) + 15;

  // LEGAL DISCLAIMER
  addLine(yPos);
  yPos += 8;

  doc.setFontSize(9);
  doc.setTextColor(136, 136, 136);

  doc.setFont(undefined, 'bold');
  addText("Disclaimer: ", margin, yPos);
  doc.setFont(undefined, 'normal');

  const disclaimerText = "This memorandum is generated as a record-keeping aid and does not constitute legal or tax advice. Employers should consult with a qualified tax professional or refer to CRA guidance (RC4120) for authoritative instructions on T4 reporting obligations.";
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, contentWidth - 20);
  doc.text(splitDisclaimer, margin + 20, yPos);
  yPos += (splitDisclaimer.length * 4) + 8;

  doc.setFontSize(8);
  doc.setTextColor(170, 170, 170);
  addText(`Record ID: ${recordId} | UTC: ${timestamp}`, margin, yPos);

  // Save the PDF
  doc.save(`T4-Box45-Code${code}-Compliance-Memo.pdf`);
}
