import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

interface Filters{
  filter: {
    date: string
  }
}

export default function BarSummary({ filter }: Filters) {
  const [dates, setDates] = useState<number[]>()
  const [monthName, setMonthName] = useState<string>()

  const getDates = (dateFilter: string) => {
  const [monthName, yearStr] = dateFilter.split(" ")
  const year = parseInt(yearStr)
  setMonthName(monthName)

  const indonesianMonths = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ]
  const monthIndex = indonesianMonths.indexOf(monthName)

  if (monthIndex === -1) return

  const lastDay = new Date(year, monthIndex + 1, 0).getDate()

  const allDateNumbers: number[] = []
  for (let day = 1; day <= lastDay; day++) {
    allDateNumbers.push(day)
  }

  setDates(allDateNumbers)
}

  useEffect(()=>{
    getDates(filter.date)
  }, [filter.date])

  console.log("dates: ", dates)

  const options: ApexOptions = {
    colors: ["#61BD98"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
        borderRadius: 2,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: dates,
      title: {
        text: `Bulan ${monthName}` 
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: "Score",
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        formatter: (val: string | number) => `Tanggal ${val} ${monthName}`,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };
  const series = [
    {
      name: `Score`,
      data: [9, 0, 0, 16, 4, 0, 0, 0, 0, 0, 5, 0, 4, 0, 0, 5, 4, 0, 0, 0, 0, 0, 9, 0, 0, 0, 12, 0],
    },
  ];
  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartOne" className="min-w-[1000px]">
        <Chart options={options} series={series} type="bar" height={180} />
      </div>
    </div>
  );
}
