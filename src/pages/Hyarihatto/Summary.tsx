import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import Select from '../../components/form/Select'
import Label from '../../components/form/Label'
import DatePicker from '../../components/form/date-picker'
import { Card, CardContent } from '../../components/ui/card/card'
import BarSummary from '../../components/charts/bar/BarSummary'
import { useState } from 'react'
import PageMeta from '../../components/common/PageMeta'
import Badge from '../../components/ui/badge/Badge'
import Input from '../../components/form/input/InputField'

const HyarihattoSummary = () => {
  <PageMeta title='Hyarihatto' description=''/>

  const [filter, setFilter] = useState({
    date: new Date().toLocaleDateString('id-ID', {
      month: "long",
      year: "numeric"
    })
  })

  
  return (
    <div>
      <PageMeta title="Hyarihatto Summary | Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
      <PageBreadcrumb subPage='Hyarihatto' pageTitle='Summary'/>

      {/* Filters */}
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <div>
            <Label htmlFor='search'>Cari</Label>
            <Input
              id='search'
              placeholder='Cari nama atau no reg'
              className='bg-white dark:placeholder:text-gray-100!'
            />
          </div>
          <div>
            <Label htmlFor='shift'>Shift</Label>
            <Select 
              placeholder='Semua shift'
              options={[]} 
              onChange={()=>{}}
              className='min-w-[200px]'
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
              dateFormat="Y-m"
              mode="month"
              
            />
        </div>
      </div>

      {/* Chart */}
      <Card className='mt-4'>
        <p className='dark:text-white '>Andika </p>
        <div className='dark:text-white pb-3 text-gray-400 flex items-center gap-4'>
          <p>02194102</p> 
          <p>|</p> 
          <p>Non-Shift</p>
        </div>
        <CardContent>
          <div className='flex h-full'>
            <div className='border-1 rounded-lg w-full dark:border-gray-700'>
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
        <p className=' pb-3 dark:text-white'>Jumantoro</p>
        <CardContent>
          <div className='flex h-full'>
            <div className='border-1 rounded-lg w-full dark:border-gray-700'>
              <div className='flex flex-wrap gap-3 p-2 justify-end'>
                <Badge color="light">Total : 9</Badge>
                <Badge color='success'>Terselesaikan : 5</Badge>
                <Badge color='warning'>Diajukan : 2</Badge>
                <Badge color='info'>Dijadwalkan : 1</Badge>
                <Badge color='error'>Tertolak : 1</Badge>
              </div>
              <BarSummary filter={filter}/>
            </div>

            {/* <div className='w-[200px]  flex flex-col h-auto dark:text-gray-400'>
              <div className='border-1 dark:border-gray-700 text-center flex flex-col h-1/2'>
                Total Hyarihatto
                <h1 className='text-[40px] dark:text-white'>9</h1>
              </div>

              <div className='flex justify-center h-1/2'>
                <div className='border-1 dark:border-gray-700 w-full flex flex-col items-center'>
                  Selesai
                  <div className=' bg-primary1 w-[30px] h-[5px]'></div>
                  <h1 className='text-[40px] dark:text-white'>7</h1>
                </div>
                <div className='border-1 dark:border-gray-700 w-full flex flex-col items-center'>
                  Pending
                  <div className='bg-yellow-400 w-[30px] h-[5px]'></div>
                  <h1 className='text-[40px] dark:text-white'>2</h1>
                </div>
              </div>

            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HyarihattoSummary