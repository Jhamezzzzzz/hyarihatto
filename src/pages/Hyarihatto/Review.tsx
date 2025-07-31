import { useEffect, useState } from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import useHyarihattoDataService from '../../services/HyarihattoDataService';
import PageMeta from '../../components/common/PageMeta';
import Label from '../../components/form/Label';
import DatePicker from '../../components/form/date-picker';
import YearPicker from '../../components/form/year-picker';
import Input from '../../components/form/input/InputField';
import { FaClone, FaSearch } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table';
import { Card, CardContent } from '../../components/ui/card/card';
import NoDataOrLoading from '../../components/ui/table/NoDataOrLoading';
import { useDebounce } from '../../hooks/useDebonce';
import Pagination from '../../components/ui/table/Pagination';
import Badge from '../../components/ui/badge/Badge';
import StaticOptions from '../../utils/StaticOptions';
import Button from '../../components/ui/button/Button';
import { useNavigate } from 'react-router';

interface Loading{
  fetch: boolean;
  submit: boolean;
}

interface Filters{
  month: string;
  monthName: string;
  year: number;
}

interface Paginations{
  page: number;
  totalPages: number;
  limit: number
}

interface DataSubmissions{
  id: number;
  user: {
    username: number;
    name: string;
  }
  shift: string;
  incidentDate: string;
  incidentTime: string;
  HazardEvaluation: {
    totalScore: number;
    rank: string
  }
  status: number;
}

const HyarihattoReview = () => {
  const [loading, setLoading] = useState<Loading>({
    fetch: false,
    submit: false
  })
  const [filter, setFilter] = useState<Filters>({
    month: "",
    monthName: "",
    year: new Date().getFullYear()
  })
  const [pagination, setPagination] = useState<Paginations>({
    page: 1,
    totalPages: 0,
    limit: 10
  })
  const [searchQ, setSearchQ] = useState<string>("")
  const debouncedQ = useDebounce(searchQ, 1000)
  const [dataSubmissions, setDataSubmissions] = useState<DataSubmissions[]>([])
  const { getSubmissionForReviews } = useHyarihattoDataService()
  const { STATUS_SUBMISSION } = StaticOptions()
  const navigate = useNavigate()

  const fetchSubmissions = async() => {
    try {
      setLoading({ ...loading, fetch: true})
      const response = await getSubmissionForReviews(filter.month, filter.year, pagination.page, pagination.limit, searchQ)
      console.log("response: ", response)
      setDataSubmissions(response?.data?.data)
      setPagination({
        page: response?.data?.meta?.page,
        totalPages: response?.data?.meta?.totalPages,
        limit: response?.data?.meta?.limit,
      })
    } catch (error) {
      console.error("ERROR FETCH: ", error)
      setDataSubmissions([])
      setPagination({
        ...pagination,
        page: 1,
        totalPages: 0,
      })
    } finally{
      setLoading({ ...loading, fetch: false})
    }
  }

  useEffect(()=>{
    fetchSubmissions()
  }, [filter.month, filter.year, pagination.page, debouncedQ])

  const handleChangeMonth = (date: Date[]) => {
    setFilter({
      ...filter,
      month: new Date(date[0]).toLocaleDateString('en-CA').slice(5, 7),
      monthName: new Date(date[0]).toLocaleDateString('en-CA', {
        month: 'short'
      }),
    })
  }

  const handleClearMonth = () => {
    setFilter({
      ...filter,
      month: "",
      monthName: ""
    })
  }

  const handleChangeYear = (year: number) => {
    setFilter({ ...filter, year: year})
  }

  return (
    <div>
      <PageMeta title="Hyarihatto Review | Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
      <PageBreadcrumb subPage='Hyarihatto' pageTitle='Review'/>

      {/* Filters */}
      <div className='flex gap-2 justify-between'>
        {/* Search */}
        <div>
          <Label>Cari</Label>
          <Input
            placeholder='Cari nama atau no reg'
            endIcon={<FaSearch/>}
            value={searchQ}
            onChange={(e)=>setSearchQ(e.target.value)}
          />
        </div>
        {/* Period */}
        <div className='flex gap-2'>
          <div>
            <Label>Bulan</Label>
            <DatePicker
              id='month'
              placeholder='Pilih periode bulan'
              defaultDate={filter.monthName}
              dateFormat='M'
              onChange={handleChangeMonth}
              mode='month'
              isClearable
              onClear={handleClearMonth}
            />
          </div>
          <div>
            <Label>Tahun</Label>
            <YearPicker
              placeholder='Pilih periode tahun'
              value={filter.year}
              onChange={handleChangeYear}
            />
          </div>
        </div>
      </div>

      {/* Table Data */}
      <Card className='mt-4'>
        <CardContent className='border border-gray-300 rounded-lg'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Waktu</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>No Reg</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Rank</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(!loading.fetch  && dataSubmissions.length > 0) && dataSubmissions.map((item: DataSubmissions, index: number)=>{
                  return(
                    <TableRow key={index}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell>{item.incidentDate}</TableCell>
                      <TableCell>{item.incidentTime.split("T")[1].slice(0, 5)}</TableCell>
                      <TableCell>{item.user.name}</TableCell>
                      <TableCell>{0+item.user.username}</TableCell>
                      <TableCell>
                        <Badge color={item.shift === "non-shift" ? "light" : item.shift === "red-shift" ? "error" : item.shift === "white-shift" ? "dark" : "info"}>
                          {item.shift.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.HazardEvaluation.totalScore}</TableCell>
                      <TableCell>{item.HazardEvaluation.rank}</TableCell>
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
                      <TableCell>
                        <Button
                          className="px-4 py-1 text-sm font-medium text-dark bg-primary hover:bg-primary-dark rounded-md transition duration-200"
                          onClick={() => navigate(`/hyarihatto/${item.id}`)} // Fungsi handleDetail opsional
                        >
                          <FaClone/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })} 
              </TableBody>
            </Table>
          </div>
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

export default HyarihattoReview