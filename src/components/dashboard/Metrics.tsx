import { useEffect, useState } from "react";
import useHyarihattoDataService from "../../services/HyarihattoDataService";
import Spinner from "../ui/spinner";

interface DataStatusReport{
  total: number
  0?: {
    total: number,
    count: number
  }
  1?: {
    total: number,
    count: number
  }
  2?: {
    total: number,
    count: number
  }
  3?: {
    total: number,
    count: number
  }
}

export default function Metrics() {
  const [loading, setLoading] = useState({
    statusReport: true
  })
  const [filter, setFilter] = useState({
    period: new Date().toLocaleDateString('en-CA').slice(0, 7)
  })
  const [dataStatusReport, setDataStatusReport] = useState<DataStatusReport>([])
  const { getDashboardStatusReport } = useHyarihattoDataService()

  const fetchDashboardStatusReport = async() => {
    try {
      const response = await getDashboardStatusReport(filter.period)
      const data = response?.data?.data
      console.log("RESPONSE Data: ", data)
      setDataStatusReport(data)
    } catch (error) {
      console.error(error)
    } finally{
      setLoading({ ...loading, statusReport: false})
    }
  }

  useEffect(()=>{
    fetchDashboardStatusReport()
  }, [])

  const dataMetrics = [
    {
      title: "Total",
      caption: "Jumlah catatan yang dibuat oleh Member",
      number: dataStatusReport?.total || 0,
    },
    {
      title: "Diajukan",
      caption: "Jumlah yang perlu direview oleh Leader",
      number: dataStatusReport?.[0]?.count || 0,
    },
    {
      title: "Dijadwalkan",
      caption: "Jumlah yang sudah dijadwalkan",
      number: dataStatusReport?.[1]?.count || 0,
    },
    {
      title: "Terselesaikan",
      caption: "Jumlah yang sudah terselesaikan",
      number: dataStatusReport?.[2]?.count || 0,
    },
    {
      title: "Ditolak",
      caption: "Jumlah yang ditolak oleh Leader",
      number: dataStatusReport?.[3]?.count || 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-4">
      { dataMetrics.map((item, index)=>{
        return(
          <div key={index} className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-11">
                <span className="text-2xl text-gray-600 dark:text-gray-400">
                  {item.title}
                </span>
                <div>
                  <span
                    style={{ fontSize: "11px" }}
                    className="mt-2 text-gray-600 dark:text-white/90"
                  >
                    {item.caption}
                  </span>
                </div>
              </div>
              <div className="col-span-1">
                <h4 className="font-bold text-gray-800 text-4xl dark:text-white/90">
                  { !loading.statusReport ? item.number : <Spinner/>}
                </h4>
              </div>
            </div>
          </div>

        )
      })}

      
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
