import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { PieSectorData } from "recharts/types/polar/Pie";
import { GeometrySector } from "recharts/types/util/types";

const colors = (value: number, total: number) => {
  if(value/total <= 0.25){
    return '#FFF59C'
  }else if(value/total > 0.25 && value/total <= 0.5){
    return '#FFC671'
  }else if(value/total > 0.5 && value/total <= 0.75){
    return '#F67878'
  }else if(value/total > 0.75){
    return '#FF1A00'
  }
}

const pieData = [
  { name: "Area Produksi", value: 35, color: colors(35, 35) },
  { name: "Gudang", value: 20, color: colors(20, 35) },
  { name: "Kantor", value: 15, color: colors(15, 35) },
  { name: "Maintenance", value: 10, color: colors(10, 35) },
  { name: "QC", value: 8, color: colors(8, 35) },
];

const barData = [
  { name: "Area Produksi", jumlah: 35, color: colors(35, 35) },
  { name: "Gudang", jumlah: 20, color: colors(20, 35) },
  { name: "Kantor", jumlah: 15, color: colors(15, 35) },
  { name: "Maintenance", jumlah: 10, color: colors(10, 35) },
  { name: "QC", jumlah: 8, color: colors(8, 35) },
];

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

export default function GraphLocationHyat() {
  return (
    <div className="grid grid-cols-12 gap-4 ">
       <div className="col-span-8">
           {/* Bar Chart */}
      
      <div className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="h-100 pb-10">
          <h2 className="text-lg font-semibold mb-4">Potensi Bahaya Ditemukan Tiap Line</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              {/* "top" | "left" | "right" | "bottom" | "inside" | "outside" | "insideLeft" | "insideRight" | "insideTop" | "insideBottom" | "insideTopLeft" | "insideBottomLeft" | "insideTopRight" | "insideBottomRight" | "insideStart" | "insideEnd" | "end" | "center */}
              <XAxis padding={{ right: 200}} label={{ value: "Line", offset: -2, position: "insideBottom"}} dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis label={{ value: "Total Potensi", angle: -90, position: "insideLeft"}} />
              <Tooltip />
              <Bar dataKey={'jumlah'}>
                {barData.map((entry, index)=>{
                  return(
                    <Cell key={index} fill={entry.color}/>
                  )
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>

      <div className="col-span-4">
       {/* Pie Chart */}
      <div className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="h-100">
          <h2 className="text-lg font-semibold mb-4">Persentase Lokasi Kejadian</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ cx, cy, midAngle, outerRadius, percent, name }: GeometrySector & PieSectorData)=>{
                      // Calculate the outer point for the label line
                      const typedMidAngle = midAngle || 0
                      const typedPercent = percent || 0
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius * 1.2; // A bit further out than the pie
                      const x = cx + radius * Math.cos(-typedMidAngle * RADIAN);
                      const y = cy + radius * Math.sin(-typedMidAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill={'black'} // Use slice color for label text or a consistent color
                          textAnchor={x > cx ? 'start' : 'end'} // Align text based on its position relative to the center
                          dominantBaseline="central"
                        >
                          {name} {`(${(typedPercent * 100).toFixed(0)}%)`} {/* Display name and percentage */}
                        </text>
    );
                }}
                // labelLine
              >
                {pieData.map((entry, index) =>{
                  return <Cell key={`cell-${index}`} fill={entry.color} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      </div>
    </div>
  );
}
