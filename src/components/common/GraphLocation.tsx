import { Card, CardContent } from "../ui/card/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const pieData = [
  { name: "Area Produksi", value: 35 },
  { name: "Gudang", value: 20 },
  { name: "Kantor", value: 15 },
  { name: "Maintenance", value: 10 },
  { name: "QC", value: 8 },
];

const barData = [
  { name: "Area Produksi", jumlah: 35 },
  { name: "Gudang", jumlah: 20 },
  { name: "Kantor", jumlah: 15 },
  { name: "Maintenance", jumlah: 10 },
  { name: "QC", jumlah: 8 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <Card>
        <CardContent className="h-80">
          <h2 className="text-lg font-semibold mb-4">Distribusi Orang per Area (Pie Chart)</h2>
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
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardContent className="h-80">
          <h2 className="text-lg font-semibold mb-4">Jumlah Orang per Area (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
