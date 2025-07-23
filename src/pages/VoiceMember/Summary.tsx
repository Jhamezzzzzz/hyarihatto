import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import Select from '../../components/form/Select'
import Label from '../../components/form/Label'
import DatePicker from '../../components/form/date-picker'
import { Card, CardContent, CardHeader } from '../../components/ui/card/card'
import BarSummary from '../../components/charts/bar/BarSummary'
import { useState } from 'react'
import PageMeta from '../../components/common/PageMeta'
import Badge from '../../components/ui/badge/Badge'
import Input from '../../components/form/input/InputField'
import StaticOptions from '../../utils/StaticOptions'

const VoiceMemberSummary = () => {
  const [filter, setFilter] = useState({
    search: "",
    shift: "",
    date: new Date().toLocaleDateString('en-CA', {
      month: "long",
      year: "numeric"
    })
  })
  const { optionsShift } = StaticOptions()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilter({ ...filter, [name]: value})
  }

  const handleChangeSelect = (name: string, value: string) => {
    setFilter({ ...filter, [name]: value})
  }

  const handleChangeDate = (date: Date[]) => {
    setFilter({ ...filter, date: new Date(date[0]).toLocaleDateString('en-CA', {
      month: "long",
      year: "numeric"
    })})
  }

  // const convertDate = () => {
  //   const formatted = new Date(`1 ${filter.date}`).toLocaleDateString('en-CA').slice(0, 7)
  //   console.log("filter.date: ", formatted)
  // }

  // useEffect(()=>{
  //   convertDate()
  // }, [filter.date])
  
  return (
    <div>
      <PageMeta title="Voice Member Summary | Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
      <PageBreadcrumb subPage='Voice Member' pageTitle='Summary'/>

      {/* Filters */}
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <div>
            <Label htmlFor='search'>Cari</Label>
            <Input
              id='search'
              name='search'
              placeholder='Cari nama atau no reg'
              className='bg-white dark:placeholder:text-gray-100!'
              onChange={handleChangeInput}
              value={filter.search}
            />
          </div>
          <div>
            <Label htmlFor='shift'>Shift</Label>
            <Select 
              name='shift'
              placeholder='Semua shift'
              options={optionsShift} 
              onChange={handleChangeSelect}
              className='min-w-[200px]'
              defaultValue={filter.shift}
            />
          </div>
        </div>
        <div>
            <Label htmlFor='period'>Periode</Label>
            <DatePicker 
              id='period'
              placeholder='Semua periode' 
              className='bg-white'
              defaultDate={filter.date}
              dateFormat="M-Y"
              mode="month"
              onChange={handleChangeDate}
            />
        </div>
      </div>

      {/* Chart */}
      <Card className='mt-4'>
        <CardHeader>
          <div className='dark:text-white  flex items-center lg:gap-20 gap-8 '>
            <div>
              <Label>Nama</Label>
              <p>Andika Aditya</p>
            </div>
            <div>
              <Label>No Reg</Label>
              <p>02194102</p> 
            </div>
            <div>
              <Label>Shift</Label>
              <p>Non-Shift</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex h-full'>
            <div className='w-full'>
              <div className='flex flex-wrap gap-3 p-2 justify-end'>
                <Badge color="light">Total : 9</Badge>
                <Badge color='success'>Terselesaikan : 5</Badge>
                <Badge color='warning'>Diajukan : 2</Badge>
                <Badge color='info'>Dijadwalkan : 1</Badge>
                <Badge color='error'>Tertolak : 1</Badge>
              </div>
              <BarSummary filter={filter}/>
            </div>
          </div>
        </CardContent>
      </Card>
     
      {/* Chart */}
      <Card className='mt-4'>
        <CardHeader>
          <div className='dark:text-white  flex items-center lg:gap-20 gap-8 '>
            <div>
              <Label>Nama</Label>
              <p>Jumantoro</p>
            </div>
            <div>
              <Label>No Reg</Label>
              <p>0219421</p> 
            </div>
            <div>
              <Label>Shift</Label>
              <p>Non-Shift</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex h-full'>
            <div className='w-full'>
              <div className='flex flex-wrap gap-3 p-2 justify-end'>
                <Badge color="light">Total : 9</Badge>
                <Badge color='success'>Terselesaikan : 5</Badge>
                <Badge color='warning'>Diajukan : 2</Badge>
                <Badge color='info'>Dijadwalkan : 1</Badge>
                <Badge color='error'>Tertolak : 1</Badge>
              </div>
              <BarSummary filter={filter}/>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card className='mt-4'>
        <CardHeader>
          <div className='dark:text-white  flex items-center lg:gap-20 gap-8 '>
            <div>
              <Label>Nama</Label>
              <p>Daffa</p>
            </div>
            <div>
              <Label>No Reg</Label>
              <p>0219421</p> 
            </div>
            <div>
              <Label>Shift</Label>
              <p>Non-Shift</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex h-full'>
            <div className='w-full'>
              <div className='flex flex-wrap gap-3 p-2 justify-end'>
                <Badge color="light">Total : 9</Badge>
                <Badge color='success'>Terselesaikan : 5</Badge>
                <Badge color='warning'>Diajukan : 2</Badge>
                <Badge color='info'>Dijadwalkan : 1</Badge>
                <Badge color='error'>Tertolak : 1</Badge>
              </div>
              <BarSummary filter={filter}/>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VoiceMemberSummary