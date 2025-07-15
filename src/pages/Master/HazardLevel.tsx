import React from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import { Card, CardContent } from '../../components/ui/card/card'
import Button from '../../components/ui/button/Button'
import Input from '../../components/form/input/InputField'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'

const HazardLevel = () => {
  return (
    <div>
      <PageBreadcrumb subPage='Master' pageTitle='Level Pencegah Bahaya'/>
      <div>
        <Card>
          <CardContent>
            <div className='flex justify-between'>
              <Button size='sm'>Tambah Data</Button>
              <Input
                placeholder='Cari'
                
              />
            </div>
            <Table className='mt-10'>
              <TableHeader>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Nilai</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>s</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HazardLevel