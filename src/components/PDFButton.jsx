import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileDown, FileText } from "lucide-react";
import { motion } from "framer-motion";

const PDFButton = () => {
  const generatePDF = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};

    const today = new Date();
    const monthName = today.toLocaleString("en-US", { month: "long" });
    const year = today.getFullYear();
    const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

    const doc = new jsPDF("landscape");

    // --- PDF Branding & Header ---
    doc.setTextColor(16, 185, 129); // Emerald Green
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("MAKKAH MASID", 14, 15);
    
    doc.setTextColor(100);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Monthly Attendance Record: ${monthName} ${year}`, 14, 22);
    doc.text(`Generated on: ${today.toLocaleDateString()}`, 250, 22, { align: "right" });

    // Table Header Construction
    const head = [
      ["No.", "Student Name", ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
    ];

    // Table Body Construction
    const body = students.map((s, index) => [
      index + 1,
      s.name.toUpperCase(),
      ...Array.from({ length: daysInMonth }, (_, i) => {
        const status = attendance[s.id]?.[i + 1];
        if (status === "P") return "P";
        if (status === "A") return "A";
        return "-";
      }),
    ]);

    autoTable(doc, {
      startY: 30,
      head,
      body,
      theme: "grid",
      styles: { 
        fontSize: 7, 
        cellPadding: 2, 
        halign: "center",
        valign: "middle"
      },
      headStyles: { 
        fillColor: [6, 78, 59], // Deep Emerald
        textColor: [255, 255, 255],
        fontStyle: "bold"
      },
      columnStyles: {
        1: { halign: "left", fontStyle: "bold", cellWidth: 40 }, // Student Name column
      },
      didParseCell: function (data) {
        // Color coding P (Green) and A (Red) in PDF
        if (data.section === 'body' && data.cell.text[0] === 'P') {
          data.cell.styles.textColor = [16, 185, 129];
        }
        if (data.section === 'body' && data.cell.text[0] === 'A') {
          data.cell.styles.textColor = [239, 68, 68];
        }
      }
    });

    doc.save(`Makkah-Masjid-Attendance-${monthName}-${year}.pdf`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, backgroundColor: "rgba(16, 185, 129, 0.2)" }}
      whileTap={{ scale: 0.98 }}
      onClick={generatePDF}
      className="group relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold transition-all overflow-hidden"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <FileDown size={18} className="group-hover:bounce transition-transform" />
      <span className="text-xs uppercase tracking-[0.2em]">Generate Report</span>
      
      {/* Small badge count if needed */}
      <div className="ml-2 w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
        <FileText size={10} />
      </div>
    </motion.button>
  );
};

export default PDFButton;