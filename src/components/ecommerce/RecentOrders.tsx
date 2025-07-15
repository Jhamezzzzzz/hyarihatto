import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useNavigate } from 'react-router-dom';

// Define the TypeScript interface for the table rows
interface Product {
  id: number; // Unique identifier for each product
  tanggal : string; // Product name
  waktu: string;
  nama: string; // Number of variants (e.g., "1 Variant", "2 Variants")
  noreg: string; // Category of the product
  shift: string;
  score: string; // Price of the product (as a string with currency symbol)
  rank : string;
  counter: "ok" | "belum" ;
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
    rank:"Aa",
    counter: "ok",
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
    counter: "belum",
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
    counter: "ok",
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
    counter: "belum",
  },
];

export default 
function RecentOrders() {
const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            DAFTAR INPUT HYARIHATTO
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
           
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tanggal
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
               Waktu
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nama
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                No Reg
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Shift
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Score
              </TableCell>
               <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Rank
              </TableCell>
               <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Countermeasuered
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Detail
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
              {product.tanggal}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.waktu}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.nama}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.noreg}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.shift}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.score}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.rank}
                </TableCell>
                 <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                   <Badge
                    size="sm"
                    color={
                      product.counter === "ok"
                        ? "success"
                        : product.counter === "belum"
                        ? "warning"
                        : "error"
                    }
                  >
                   {product.counter}
                  </Badge>
                  
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">                
                   <button
                  className="px-4 py-1 text-sm font-medium text-dark bg-primary hover:bg-primary-dark rounded-md transition duration-200"
                  onClick={() => navigate(`/${product.id}`)} // Fungsi handleDetail opsional
                >
                  Detail
                </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
