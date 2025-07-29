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

// Define the TypeScript interface for the table rows
interface Product {
  id: number; // Unique identifier for each product
  tanggal: string; // Product name
  waktu: string;
  nama: string; // Number of variants (e.g., "1 Variant", "2 Variants")
  noreg: string; // Category of the product
  shift: string;
  score: string; // Price of the product (as a string with currency symbol)
  rank: string;
  status: "diajukan" | "ditolak" | "dijadwalkan" | "terselesaikan";
}

// Define the table data using the interface
const tableData: Product[] = [
  {
    id: 1,
    tanggal: "20-10-2025",
    waktu: "08:00",
    nama: "jhames",
    noreg: "20031211",
    shift: "Ref",
    score: "12",
    rank: "Aa",
    status: "diajukan",
  },
  {
    id: 2,
    tanggal: "20-10-2025",
    waktu: "14:00",
    nama: "danur",
    noreg: "20031214",
    shift: "White",
    score: "9",
    rank: "Bb",
    status: "ditolak",
  },
  {
    id: 3,
    tanggal: "20-10-2025",
    waktu: "09:00",
    nama: "bagus",
    noreg: "20031215",
    shift: "Non Shift",
    score: "4",
    rank: "Cb",
    status: "dijadwalkan",
  },
  {
    id: 4,
    tanggal: "20-10-2025",
    waktu: "14:00",
    nama: "dika",
    noreg: "20031219",
    shift: "Siang",
    score: "1",
    rank: "Cc",
    status: "terselesaikan",
  },
];

const STATUS: {
  0: string,
  1: string,
  2: string,
  3: string
} = {
  0: "Diajukan",
  1: "Dijadwalkan",
  2: "Terselesaikan",
  3: "Ditolak"
}

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
  HazardEvaluation:{
    totalScore: number;
    rank: string;
  }
}

export default function ListSubmissions() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [dataSubmissions, setDataSubmissions] = useState([])
  const { getSubmissionForReviews } = useHyarihattoDataService()
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0,
    limit: 10
  })
  const [searchQ, setSearchQ] = useState<string>("")
  const debouncedQ = useDebounce(searchQ, 1000)

  const fetchDataSubmissions = async() => {
    try {
      setLoading(true)
      const response = await getSubmissionForReviews(pagination.page, pagination.limit, searchQ)
      console.log("response table: ", response?.data?.data)
      setDataSubmissions(response?.data?.data)
    } catch (error) {
      console.error(error)
      setDataSubmissions([])
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchDataSubmissions()
  }, [debouncedQ, pagination])

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Catatan Hyarihatto Member
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Cari"
            endIcon={<FaSearch/>}
            onChange={(e)=>setSearchQ(e.target.value)}
            value={searchQ}
          />
        </div>
      </div>
      <Table>
        {/* Table Header */}
        <TableHeader>
          <TableRow>
            <TableCell>Tanggal</TableCell>
            <TableCell>Waktu</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>No Reg</TableCell>
            <TableCell>Shift</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Rank</TableCell>
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
              <TableCell>{item.shift}</TableCell>
              <TableCell>{item.HazardEvaluation.totalScore}</TableCell>
              <TableCell>{item.HazardEvaluation.rank}</TableCell>
              <TableCell>
                <Badge
                  size="sm"
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
                  {STATUS[Number(item.status)].toUpperCase() || ""}
                </Badge>
              </TableCell>
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                <button
                  className="px-4 py-1 text-sm font-medium text-dark bg-primary hover:bg-primary-dark rounded-md transition duration-200"
                  onClick={() => navigate(`/hyarihatto/${item.id}`)} // Fungsi handleDetail opsional
                >
                  <FaClone/>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
