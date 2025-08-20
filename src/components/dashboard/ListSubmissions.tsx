import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Input from "../form/input/InputField";
import { Card, CardContent } from "../ui/card/card";
import { FaClone, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import useHyarihattoDataService from "../../services/HyarihattoDataService";
import { useDebounce } from "../../hooks/useDebonce";
import NoDataOrLoading from "../ui/table/NoDataOrLoading";
import Pagination from "../ui/table/Pagination";
import { Filter } from "../../pages/QuestLeader/HomeLeader";
import StaticOptions from "../../utils/StaticOptions";
import Button from "../ui/button/Button";
import { useSidebar } from "../../context/SidebarContext";

type DataSubmissions = {
  id: number;
  incidentDate: string;
  incidentTime: string;
  user: {
    name: string;
    username: string;
  };
  shift: string;
  status: number;
  line: {
    lineName: string;
  };
  HazardAssessment?: {
    potentialHazard?: string;
  };
  VoiceMember?: {
    issue?: string;
  };
}

export default function ListSubmissions({ filter }:{ filter: Filter}) {
  const { STATUS_SUBMISSION } = StaticOptions()
  const [loading, setLoading] = useState(true)
  const [dataSubmissions, setDataSubmissions] = useState([])
  const { getSubmissionsRecent } = useHyarihattoDataService()
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 0,
    limit: 5
  })
  const [searchQ, setSearchQ] = useState<string>("")
  const debouncedQ = useDebounce(searchQ, 1000)
  const hrefType = filter.type === "hyarihatto" ? "hyarihatto" : filter.type === "voice member" ? "voice-member" : ""
  const { isMobile } = useSidebar()

  const fetchDataSubmissions = async() => {
    try {
      setLoading(true)
      const response = await getSubmissionsRecent(filter.type, filter.month, filter.year, pagination.page, pagination.limit, searchQ)
      const data = response?.data?.data
      console.log("dashboard table: ", data)
      const meta = response?.data?.meta
      setDataSubmissions(data)
      setPagination({
        page: meta?.page,
        totalPages: meta?.totalPages,
        limit: meta?.limit,
      })
    } catch (error) {
      console.error(error)
      setDataSubmissions([])
      setPagination({
        ...pagination,
        page: 1,
        totalPages: 0,
      })
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchDataSubmissions()
  }, [debouncedQ, pagination.page, pagination.limit, filter.month, filter.year, filter.type])

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Catatan { filter.type === "hyarihatto" ? "Hyarihatto Member" : filter.type === "voice member" ? "Voice Member" : ""}
          </h3>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Cari nama, no reg, atau issue"
            endIcon={<FaSearch/>}
            onChange={(e)=>setSearchQ(e.target.value)}
            value={searchQ}
            className="w-full!"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        { isMobile ? (
          <div>
                {(!loading && dataSubmissions.length > 0) && dataSubmissions.map((item: DataSubmissions, index: number) => {
                  const numberIndex = index+1 + ((pagination.page-1)*pagination.limit)
                  return(
                    <Card className='border dark:border-gray-700 shadow-none mb-3 relative'>
                      <CardContent>
                        <div className=''>
                          <p className=' absolute right-4 top-4 border bg-brand-50 dark:bg-brand-800 dark:text-gray-300 dark:border-gray-700 rounded-md size-10  flex items-center justify-center'>{numberIndex}</p>
                          <div className='w-full'>
                            <Table className='shadow-none'>
                              <TableBody>
                                <TableRow>
                                  <TableCell className='border-0!'>Tanggal</TableCell>
                                  <TableCell className='border-0!'>:</TableCell>
                                  <TableCell className='border-0!'>{item.incidentDate}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className='border-0!'>Waktu</TableCell>
                                  <TableCell className='border-0!'>:</TableCell>
                                  <TableCell className='border-0!'>{item.incidentTime.split("T")[1].slice(0, 5)}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className='border-0!'>Issue</TableCell>
                                  <TableCell className='border-0!'>:</TableCell>
                                  <TableCell className='border-0!'>{item?.HazardAssessment?.potentialHazard || item?.VoiceMember?.issue}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className='border-0!'>Name</TableCell>
                                  <TableCell className='border-0!'>:</TableCell>
                                  <TableCell className='border-0!'>{item?.user.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className='border-0!'>Noreg</TableCell>
                                  <TableCell className='border-0!'>:</TableCell>
                                  <TableCell className='border-0!'>{item?.user.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className='border-0!'>Shift</TableCell>
                                  <TableCell className='border-0!'>:</TableCell>
                                  <TableCell className='border-0!'>
                                    <Badge color={item.shift === "non-shift" ? "light" : item.shift === "red" ? "error" : item.shift === "white" ? "dark" : "info"}>
                                      <span className="px-2">{item.shift.toUpperCase()}</span>
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className='border-0!'>Line</TableCell>
                                  <TableCell className='border-0!'>:</TableCell>
                                  <TableCell className='border-0!'>{item?.line?.lineName || "-"}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className='border-0!'>Status</TableCell>
                                  <TableCell className='border-0!'>:</TableCell>
                                  <TableCell className='border-0!'>
                                     <Badge
                                      size="sm"
                                      variant="solid"
                                      color={
                                        item.status === 2
                                          ? "success"
                                          : item.status === 0
                                          ? "warning"
                                          : item.status === 1
                                          ? "info"
                                          : item.status === 3
                                          ? "error"
                                          : "error"
                                      }
                                    >
                                      {STATUS_SUBMISSION[item.status].toUpperCase() || ""}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell colSpan={3} className='border-0!'>
                                    <Button 
                                      onClick={() => window.open(`/${hrefType}/${item.id}`)} 
                                      startIcon={<FaClone/>} 
                                      className='w-full'
                                      >
                                        Buka Catatan
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
        ):(
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell className="min-w-[110px]">Tanggal</TableCell>
                <TableCell>Waktu</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>No Reg</TableCell>
                <TableCell>Shift</TableCell>
                <TableCell>Line</TableCell>
                <TableCell>Status</TableCell>  
                <TableCell>Detil</TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {(dataSubmissions.length > 0 && !loading) && dataSubmissions.map((item: DataSubmissions, index: number) => (
                <TableRow key={item.id}>
                  <TableCell>{index+1 + ((pagination.page-1)*pagination.limit)}</TableCell>
                  <TableCell className="text-md">{item.incidentDate}</TableCell>
                  <TableCell>{item.incidentTime.split("T")[1].slice(0, 5)}</TableCell>
                  <TableCell>{item?.HazardAssessment?.potentialHazard || item?.VoiceMember?.issue}</TableCell>
                  <TableCell  className="text-sm">{item.user.name}</TableCell>
                  <TableCell>{0+item.user.username}</TableCell>
                  <TableCell>
                    <Badge color={item.shift === "non-shift" ? "light" : item.shift === "red" ? "error" : item.shift === "white" ? "dark" : "info"}>
                      <span className="w-20 text-center">{item.shift.toUpperCase()}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{item?.line?.lineName || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      size="sm"
                      variant="solid"
                      color={
                        item.status === 2
                          ? "success"
                          : item.status === 0
                          ? "warning"
                          : item.status === 1
                          ? "info"
                          : item.status === 3
                          ? "error"
                          : "error"
                      }
                    >
                      {STATUS_SUBMISSION[item.status].toUpperCase() || ""}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Button
                      size="sm"
                      className="px-4 py-1 text-sm font-medium text-dark bg-primary hover:bg-primary-dark rounded-md transition duration-200"
                      onClick={() => window.open(`/${hrefType}/${item.id}`)} // Fungsi handleDetail opsional
                    >
                      <FaClone/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <NoDataOrLoading data={dataSubmissions} loading={loading}/>
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(e)=>{
          setPagination({...pagination, page: e})
        }}
        showLimit
        onLimitChange={(e)=>{
          setPagination({ ...pagination, limit: e, page: 1})
        }}
        limitPerPage={pagination.limit}
        options={[5, 25, 50]}
      />
    </div>
  );
}
