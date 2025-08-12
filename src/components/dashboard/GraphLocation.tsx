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
  LabelList,
} from "recharts";
import { PieLabelProps } from "recharts/types/polar/Pie";
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

type LineData = {
  [lineName: string]: number;
};


type MonthYearData = {
  [monthYear: string]: LineData; // Each monthYear maps to a LineData object
};

export default function GraphLocationHyat({ filter }: { filter: Filter }) {
  const [loadingBar, setLoadingBar] = useState<boolean>(false)
  const [loadingPie, setLoadingPie] = useState<boolean>(false)
  const { getDashboardBarChart, getDashboardPieChart } = useHyarihattoDataService();
  const [dataBarChart, setDataBarChart] = useState<LineData[]>([]);
  const [dataPieChart, setDataPieChart] = useState<ResponseChart[]>([]);
  const [lineNames, setLineNames] = useState<string[]>([])

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

  // Transform Response Data into Grouped By Month
  const transformDataForStackedBarChart = (rawData: ResponseChart[], targetMonth = '', targetYear: number) => {
    const transformedData: MonthYearData = {};

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformedData[monthYear] = { "year-month": monthYear } as any;
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
      const dateA = new Date(a["year-month"]);
      const dateB = new Date(b["year-month"]);
      return dateA.getTime() - dateB.getTime()
    });
  };


  // Fetch Data Bar Chart
  const fetchDashboardBarChart = async () => {
    try {
      setLoadingBar(true)
      const response = await getDashboardBarChart(filter.type, filter.year, filter.month);
      console.log("response bar chart: ", response?.data?.data)
      const rawData = response?.data?.data;
      
      const transformed = transformDataForStackedBarChart(rawData, filter.month, filter.year);
      setDataBarChart(transformed);

      // Extract unique line names to dynamically create Bar components
      const uniqueLineNames: string[] = Array.from(new Set(
        rawData.map((item: Partial<ResponseChart>) => item?.line?.lineName)
      ));
      setLineNames(uniqueLineNames);
      
    } catch (error) {
      console.error(error);
      setDataBarChart([])
      setLineNames([])
    } finally {
      setLoadingBar(false)
    }
  };

  // Fetch Data Pie Chart
  const fetchDashboardPieChart = async () => {
    try {
      setLoadingPie(true)
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
      setLoadingPie(false)
    }
  };

  // Call function
  useEffect(() => {
    fetchDashboardBarChart();
    if(filter.type === 'hyarihatto'){
      fetchDashboardPieChart();
    }
  }, [filter.year, filter.month, filter.type]);


  useEffect(()=>{
    // console.log("data bar chart: ", dataBarChart)
  }, [dataBarChart])

  const getMonthName = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-');
    const date = new Date(Number(year), parseInt(month) - 1); // Month is 0-indexed
    return date.toLocaleString('id-ID', { month: 'short', year: 'numeric' });
  };


  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#a4de6c', '#d0ed57', '#83a6ed', '#8dd1e1', '#b5c5e0'];
  const COLORS_PIE = [
  '#9370DB', // Medium Purple
  '#66CDAA', // Medium Aquamarine
  '#FFB600', // Bright Orange
  '#AEE56A', // Soft Lime
  '#FFDDA0', // Pale Gold
  '#87CEFA', // Light Sky Blue
  '#40E0D0', // Turquoise
  '#BA80D8', // Medium Lavender
  '#FF69B4', // Hot Pink
  '#FA8072', // Salmon
  '#E6C26D', // Soft Mustard
  '#00BFFF', // Deep Sky Blue
  '#FFA07A', // Light Salmon
  '#77A3D2'  // Medium Blue-Gray
];

  const classNameHyarihatto = "xl:col-span-8 col-span-12"
  const classNameVoiceMember = "col-span-12"

  return (
    <div className="grid grid-cols-12 gap-4 ">
      <div className={filter.type === 'hyarihatto' ? classNameHyarihatto : classNameVoiceMember}>
        {/* Bar Chart */}
        <div className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="min-h-120 h-120 pb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
              { filter.type === 'hyarihatto' ? "Potensi Bahaya" : "Voice Member"} Ditemukan Tiap Line
            </h2>
              { (loadingBar || dataBarChart.length === 0) ? (
                <div className="flex h-full items-center justify-center">
                  <NoDataOrLoading data={dataBarChart} loading={loadingBar}/>
                </div>
              ):(
                <ResponsiveContainer width="100%" height="100%" >
                <BarChart data={dataBarChart}>
                  <Legend verticalAlign="top" height={100}/>
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
                      stackId="year-month"
                      fill={COLORS[index % COLORS.length]}
                    >
                      <LabelList dataKey={name} position="center" color="white" fill="white" />
                    </Bar>
                  ))}
                </BarChart>
            </ResponsiveContainer>
              )}
          </div>
        </div>
      </div>

      { filter.type === 'hyarihatto' && (
        <div className="xl:col-span-4 col-span-12">
          {/* Pie Chart */}
          <div className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="min-h-120 h-120">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">
                Persentase Potensi Bahaya
              </h2>
                { (loadingPie || dataPieChart.length === 0) ? (
                  <div className="flex h-full items-center justify-center">
                    <NoDataOrLoading data={dataPieChart} loading={loadingPie}/>
                  </div>
                ):(
                  <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Legend verticalAlign="top" />
                    <Pie
                      data={dataPieChart}
                      dataKey="count"
                      nameKey="name"
                      // outerRadius={120}
                      fill="#8884d8"
                      labelLine={false}
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius, // Make sure to destructure innerRadius if you're using it
                        outerRadius,
                        percent
                      }: PieLabelProps) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // Midpoint of the slice thickness
                        if(midAngle && percent){
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text
                              x={x}
                              y={y}
                              fill="white" // Consider using a contrasting color for better readability inside slices
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                            >
                              {`${(percent * 100).toFixed(0)}%`}
                            </text>
                          );
                        }

                      }}
                    >
                      {dataPieChart.map((entry, index) => {
                        return <Cell key={`cell-${index}-${entry}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />;
                      })}
                    </Pie>
                    <Tooltip/>
                  </PieChart>
              </ResponsiveContainer>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
