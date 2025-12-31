import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const PRAYERS = ["F","Z","A","M","I"]; // Fajr, Zuhr, Asr, Maghrib, Isha
const STATUS = ["","✓","✗","L"];

export default function NamazAttendance(){

  const [students,setStudents]=useState(()=>JSON.parse(localStorage.getItem("namaz_students")||"[]"));
  const [attendance,setAttendance]=useState(()=>JSON.parse(localStorage.getItem("namaz_records")||"{}"));

  const addStudent=name=>{
    if(!name.trim())return;
    const updated=[...students,name];
    setStudents(updated);
    localStorage.setItem("namaz_students",JSON.stringify(updated));
    document.getElementById("sname").value="";
  };

  const toggle=(student,day,prayer)=>{
    setAttendance(prev=>{
      const current=prev[student]?.[day]?.[prayer]||"";
      const next=STATUS[(STATUS.indexOf(current)+1)%STATUS.length];
      const updated={
        ...prev,
        [student]:{
          ...prev[student],
          [day]:{
            ...(prev[student]?.[day]||{}),
            [prayer]:next
          }
        }
      };
      localStorage.setItem("namaz_records",JSON.stringify(updated));
      return updated;
    });
  };

  const now=new Date();
  const month=now.toLocaleDateString("en-US",{month:"long"});
  const year=now.getFullYear();
  const lastDay=new Date(year,now.getMonth()+1,0).getDate();
  const days=[...Array(lastDay)].map((_,i)=>i+1);

  return(
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950/80 to-black text-white p-6">

      <motion.h1 initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} className="text-center text-4xl font-bold text-emerald-400">
        🕌 Namaz Attendance
      </motion.h1>
      <p className="text-center text-emerald-300">{month} {year}</p>

      <div className="flex justify-center mt-6 gap-2">
        <input id="sname" placeholder="Add Student..." className="px-4 py-2 rounded-xl bg-white/10 border border-emerald-700 outline-none w-48"/>
        <button onClick={()=>addStudent(document.getElementById('sname').value)} className="px-4 py-2 bg-emerald-600 rounded-xl">Add</button>
      </div>

      {students.length>0 && (
        <p className="text-emerald-300 font-medium mt-4 flex items-center gap-2 justify-center">
          <Users size={18}/> Total Students: {students.length}
        </p>
      )}

      {/* MAIN GRID */}
      <div className="overflow-auto mt-6 border border-emerald-800 rounded-xl shadow-emerald-900 shadow-lg">
      <table className="w-full min-w-[1100px] text-sm border-collapse">
        <thead className="sticky top-0 bg-black/70 backdrop-blur">
          <tr className="text-emerald-300 text-center">
            <th className="p-3 border-r border-emerald-800 w-40">Student</th>
            {days.map(d=>(
              <th key={d} className="border-r border-emerald-800 w-14">{d}</th>
            ))}
          </tr>
          <tr className="text-[11px] opacity-70 bg-black/50">
            <th></th>
            {days.map(d=>(
              <th key={d} className="border-r border-emerald-800 text-[9px] tracking-widest">
                F Z A M I
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
        {students.map((st,i)=>(
          <motion.tr key={i} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
            className="hover:bg-emerald-900/20">
            <td className="border-r border-emerald-800 font-semibold pl-4 capitalize">{st}</td>

            {days.map(day=>(
              <td key={day} className="border-r border-emerald-800">
                <div className="grid grid-cols-5 gap-[1px] p-[2px]">
                  {PRAYERS.map((p,idx)=>{
                    let val=attendance[st]?.[day]?.[p]||"";
                    return(
                      <div key={idx}
                        onClick={()=>toggle(st,day,p)}
                        className={`cursor-pointer text-[10px] flex items-center justify-center py-[2px] rounded
                          ${val==="✓"&&"bg-emerald-500 text-black font-bold"}
                          ${val==="✗"&&"bg-red-600 text-white font-bold"}
                          ${val==="L"&&"bg-yellow-400 text-black font-bold"}
                          ${val===""&&"bg-black/40 text-white/30"}`}>
                        {val||"."}
                      </div>
                    )
                  })}
                </div>
              </td>
            ))}

          </motion.tr>
        ))}
        </tbody>
      </table>
      </div>

      <p className="text-center text-emerald-400/50 mt-10 text-xl font-arabic">
        وَأَقِمِ ٱلصَّلَوٰةَ لِذِكْرِى۠
      </p>
    </div>
  )
}
