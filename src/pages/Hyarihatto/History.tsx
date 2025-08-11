import { useEffect, useState } from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import DatePicker from '../../components/form/date-picker'
import Label from '../../components/form/Label'
import { Card, CardContent } from '../../components/ui/card/card'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import NoDataOrLoading from '../../components/ui/table/NoDataOrLoading'
import { useNavigate } from 'react-router-dom'
import PageMeta from '../../components/common/PageMeta'
import StaticOptions from "../../utils/StaticOptions";
import Badge from "../../components/ui/badge/Badge";
import { FaClone, FaSearch } from "react-icons/fa";
import Button from "../../components/ui/button/Button";
// import useHyarihattoDataService from '../../services/HyarihattoDataService'
import { useDebounce } from '../../hooks/useDebonce'
import YearPicker from '../../components/form/year-picker'
import Input from '../../components/form/input/InputField'
import Pagination, { PaginationProps } from '../../components/ui/table/Pagination'

interface DataSubmissions {
  id: number;
  incidentDate : string; // Product name
  incidentTime: string;
  user:{
    name: string;
    username: string;
  };
  shift: string;
  HazardEvaluation: {
    rank: string;
    totalScore: number;
  }
  status: number
}


const HyarihattoHistory = () => {
  const [loading, setLoading] = useState({
    fetch: false,
    submit: false
  })
  const navigate = useNavigate();
  const { STATUS_SUBMISSION } = StaticOptions()
  const [dataSubmissions, setDataSubmissions] = useState<DataSubmissions[]>([])
  const [filters, setFilters] = useState({
    month: "",
    monthName: "",
    year: new Date().getFullYear()
  })
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    totalPages: 0,
    limit: 10
  })
  const [searchQ, setSearchQ] = useState<string>("")
  const debouncedQ = useDebounce(searchQ, 1000)

  // const { getAllSubmissions } = useHyarihattoDataService()

  const fetchAllSubmissions = async() => {
    try {
      // setLoading({ ...loading, fetch: true})
      // const response = await getAllSubmissions(filters.month, filters.year, pagination.page, pagination.limit, searchQ)
      // console.log("response history: ", response)
      // const data = response?.data?.data
      // const meta = response?.data?.meta
      // setDataSubmissions(data)
      // setPagination({
      //   ...pagination,
      //   page: meta.page,
      //   totalPages: meta.totalPages
      // })
    } catch (error) {
      console.error(error)
      setDataSubmissions([])
      setPagination({
        ...pagination,
        page: 1,
        totalPages: 0
      })
    } finally{
      setLoading({ ...loading, fetch: false})
    }
  }

  useEffect(()=>{
    fetchAllSubmissions()
  }, [debouncedQ, pagination.page, filters.month, filters.year])

  const handleChangeMonth = (date: Date[]) => {
    setFilters({
      ...filters,
      month: new Date(date[0]).toLocaleDateString('en-CA').slice(5, 7),
      monthName: new Date(date[0]).toLocaleDateString('en-CA', {
        month: "short"
      }),
    })
  }

  const handleChangeYear = (year: number) => {  
    setFilters({
      ...filters,
      year: year
    })
  }
  
  return (
    <div>
      <PageMeta title="Hyarihatto History | Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
      <PageBreadcrumb subPage='Voice Member' pageTitle='History'/>

      {/* Filters */}
      <div className='flex justify-between gap-4'>
        <div>
          <Label>Cari</Label>
          <Input
            name='search'
            placeholder='Cari nama atau no reg'
            endIcon={<FaSearch/>}
            value={searchQ}
            onChange={(e)=>setSearchQ(e.target.value)}
          />
        </div>
        <div className='flex gap-2'>
          <div>
            <Label>Bulan</Label>
            <DatePicker
              id='period'
              mode='month'
              placeholder='Semua periode'
              className='bg-white'
              onChange={handleChangeMonth}
              defaultDate={filters.monthName}
            />
          </div>
          <div>
            <Label>Tahun</Label>
            <YearPicker
              placeholder='Semua periode'
              onChange={handleChangeYear}
              value={filters.year}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <Card className='mt-4'>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell>Waktu</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>No Reg</TableCell>
                <TableCell>Shift</TableCell>
                <TableCell>Rank</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Detail</TableCell>
              </TableRow>
            </TableHeader>
             <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            { (!loading.fetch && dataSubmissions.length > 0) && dataSubmissions.map((item: DataSubmissions, index: number) => {
              return(
                <TableRow key={item.id} className="">
                  <TableCell className="py-3">{index+1}</TableCell>
                  <TableCell className="py-3">{item.incidentDate}</TableCell>
                  <TableCell className="py-3">{item.incidentTime.split("T")[1].slice(0, 5)}</TableCell>
                  <TableCell className="py-3">{item.user.name}</TableCell>
                  <TableCell className="py-3">{0+item.user.username}</TableCell>
                  <TableCell className="py-3">
                    <Badge color={item.shift === "non-shift" ? "light" : item.shift === "red" ? "error" : item.shift === "white" ? "dark" : "info"}>
                      {item.shift.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">{item.HazardEvaluation.rank}</TableCell>
                  <TableCell className="py-3">{item.HazardEvaluation.totalScore}</TableCell>
                  <TableCell className="py-3 text-gray-900 text-theme-md dark:text-gray-400">
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
                      className="px-4 py-1 text-sm font-medium text-dark bg-primary hover:bg-primary-dark rounded-md transition duration-200" // Fungsi handleDetail opsional
                      onClick={()=>navigate(`/hyarihatto/${item.id}`)}
                    >
                      <FaClone/>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          </Table>
          <NoDataOrLoading data={dataSubmissions} loading={loading.fetch}/>
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
        </CardContent>
      </Card>
    </div>
  )
}

export default HyarihattoHistory