import jsPDF from "jspdf";

export default function NamazPDF({ students }) {
  const downloadPDF = () => {
    const attendance = JSON.parse(localStorage.getItem("namaz_attendance") || "{}");

    const doc = new jsPDF("p", "mm", "a4");

    const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    
    // Format today's date
    const today = new Date();
    const fileDate =
      today.getDate().toString().padStart(2,"0") + "-" +
      (today.getMonth() + 1).toString().padStart(2,"0") + "-" +
      today.getFullYear();

    // PDF legend mapping
    const mapStatus = (v) =>
      v === "✓" ? "P" :
      v === "✗" ? "A" :
      v === "L" ? "L" :
      "-";

    let y = 20;
    doc.setFontSize(18).setFont("helvetica","bold");
    doc.text("🕌 Namaz Attendance Report", 105, y, { align:"center" });
    y += 12;

    // Show date inside PDF top
    doc.setFontSize(11).setFont("helvetica","normal");
    doc.text(`Date: ${fileDate}`, 105, y, { align:"center" });
    y += 8;

    // Legend
    doc.setFontSize(10);
    doc.text("P = Present | A = Absent | L = Leave | - = Empty", 105, y, {align:"center"});
    y += 10;

    students.forEach(name => {
      if (y > 260) { doc.addPage(); y = 20; }

      doc.setFontSize(14).setFont("helvetica","bold");
      doc.text(name, 14, y);
      y += 8;

      const colWidths = [18,28,28,28,28,28];
      const rowHeight = 9;
      let x = 14;

      // Header Row
      doc.setFontSize(11).setFont("helvetica","bold");
      const headers = ["Day", ...PRAYERS];

      headers.forEach((h,i)=>{
        doc.rect(x,y,colWidths[i],rowHeight);
        doc.text(h,x+colWidths[i]/2,y+6,{align:"center"});
        x += colWidths[i];
      });

      y += rowHeight;

      const days = Object.keys(attendance[name] || {})
        .map(Number)
        .sort((a,b)=>a-b);

      days.forEach(day=>{
        if (y > 260) { doc.addPage(); y = 20; }

        x = 14;
        const row = [
          `Day ${day}`,
          ...PRAYERS.map(p=>mapStatus(attendance[name]?.[day]?.[p] || "-"))
        ];

        row.forEach((v,i)=>{
          doc.rect(x,y,colWidths[i],rowHeight);
          doc.text(v.toString(),x+colWidths[i]/2,y+6,{align:"center"});
          x += colWidths[i];
        });

        y += rowHeight;
      });

      y += 10;
    });

    doc.save(`Namaz_Attendance_${fileDate}.pdf`);
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={downloadPDF}
        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition font-semibold"
      >
        Download PDF
      </button>
    </div>
  );
}
