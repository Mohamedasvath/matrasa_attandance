import jsPDF from "jspdf";

export const generatePDF = (students, attendance) => {
  const pdf = new jsPDF();
  pdf.text("Masjid Monthly Attendance", 20, 20);

  let y = 40;
  students.forEach((s) => {
    const present = Object.values(attendance).filter(
      (a) => a[s.id] === "present"
    ).length;
    pdf.text(`${s.name} : ${present} days`, 20, y);
    y += 10;
  });

  pdf.save("attendance-report.pdf");
};
