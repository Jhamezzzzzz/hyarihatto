import { useEffect, useState } from "react";
import useHyarihattoDataService from "../../services/HyarihattoDataService";
import Spinner from "../ui/spinner";
import { Filter } from "../../pages/QuestLeader/HomeLeader";

interface DataStatusReport{
  title: string;
  caption: string;
  number: number;
  color: string;
}

const dataMetrics = [
  {
    title: "Total",
    caption: "Jumlah catatan yang dibuat Member",
    number: 0,
    color: ""
  },
  {
    title: "Diajukan",
    caption: "Jumlah yang perlu direview Leader",
    number: 0,
    color: "#F79009"
  },
  {
    title: "Dijadwalkan",
    caption: "Jumlah yang sudah dijadwalkan",
    number: 0,
    color: "#0BA5EC"
  },
  {
    title: "Terselesaikan",
    caption: "Jumlah yang sudah terselesaikan",
    number: 0,
    color: "#12B76A"
  },
  {
    title: "Ditolak",
    caption: "Jumlah yang ditolak oleh Leader",
    number: 0,
    color: "#F04438"
  },
];

export default function Metrics({ filter }: { filter: Filter}) {
  const [loading, setLoading] = useState({
    statusReport: true
  })
  const [dataStatusReport, setDataStatusReport] = useState<DataStatusReport[]>(dataMetrics)
  const { getDashboardStatusReport } = useHyarihattoDataService()

  const fetchDashboardStatusReport = async() => {
    try {
      const response = await getDashboardStatusReport(filter.type, filter.year, filter.month)
      const data = response?.data?.data

      dataMetrics[0].number = data.total
      dataMetrics[1].number = data?.grouped?.find((item: {status: number, count: number})=>item.status === 0)?.count || 0
      dataMetrics[2].number = data?.grouped?.find((item: {status: number, count: number})=>item.status === 1)?.count || 0
      dataMetrics[3].number = data?.grouped?.find((item: {status: number, count: number})=>item.status === 2)?.count || 0
      dataMetrics[4].number = data?.grouped?.find((item: {status: number, count: number})=>item.status === 3)?.count || 0

      setDataStatusReport(dataMetrics)
    } catch (error) {
      console.error(error)
      dataMetrics[0].number = 0
      dataMetrics[1].number = 0
      dataMetrics[2].number = 0
      dataMetrics[3].number = 0
      dataMetrics[4].number = 0
      setDataStatusReport(dataMetrics)
    } finally{
      setLoading({ ...loading, statusReport: false})
    }
  }

  useEffect(()=>{
    fetchDashboardStatusReport()
  }, [filter.year, filter.month, filter.type])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-4">
      { dataStatusReport?.map((item, index)=>{
        return(
          <div key={index} className="rounded-2xl border border-gray-300 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <h4 className="text-xl font-bold text-gray-600 dark:text-gray-400" style={{ color: item.color}}>
              {item.title.toUpperCase()}
            </h4>
            <p className="-2 text-gray-600 dark:text-white/90 text-[10px]">
              {item.caption}
            </p>
            <h4 className="font-bold text-end text-gray-800 text-4xl dark:text-white/90">
              { !loading.statusReport ? item.number : <Spinner/>}
            </h4>
          </div>
        )
      })}

      
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
