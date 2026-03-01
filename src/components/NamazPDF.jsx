import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileDown, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function NamazPDF({ students }) {
  const downloadPDF = () => {
    const attendance = JSON.parse(localStorage.getItem("namaz_attendance") || "{}");
    const doc = new jsPDF("p", "mm", "a4");
    const PRAYERS = ["F", "D", "A", "M", "I", "T", "Fst"];
    const today = new Date();
    const fileDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");

    doc.setTextColor(16, 185, 129);
    doc.setFontSize(22); doc.setFont("helvetica", "bold");
    doc.text("MAKKAH MASJID", 105, 15, { align: "center" });

    doc.setTextColor(100); doc.setFontSize(12); doc.setFont("helvetica", "normal");
    doc.text("NAMAZ ATTENDANCE - Seguravathanoor", 105, 22, { align: "center" });
    doc.setFontSize(9); doc.text(`Generated: ${fileDate}`, 195, 22, { align: "right" });

    const mapStatus = (v) => {
      if (v === "✓") return "P";
      if (v === "✗") return "A";
      return v || "-";
    };

    let currentY = 30;
    students.forEach((name, index) => {
      if (currentY > 240) { doc.addPage(); currentY = 20; }
      doc.setTextColor(40); doc.setFontSize(12); doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. Student: ${name.toUpperCase()}`, 14, currentY);

      const days = Object.keys(attendance[name] || {}).map(Number).sort((a, b) => a - b);
      const tableBody = days.map((day) => [`Day ${day}`, ...PRAYERS.map((p) => mapStatus(attendance[name]?.[day]?.[p]))]);

      autoTable(doc, {
        startY: currentY + 4,
        head: [["Timeline", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha", "Tara", "Fast"]],
        body: tableBody,
        theme: "grid",
        styles: { fontSize: 8, halign: "center" },
        headStyles: { fillColor: [6, 78, 59], textColor: [255, 255, 255] },
        margin: { left: 14, right: 14 },
        didParseCell: (data) => {
          if (data.section === 'body') {
            if (data.cell.text[0] === 'P') data.cell.styles.textColor = [16, 185, 129];
            if (data.cell.text[0] === 'A') data.cell.styles.textColor = [239, 68, 68];
          }
        }
      });
      currentY = doc.lastAutoTable.finalY + 12;
    });
    doc.save(`Namaz_Report_${fileDate}.pdf`);
  };

  return (
    // mt-10 and flex justify-center removed to let the parent handle alignment
    <motion.button
      whileHover={{ scale: 1.02, backgroundColor: "rgba(16, 185, 129, 0.2)" }}
      whileTap={{ scale: 0.98 }}
      onClick={downloadPDF}
      className="group relative flex items-center justify-center gap-3 h-14 w-full sm:w-auto sm:px-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold transition-all whitespace-nowrap"
    >
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <FileDown size={18} className="group-hover:translate-y-1 transition-transform" />
      <span className="text-[11px] uppercase tracking-widest font-black">All Data</span>
      <Moon size={14} className="text-emerald-500/40" />
    </motion.button>
  );
}