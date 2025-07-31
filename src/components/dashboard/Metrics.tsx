import { useEffect, useState } from "react";
import useHyarihattoDataService from "../../services/HyarihattoDataService";
import Spinner from "../ui/spinner";
import { Filter } from "../../pages/QuestLeader/HomeLeader";

interface ResponseStatus{
  total: number
  [index: number]: {
    status: number,
    count: number
  }
}
interface DataStatusReport{
  title: string;
  caption: string;
  number: number
}

const dataMetrics = [
  {
    title: "Total",
    caption: "Jumlah catatan yang dibuat oleh Member",
    number: 0,
  },
  {
    title: "Diajukan",
    caption: "Jumlah yang perlu direview oleh Leader",
    number: 0,
  },
  {
    title: "Dijadwalkan",
    caption: "Jumlah yang sudah dijadwalkan",
    number: 0,
  },
  {
    title: "Terselesaikan",
    caption: "Jumlah yang sudah terselesaikan",
    number: 0,
  },
  {
    title: "Ditolak",
    caption: "Jumlah yang ditolak oleh Leader",
    number: 0,
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
      const response = await getDashboardStatusReport(filter.year, filter.month)
      const data: ResponseStatus = response?.data?.data
      const formatted = dataMetrics?.map((item, index)=>{
        if(index===0){
          return{
            title: item.title,
            caption: item.caption,
            number: data.total
          }
        }else{
          return{
            title: item.title,
            caption: item.caption,
            number: data?.[index-1]?.count || 0
          }
        }
      })
      setDataStatusReport(formatted)
    } catch (error) {
      console.error(error)
      setDataStatusReport(dataMetrics)
    } finally{
      setLoading({ ...loading, statusReport: false})
    }
  }

  useEffect(()=>{
    fetchDashboardStatusReport()
  }, [filter.year, filter.month])

  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-4">
      { dataStatusReport?.map((item, index)=>{
        return(
          <div key={index} className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-2xl text-gray-600 dark:text-gray-400">
                  {item.title.toUpperCase()}
                </h4>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-4xl dark:text-white/90">
                  { !loading.statusReport ? item.number : <Spinner/>}
                </h4>
              </div>
            </div>
            <div>
              <p
                style={{ fontSize: "11px" }}
                className="mt-2 text-gray-600 dark:text-white/90"
              >
                {item.caption}
              </p>
            </div>
          </div>

        )
      })}

      
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
