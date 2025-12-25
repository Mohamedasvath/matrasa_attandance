import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileText } from "lucide-react";

const PDFButton = () => {

  const generatePDF = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};

    const today = new Date();
    const month = today.toLocaleString("en-US", { month: "long" });
    const year = today.getFullYear();
    const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

    const doc = new jsPDF("landscape");

    doc.setFontSize(18);
    doc.text(`Madrasa Attendance - ${month} ${year}`, 14, 15);

    // Table Header
    const head = [
      ["Student", ...Array.from({ length: daysInMonth }, (_, i) => i + 1)],
    ];

    // FIX: student.name instead of object
    const body = students.map((s) => [
      s.name,
      ...Array.from({ length: daysInMonth }, (_, i) =>
        attendance[s.id]?.[i + 1] || ""
      ),
    ]);

    autoTable(doc, {
      startY: 25,
      head,
      body,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [30, 136, 229] },
      margin: { left: 10, right: 10 },
      theme: "grid",
    });

    doc.save(`Attendance-${month}-${year}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition mt-4"
    >
      <FileText size={16} />
      Download PDF
    </button>
  );
};

export default PDFButton;
