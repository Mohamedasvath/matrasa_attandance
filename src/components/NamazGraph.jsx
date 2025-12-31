import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function NamazGraph({ students }) {
  const rec = JSON.parse(localStorage.getItem("namaz_records")||"{}");
  const data = students.map(s=>({
    name:s,
    value:Object.values(rec[s]||{}).reduce((a,b)=>a+Object.values(b).filter(x=>x==="✓").length,0)
  }));

  const COLORS=["#10B981","#34D399","#059669","#064E3B","#6EE7B7"];

  return (
    <div className="w-full h-72 mt-6">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={110}>
            {data.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
