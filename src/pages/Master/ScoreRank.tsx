import React from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import { Card, CardContent } from '../../components/ui/card/card'
import Button from '../../components/ui/button/Button'
import Input from '../../components/form/input/InputField'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'

const ScoreRank = () => {
  return (
    <div>
      <PageBreadcrumb subPage='Master' pageTitle='Score Rank'/>

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
                  <TableCell>Score</TableCell>
                  <TableCell>Rank</TableCell>
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

export default ScoreRank