import { useState } from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import DatePicker from '../../components/form/date-picker'
import Label from '../../components/form/Label'
import Select from '../../components/form/Select'
import { Card, CardContent } from '../../components/ui/card/card'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import NoDataOrLoading from '../../components/ui/table/NoDataOrLoading'
import Pagination from '../../components/ui/table/Pagination'

const VoiceMemberHistory = () => {
  const [loading, setLoading] = useState({
    fetch: false,
    submit: false
  })
  return (
    <div>
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
              <TableCell>Temuan Kejadian</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>No Reg</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Detail</TableCell>
            </TableHeader>
            <TableBody>
              
            </TableBody>
          </Table>
          <NoDataOrLoading data={[]} loading={loading.fetch}/>
          <Pagination
          
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default VoiceMemberHistory