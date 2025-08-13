import { useEffect, useState } from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import useHyarihattoDataService from '../../services/HyarihattoDataService';
import PageMeta from '../../components/common/PageMeta';
import Label from '../../components/form/Label';
import DatePicker from '../../components/form/date-picker';
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
import Select from '../../components/form/Select';
import useMasterDataService from '../../services/MasterDataService';
import useVerify from '../../hooks/useVerify';
import { useSidebar } from '../../context/SidebarContext';

interface Loading{
  fetch: boolean;
  submit: boolean;
}

interface Filters{
  startDate: string;
  endDate: string;
  type: string;
  lineId: number | string;
  sectionId: number | string;
  status: string;
  shift: string;
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
  line: {
    lineName: string;
  }
  status: number;
  HazardAssessment?: {
    potentialHazard?: string;
  };
  VoiceMember?: {
    issue?: string;
  };
}

const HyarihattoSubmissions = () => {
  const { isSuperAdmin } = useVerify()
  const OPTIONS_TYPE = [{
    value: "hyarihatto",
    label: "Hyarihatto"
  },{
    value: "voice member",
    label: "Voice Member"
  }]
  const [loading, setLoading] = useState<Loading>({
    fetch: false,
    submit: false
  })
  const [loadingOptions, setLoadingOptions] = useState({
    line: false,
    section: false
  })
  const [filter, setFilter] = useState<Filters>({
    startDate: localStorage.getItem("filter.startDate") || "",
    endDate: localStorage.getItem("filter.endDate") || "",
    type: localStorage.getItem("filter.type") || "hyarihatto",
    lineId: localStorage.getItem("filter.lineId") || "",
    sectionId: localStorage.getItem("filter.sectionId") || "",
    status: "",
    shift: ""
  })
  const [pagination, setPagination] = useState<Paginations>({
    page: 1,
    totalPages: 0,
    limit: 10
  })
  const [searchQ, setSearchQ] = useState<string>("")
  const debouncedQ = useDebounce(searchQ, 1000)
  const [dataSubmissions, setDataSubmissions] = useState<DataSubmissions[]>([])
  const { getAllSubmissions } = useHyarihattoDataService()
  const { getMasterPublicData } = useMasterDataService()
  const { STATUS_SUBMISSION, optionsStatus, optionsShift } = StaticOptions()
  const [optionsLine, setOptionsLine] = useState([])
  const [optionsSection, setOptionsSection] = useState([])
  const hrefType = filter.type === "hyarihatto" ? "hyarihatto" : filter.type === "voice member" ? "voice-member" : ""
  const { isMobile } = useSidebar()

  const fetchSubmissions = async() => {
    try {
      setLoading({ ...loading, fetch: true})
      const response = await getAllSubmissions(
        filter.type, 
        filter.lineId,
        filter.sectionId,
        filter.startDate, 
        filter.endDate, 
        pagination.page, 
        pagination.limit, 
        searchQ,
        filter.status,
        filter.shift
      )
      const data = response?.data?.data
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
      setLoading({ ...loading, fetch: false})
    }
  }

  useEffect(()=>{
    fetchSubmissions()
  }, [filter.startDate, filter.endDate, pagination.page, pagination.limit, debouncedQ, filter.lineId, filter.sectionId, filter.type, filter.status, filter.shift])

  const fetchOptionsLine = async() => {
    try {
      setLoadingOptions({ ...loadingOptions, line: true})
      const response = await getMasterPublicData('line-specific-public')
      const options = response?.data?.map((item: { id: number, lineName: string})=>{
        return{
          value: item.id.toString(),
          label: item.lineName
        }
      })
      setOptionsLine(options)
    } catch (error) {
      console.error(error)
    } finally{
      setLoadingOptions({ ...loadingOptions, line: false})
    }
  }
  
  const fetchOptionsSection = async() => {
    try {
      setLoadingOptions({ ...loadingOptions, section: true})
      const response = await getMasterPublicData('section-public')
      const options = response?.data?.map((item: { id: number, sectionName: string})=>{
        return{
          value: item.id.toString(),
          label: item.sectionName
        }
      })
      setOptionsSection(options)
    } catch (error) {
      console.error(error)
    } finally{
      setLoadingOptions({ ...loadingOptions, section: false})
    }
  }

  useEffect(()=>{
    fetchOptionsLine()
    if(isSuperAdmin){
      fetchOptionsSection()
    }
  }, [isSuperAdmin])

  const handleChangeRangeDate = (date: Date[]) => {
    if(date.length === 2){
      const formattedStartDate = new Date(date[0]).toLocaleDateString('en-CA')
      const formattedEndDate = new Date(date[1]).toLocaleDateString('en-CA')
      setFilter({
        ...filter,
        startDate: new Date(date[0]).toLocaleDateString('en-CA'),
        endDate: new Date(date[1]).toLocaleDateString('en-CA'),
      })
      localStorage.setItem("filter.startDate", formattedStartDate)
      localStorage.setItem("filter.endDate", formattedEndDate)
    }
  }

  const handleClearRangeDate = () => {
    setFilter({
      ...filter,
      startDate: "",
      endDate: ""
    })
    localStorage.setItem("filter.startDate", "")
    localStorage.setItem("filter.endDate", "")
  }

  const handleChangeSelect = (name: string, value: string) => {
    setFilter({ ...filter, [name]: value})
    localStorage.setItem(`filter.${name}`, value.toString())
  }

  return (
    <div>
      <PageMeta title="Submissions | Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
      <PageBreadcrumb pageTitle='Submissions'/>

      {/* Filters */}
      <div className='flex gap-2 justify-between flex-wrap'>
        <div className='flex flex-wrap gap-2 justify-between w-full md:w-fit'>
          {/* Type */}
          <div className='w-full sm:w-auto'>
            <Label>Tipe</Label>
            <Select
              options={OPTIONS_TYPE}
              className='sm:w-[200px] '
              defaultValue={filter.type}
              name='type'
              onChange={handleChangeSelect}
            />
          </div>

          { isSuperAdmin && (
            <div className='w-full sm:w-auto'>
              <Label>Section</Label>
              <Select
                options={optionsSection}
                className='sm:w-[200px]'
                defaultValue={filter.sectionId.toString()}
                name='sectionId'
                onChange={handleChangeSelect}
                placeholder='Pilih section'
                showSearch
                isClearable
                isLoading={loadingOptions.section}
              />
            </div>
          )}

          <div className='w-full sm:w-auto'>
            <Label>Line</Label>
            <Select
              options={optionsLine}
              className='sm:w-[200px]'
              defaultValue={filter.lineId.toString()}
              name='lineId'
              onChange={handleChangeSelect}
              placeholder='Pilih lane'
              showSearch
              isClearable
            />
          </div>
        </div>
        {/* Period */}
        <div className='w-full sm:w-auto'>
          <Label>Periode</Label>
          <DatePicker
            id='date'
            mode='range'
            onChange={handleChangeRangeDate}
            className='sm:w-[300px]!'
            placeholder='Semua periode'
            isClearable
            dateFormat="Y-m-d"
            onClear={handleClearRangeDate}
            defaultDate={[filter.startDate, filter.endDate]}
          />
        </div>
      </div>

      {/* Table Data */}
      <Card className='mt-4'>
        <CardContent className='border border-gray-300 dark:border-gray-700 rounded-lg'>
          {/* Search */}
          <div className='grid grid-cols-12 gap-4'>
            <div className='xl:col-span-2 lg:col-span-3 col-span-6'>
              <Select
                options={optionsShift}
                placeholder='Pilih shift'
                name='shift'
                onChange={handleChangeSelect}
                defaultValue={filter.shift}
                isClearable
              />
            </div>
            <div className='xl:col-span-2 lg:col-span-3 col-span-6'>
              <Select
                options={optionsStatus}
                placeholder='Pilih status'
                name='status'
                onChange={handleChangeSelect}
                defaultValue={filter.status}
                isClearable
              />
            </div>
            <div className='xl:col-span-8 lg:col-span-6 col-span-12'>
              <Input
                placeholder={`Cari nama, no reg, atau issue`}
                endIcon={<FaSearch/>}
                value={searchQ}
                onChange={(e)=>setSearchQ(e.target.value)}
              />
            </div>
          </div>
          <div className='overflow-x-auto mt-4'>
            { isMobile ? (
              <div>
                {(!loading.fetch && dataSubmissions.length > 0) && dataSubmissions.map((item: DataSubmissions, index: number) => {
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
                                      {item.shift.toUpperCase()}
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
              <TableHeader>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Waktu</TableCell>
                  <TableCell>Issue</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>No Reg</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Line</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(!loading.fetch  && dataSubmissions.length > 0) && dataSubmissions.map((item: DataSubmissions, index: number)=>{
                  const numberIndex = index+1 + ((pagination.page-1)*pagination.limit)
                  return(
                    <TableRow key={index}>
                      <TableCell>{numberIndex}</TableCell>
                      <TableCell>{item.incidentDate}</TableCell>
                      <TableCell>{item.incidentTime.split("T")[1].slice(0, 5)}</TableCell>
                      <TableCell>{item?.HazardAssessment?.potentialHazard || item?.VoiceMember?.issue}</TableCell>
                      <TableCell>{item.user.name}</TableCell>
                      <TableCell>{0+item.user.username}</TableCell>
                      <TableCell>
                        <Badge color={item.shift === "non-shift" ? "light" : item.shift === "red" ? "error" : item.shift === "white" ? "dark" : "info"}>
                          {item.shift.toUpperCase()}
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
                      <TableCell>
                        <Button
                          className="px-4 py-1 text-sm font-medium text-dark bg-primary hover:bg-primary-dark rounded-md transition duration-200"
                          onClick={() => window.open(`/${hrefType}/${item.id}`)}
                        >
                          <FaClone/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })} 
              </TableBody>
            </Table>
            )}


          </div>
          <NoDataOrLoading data={dataSubmissions} loading={loading.fetch}/>
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(e)=>{
              setPagination({...pagination, page: e})
            }}
            showLimit
            onLimitChange={(limit)=>{
              setPagination({ ...pagination, limit: limit, page: 1})
            }}
            limitPerPage={pagination.limit}
            options={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default HyarihattoSubmissions