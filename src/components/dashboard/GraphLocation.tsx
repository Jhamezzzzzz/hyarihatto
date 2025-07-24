import { Card, CardContent } from "../ui/card/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const pieData = [
  { name: "Area Produksi", value: 35 },
  { name: "Gudang", value: 20 },
  { name: "Kantor", value: 15 },
  { name: "Maintenance", value: 10 },
  { name: "QC", value: 8 },
];

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

const barData = [
  { name: "Area Produksi", jumlah: 35, color: colors(35, 35) },
  { name: "Gudang", jumlah: 20, color: colors(20, 35) },
  { name: "Kantor", jumlah: 15, color: colors(15, 35) },
  { name: "Maintenance", jumlah: 10, color: colors(10, 35) },
  { name: "QC", jumlah: 8, color: colors(8, 35) },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

export default function GraphLocationHyat() {
  return (
    <div className="grid grid-cols-12 gap-4 ">
       <div className="col-span-8">
           {/* Bar Chart */}
      
      <Card>
        <CardContent className="h-100">
          <h2 className="text-lg font-semibold mb-4">Potensi Bahaya Ditemukan Tiap Line</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              {/* "top" | "left" | "right" | "bottom" | "inside" | "outside" | "insideLeft" | "insideRight" | "insideTop" | "insideBottom" | "insideTopLeft" | "insideBottomLeft" | "insideTopRight" | "insideBottomRight" | "insideStart" | "insideEnd" | "end" | "center */}
              <XAxis label={{ value: "Line", position: "bottom"}} dataKey="name" tick={{ fontSize: 11 }} />
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
        </CardContent>
      </Card>
      </div>

      <div className="col-span-4">
       {/* Pie Chart */}
      <Card>
        <CardContent className="h-80">
          <h2 className="text-lg font-semibold mb-4">Persentase Lokasi Kejadian</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) =>{
                  console.log(entry, index);
                  return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      </div>
    </div>
  );
}
