const MonthlyReport = ({ students, attendance }) => {
  const month = new Date().toISOString().slice(0, 7);

  return (
    <div className="grid gap-4">
      {students.map((student) => {
        let present = 0;

        Object.keys(attendance).forEach((date) => {
          if (date.startsWith(month)) {
            if (attendance[date][student.id] === "present") {
              present++;
            }
          }
        });

        return (
          <div key={student.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">{student.name}</h3>
            <p className="text-green-600">Present Days: {present}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyReport;
