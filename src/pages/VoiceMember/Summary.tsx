import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import Select from '../../components/form/Select'
import Label from '../../components/form/Label'
import DatePicker from '../../components/form/date-picker'
import { Card, CardContent } from '../../components/ui/card/card'
import BarSummary from '../../components/charts/bar/BarSummary'
import { useState } from 'react'
import PageMeta from '../../components/common/PageMeta'

const VoiceMemberSummary = () => {
  <PageMeta title='Voice Member' description=''/>

  const [filter, setFilter] = useState({
    date: new Date().toLocaleDateString('id-ID', {
      month: "long",
      year: "numeric"
    })
  })
  return (
    <div>
      <PageMeta title="Voice Member Summary | Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
      <PageBreadcrumb subPage='Voice Member' pageTitle='Summary'/>

      {/* Filters */}
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <div>
            <Label>Member</Label>
            <Select 
              placeholder='Semua member'
              options={[]} 
              onChange={()=>{}}
              className='min-w-[200px]'
            />
          </div>
          <div>
            <Label>Shift</Label>
            <Select 
              placeholder='Semua shift'
              options={[]} 
              onChange={()=>{}}
              className='min-w-[200px]'
            />
          </div>
        </div>
        <div>
            <Label>Periode</Label>
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
        <p className=' pb-3 dark:text-white'>Dika</p>
        <CardContent>
          <div className='flex h-full'>
            <div className='border-1 w-full dark:border-gray-700'>
              <BarSummary filter={filter}/>
            </div>

            <div className='w-[200px]  flex flex-col h-auto dark:text-gray-400'>
              <div className='border-1 dark:border-gray-700 text-center flex flex-col h-1/2'>
                Total Catatan
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

            </div>
          </div>
        </CardContent>
      </Card>
     
      {/* Chart */}
      <Card className='mt-4'>
        <p className=' pb-3 dark:text-white'>Jumantoro</p>
        <CardContent>
          <div className='flex h-full'>
            <div className='border-1 w-full dark:border-gray-700'>
              <BarSummary filter={filter}/>
            </div>

            <div className='w-[200px]  flex flex-col h-auto dark:text-gray-400'>
              <div className='border-1 dark:border-gray-700 text-center flex flex-col h-1/2'>
                Total Catatan
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

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VoiceMemberSummary