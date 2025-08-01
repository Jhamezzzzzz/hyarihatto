import { useState } from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import DatePicker from '../../components/form/date-picker'
import Label from '../../components/form/Label'
import Select from '../../components/form/Select'
import { Card, CardContent } from '../../components/ui/card/card'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import NoDataOrLoading from '../../components/ui/table/NoDataOrLoading'
import { useNavigate } from 'react-router-dom'
import PageMeta from '../../components/common/PageMeta'
import StaticOptions from "../../utils/StaticOptions";
import Badge from "../../components/ui/badge/Badge";
import { FaClone } from "react-icons/fa";
import Button from "../../components/ui/button/Button";

interface Product {
  id: number;
  no:number; // Unique identifier for each product
  tanggal : string; // Product name
  waktu: string;
  nama: string; // Number of variants (e.g., "1 Variant", "2 Variants")
  noreg: string; // Category of the product
  shift: string;
  rank : string; // Price of the product
  status: number

}

const tableData: Product[] = [
  {
    id: 1,
    no:1,
    tanggal: "20-10-2025",
    waktu: "08:00",
    nama: "jhames",
    noreg: "20031311",
    shift: "Red",
    rank: "Ab",
    status:1
  },
  {
    id: 2,
    no: 2,
    tanggal: "20-10-2025",
    waktu: "08:00",
    nama: "Dika",
    noreg: "20031211",
    shift: "White",
     rank: "Bb",
     status:1
  },
  {
    id: 3,
    no: 3,
    tanggal: "20-10-2025",
    waktu: "08:00",
    nama: "Diki",
    noreg: "20031210",
    shift: "Non Shift",
    rank: "Ca",
    status:1
  },
  {
    id: 4,
    no: 4,
    tanggal: "20-10-2025",
    waktu: "08:00",
    nama: "Diku",
    noreg: "2003122",
    shift: "Non Shift",
    rank: "Bb",
    status:1
  },
];


const HyarihattoHistory = () => {
  const [loading] = useState({
    fetch: false,
    submit: false
  })
  const navigate = useNavigate();
    const { STATUS_SUBMISSION } = StaticOptions()

  return (
    <div>
      <PageMeta title="Hyarihatto History | Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
      <PageBreadcrumb subPage='Voice Member' pageTitle='History'/>

      {/* Filters */}
      <div className='flex gap-4'>
        <div>
          <Label>Periode</Label>
          <DatePicker
            id='period'
            mode='month'
            placeholder='Semua periode'
            className='bg-white'
          />
        </div>
        <div>
          <Label>Rank</Label>
          <Select
            placeholder='Semua rank'
            options={[]}
            onChange={()=>{}}
            className='min-w-[200px]'
          />
        </div>
        <div>
          <Label>Member</Label>
          <Select
            placeholder='Semua member'
            options={[]}
            onChange={()=>{}}
            className='min-w-[200px]'
          />
        </div>
      </div>

      {/* Table */}
      <Card className='mt-4'>
        <CardContent>
          <Table>
            <TableHeader>
              <TableCell>No</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Waktu</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>No Reg</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Detail</TableCell>
            </TableHeader>
             <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
              {product.no}
                </TableCell>
                <TableCell className="py-3">
              {product.tanggal}
                </TableCell>
                <TableCell className="py-3 text-gray-900 text-theme-md dark:text-gray-400">
                  {product.waktu}
                </TableCell>
                <TableCell className="py-3 text-gray-900 text-theme-md dark:text-gray-400">
                  {product.nama}
                </TableCell>
                <TableCell className="py-3 text-gray-900 text-theme-md dark:text-gray-400">
                  {product.noreg}
                </TableCell>
                <TableCell className="py-3 text-gray-900 text-theme-md dark:text-gray-400">
                  {product.shift}
                </TableCell>
                  <TableCell className="py-3 text-gray-900 text-theme-md dark:text-gray-400">
                  {product.rank}
                </TableCell>
                 <TableCell className="py-3 text-gray-900 text-theme-md dark:text-gray-400">
                        <Badge
                  size="sm"
                  variant="solid"
                  color={
                    product.status === 2
                      ? "success"
                      : product.status === 0
                      ? "warning"
                      : product.status === 1
                      ? "info"
                      : product.status === 3
                      ? "error"
                      : "error"
                  }
                >
            {STATUS_SUBMISSION[product.status].toUpperCase() || ""}
          </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">                
                      <Button
                    size="sm"
                    className="px-4 py-1 text-sm font-medium text-dark bg-primary hover:bg-primary-dark rounded-md transition duration-200" // Fungsi handleDetail opsional
                  >
                    <FaClone/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          <NoDataOrLoading data={[]} loading={loading.fetch}/>
 
        </CardContent>
      </Card>
    </div>
  )
}

export default HyarihattoHistory