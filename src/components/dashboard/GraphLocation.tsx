import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { PieSectorData } from "recharts/types/polar/Pie";
import { GeometrySector } from "recharts/types/util/types";
import useHyarihattoDataService from "../../services/HyarihattoDataService";
import { useEffect, useState } from "react";
import { Filter } from "../../pages/QuestLeader/HomeLeader";
import NoDataOrLoading from "../ui/table/NoDataOrLoading";

type ResponseChart = {
  line: {
    lineName: string;
    id: number;
  };
  count: number;
  lineId: number;
  month: string;
  color?: string;
  accidentType?: string;
};

export default function GraphLocationHyat({ filter }: { filter: Filter }) {
  const [loading, setLoading] = useState({
    bar: false,
    pie: false,
  });
  const { getDashboardBarChart, getDashboardPieChart } = useHyarihattoDataService();
  const [dataBarChart, setDataBarChart] = useState<ResponseChart[]>([]);
  const [dataPieChart, setDataPieChart] = useState<ResponseChart[]>([]);
  const [lineNames, setLineNames] = useState([])

  // Get color chart based on percentage
  const getColors = (value: number, total: number) => {
    if (value / total <= 0.25) {
      return "#FFF59C"; //red
    } else if (value / total > 0.25 && value / total <= 0.5) {
      return "#FFC671"; //red-orange
    } else if (value / total > 0.5 && value / total <= 0.75) {
      return "#F67878"; //orange
    } else if (value / total > 0.75) {
      return "#FF1A00"; //yellow
    }
  };

  const transformDataForStackedBarChart = (rawData: ResponseChart[], targetMonth = '', targetYear: number) => {
    const transformedData = {};
    // Collect all unique line names from the raw data
    const allLineNames = Array.from(new Set(rawData.map(item => item.line.lineName)));

    const monthsToDisplay = [];

    // Step 1: Conditionally generate months based on targetMonth
    if (targetMonth && targetMonth !== '') {
      const monthFormatted = targetMonth.padStart(2, '0');
      monthsToDisplay.push(`${targetYear}-${monthFormatted}`);
    } else {
      for (let i = 0; i < 12; i++) {
        const month = (i + 1).toString().padStart(2, '0');
        monthsToDisplay.push(`${targetYear}-${month}`);
      }
    }

    // Step 2: Initialize transformedData with all selected months, but only with the "year-month" key initially
    monthsToDisplay.forEach(monthYear => {
      transformedData[monthYear] = { "year-month": monthYear };
    });

    // Step 3: Populate with actual data from rawData, applying filters
    // Instead of initializing with 0, we'll only add line counts if data exists
    rawData.forEach(item => {
      const monthYear = item.month; // "YYYY-MM"
      const lineName = item.line.lineName;
      const count = item.count;

      const [itemYear, itemMonth] = monthYear.split('-');

      // Apply filters: check year and, if targetMonth is specified, check month
      const yearMatches = itemYear === targetYear.toString();
      const monthMatches = !targetMonth || targetMonth === '' || itemMonth === targetMonth.padStart(2, '0');

      if (yearMatches && monthMatches) {
        // Only add to transformedData if this monthYear is one we want to display
        // And importantly, only add the 'lineName' key if a count exists for it.
        if (transformedData[monthYear]) {
          // Use the || 0 pattern to safely increment, even if lineName key doesn't exist yet for this month
          transformedData[monthYear][lineName] = (transformedData[monthYear][lineName] || 0) + count;
        }
      }
    });

    // Convert the object back into an array for Recharts and sort by month
    return Object.values(transformedData).sort((a, b) => {
      return new Date(a["year-month"]) - new Date(b["year-month"]);
    });
  };


  // Fetch Data Bar Chart
  const fetchDashboardBarChart = async () => {
    try {
      setLoading({ ...loading, bar: true})
      const response = await getDashboardBarChart(filter.year, filter.month);
      // console.log("response bar chart: ", response?.data?.data)
      const rawData = response?.data?.data;

      const transformed = transformDataForStackedBarChart(rawData, filter.month, filter.year);
      setDataBarChart(transformed);

      // Extract unique line names to dynamically create Bar components
      const uniqueLineNames = Array.from(new Set(
        rawData.map(item => item.line.lineName)
      ));
      setLineNames(uniqueLineNames);
      
    } catch (error) {
      console.error(error);
      setDataBarChart([])
      setLineNames([])
    } finally {
      setLoading({ ...loading, bar: false });
    }
  };

  // Fetch Data Pie Chart
  const fetchDashboardPieChart = async () => {
    try {
      setLoading({ ...loading, pie: true})
      const response = await getDashboardPieChart(filter.year, filter.month);
      const rawData = response?.data?.data;

      // Get max value for assign the colors
      let maxCount = 0;
      if (rawData && rawData.length > 0) {
        maxCount = Math.max(
          ...rawData.map((item: ResponseChart) => item.count)
        );
      }

      // Mapping data
      const data = rawData?.map((item: ResponseChart) => {
        return {
          name: item.accidentType,
          count: item.count,
          color: getColors(item.count, maxCount),
        };
      });
      setDataPieChart(data);
    } catch (error) {
      console.error(error);
      setDataPieChart([])
    } finally {
      setLoading({ ...loading, pie: false });
    }
  };

  // Call function
  useEffect(() => {
    fetchDashboardBarChart();
    fetchDashboardPieChart();
  }, [filter.year, filter.month]);


  useEffect(()=>{
    console.log("data bar chart: ", dataBarChart)
  }, [dataBarChart])

  const getMonthName = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-');
    const date = new Date(Number(year), parseInt(month) - 1); // Month is 0-indexed
    return date.toLocaleString('id-ID', { month: 'short', year: 'numeric' });
  };


  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#a4de6c', '#d0ed57', '#83a6ed', '#8dd1e1', '#b5c5e0'];

  return (
    <div className="grid grid-cols-12 gap-4 ">
      <div className="col-span-8">
        {/* Bar Chart */}
        <div className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="min-h-120 h-120 pb-10">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">
              Potensi Bahaya Ditemukan Tiap Line
            </h2>
            <ResponsiveContainer width="100%" height="100%" >
              { (loading.bar || dataBarChart.length === 0) ? (
              <p className="flex items-center justify-center">
                <NoDataOrLoading data={dataBarChart} loading={loading.bar}/>
              </p>
              ):(
                <BarChart data={dataBarChart}>
                  <Legend verticalAlign="top"/>
                  <XAxis
                    padding={{ right: 0 }}
                    label={{
                      value: "Periode",
                      offset: -3,
                      position: "insideBottom",
                    }}
                    dataKey="year-month"
                    tick={{ fontSize: 11 }}
                    tickFormatter={getMonthName}
                  />
                  <YAxis
                    allowDecimals={false}
                    label={{
                      value: "Total Potensi",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    
                  />
                  <Tooltip />
                  {lineNames.map((name, index) => (
                    <Bar
                      width={20}
                      key={name}
                      dataKey={name}
                      stackId="year-month" // Use the same stackId for all bars to stack them
                      fill={COLORS[index % COLORS.length]} // Cycle through colors
                    />
                  ))}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="col-span-4">
        {/* Pie Chart */}
        <div className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="min-h-120 h-120">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">
              Persentase Potensi Bahaya
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              { (loading.pie || dataPieChart.length === 0) ? (
                <p className="flex items-center justify-center">
                  <NoDataOrLoading data={dataPieChart} loading={loading.pie}/>
                </p>
              ):(
                <PieChart>
                  <Legend verticalAlign="top" />
                  <Pie
                    data={dataPieChart}
                    dataKey="count"
                    nameKey="name"
                    // cx="50%"
                    // cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    // label
                    label={({
                      cx,
                      cy,
                      midAngle,
                      outerRadius,
                      percent,
                      // name,
                    }: GeometrySector & PieSectorData) => {
                      // Calculate the outer point for the label line
                      const typedMidAngle = midAngle || 0;
                      const typedPercent = percent || 0;
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius * 1.2; // A bit further out than the pie
                      const x = cx + radius * Math.cos(-typedMidAngle * RADIAN);
                      const y = cy + radius * Math.sin(-typedMidAngle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill={"black"} // Use slice color for label text or a consistent color
                          textAnchor={x > cx ? "start" : "end"} // Align text based on its position relative to the center
                          dominantBaseline="central"
                        >
                          {/* {name}{" "} */}
                          {`(${(typedPercent * 100).toFixed(0)}%)`}{" "}
                        </text>
                      );
                    }}
                  >
                    {dataPieChart.map((entry, index) => {
                      return <Cell key={`cell-${index}-${entry}`} fill={COLORS[index % COLORS.length]} />;
                    })}
                  </Pie>
                  <Tooltip/>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
