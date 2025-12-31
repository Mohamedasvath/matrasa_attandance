export default function NamazSummary({ students }) {
  const records = JSON.parse(localStorage.getItem("namaz_records")||"{}");
  const totalDays = Object.values(records)[0] ? Object.keys(Object.values(records)[0]).length : 0;
  const totalSlots = totalDays * 5;

  const getPercent = (name)=>{
    let count = 0;
    Object.values(records[name]||{}).forEach(d=>{
      Object.values(d).forEach(v=> v==="✓" && count++);
    });
    return ((count/(totalSlots||1))*100).toFixed(1);
  };

  return (
    <div className="mt-6 text-center">
      <h2 className="text-emerald-300 mb-3 text-xl font-bold">📊 Summary</h2>
      {students.map((s,i)=>(
        <p key={i} className="mb-1 text-white capitalize">
          {s} — <span className="text-emerald-400">{getPercent(s)}%</span>
        </p>
      ))}
    </div>
  );
}
