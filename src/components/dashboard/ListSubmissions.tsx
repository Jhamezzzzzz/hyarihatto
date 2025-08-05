import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useNavigate } from "react-router-dom";
import Input from "../form/input/InputField";
import { FaClone, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import useHyarihattoDataService from "../../services/HyarihattoDataService";
import { useDebounce } from "../../hooks/useDebonce";
import NoDataOrLoading from "../ui/table/NoDataOrLoading";
import Pagination from "../ui/table/Pagination";
import { Filter } from "../../pages/QuestLeader/HomeLeader";
import StaticOptions from "../../utils/StaticOptions";
import Button from "../ui/button/Button";

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
  }
}

export default function ListSubmissions({ filter }:{ filter: Filter}) {
  const navigate = useNavigate();
  const { STATUS_SUBMISSION } = StaticOptions()
  const [loading, setLoading] = useState(true)
  const [dataSubmissions, setDataSubmissions] = useState([])
  const { getSubmissionsRecent } = useHyarihattoDataService()
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 0,
    limit: 10
  })
  const [searchQ, setSearchQ] = useState<string>("")
  const debouncedQ = useDebounce(searchQ, 1000)

  const fetchDataSubmissions = async() => {
    try {
      setLoading(true)
      const response = await getSubmissionsRecent(filter.type, filter.month, filter.year, pagination.page, pagination.limit, searchQ)
      const data = response?.data?.data
      const meta = response?.data?.meta
      console.log("response data: ", data)
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
  }, [debouncedQ, pagination.page, filter.month, filter.year, filter.type])

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Catatan Hyarihatto Member
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Cari nama atau no reg"
            endIcon={<FaSearch/>}
            onChange={(e)=>setSearchQ(e.target.value)}
            value={searchQ}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell>Waktu</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>No Reg</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Line</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Detail</TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {(dataSubmissions.length > 0 && !loading) && dataSubmissions.map((item: DataSubmissions) => (
              <TableRow key={item.id}>
                <TableCell>{item.incidentDate}</TableCell>
                <TableCell>{item.incidentTime.split("T")[1].slice(0, 5)}</TableCell>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{0+item.user.username}</TableCell>
                <TableCell>
                  <Badge color={item.shift === "non-shift" ? "light" : item.shift === "red" ? "error" : item.shift === "white" ? "dark" : "info"}>
                    {item.shift.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{item?.line?.lineName}</TableCell>
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
                    onClick={() => window.open(`/hyarihatto/${item.id}`)} // Fungsi handleDetail opsional
                  >
                    <FaClone/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
        options={[10, 25, 50]}
      />
    </div>
  );
}
