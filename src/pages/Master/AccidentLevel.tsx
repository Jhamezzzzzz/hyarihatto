import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import { Card, CardContent } from '../../components/ui/card/card'
import Button from '../../components/ui/button/Button'
import Input from '../../components/form/input/InputField'
import useMasterDataService from '../../services/MasterDataService'
import { FormEvent, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '../../components/ui/modal'

interface MasterDataProps{
  rank: string;
  option: string;
  score: number;
}

interface Loading{
  fetch: boolean;
  submit: boolean;
}

interface ShowModal{
  type: "add" | "update" | "delete";
  add: boolean;
  update: boolean;
  delete: boolean;
}

const AccidentLevel = () => {
  const { getMasterData, postMasterData } = useMasterDataService()
  const [loading, setLoading] = useState<Loading>({
    fetch: true,
    submit: false
  })
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState<ShowModal>({
    type: "add",
    add: false,
    update: false,
    delete: false
  })
  const [dataMaster, setDataMaster] = useState<MasterDataProps[] | []>([])

  const fetchDataMaster = async() => {
    try {
      const response = await getMasterData('accident-levels')
      console.log("response: ", response)
      setDataMaster(response?.data?.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchDataMaster()
  }, [])

  const handleChangeInput = (e: FormEvent) => {
    setForm({ ...form, [e.target.name]: e.target.value})
  }

  const handleOpenModal = (type: "add" | "update" | "delete") =>{
    setShowModal({ ...showModal, type: type, [type]: true})
  }

  const renderModal = (type: "add" | "update" | "delete") =>{
    return(
      <Modal
        isOpen={showModal[type]}
        onClose={()=>setShowModal({...showModal, [type]: false})}
      >
        <div>
          TES
        </div>
      </Modal>
    )
  }
  
  return (
    <div>
      <PageBreadcrumb subPage='Master' pageTitle='Level Kecelakaan'/>
      { renderModal(showModal.type) }

      <div>
        <Card>
          <CardContent>
            <div className='flex justify-between'>
              <Button size='sm' onClick={()=>handleOpenModal('add')}>Tambah Data</Button>
              <Input
                placeholder='Cari'
              />
            </div>
            <Table className='mt-10'>
              <TableHeader>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Rank</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Nilai</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                { dataMaster?.length > 0 && dataMaster?.map((item: MasterDataProps, index: number)=>{
                  return(
                    <TableRow key={index}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell>{item.rank}</TableCell>
                      <TableCell>{item.option}</TableCell>
                      <TableCell>{item.score}</TableCell>
                      <TableCell>
                        <div className='flex gap-2'>
                          <Button variant='blue'><FontAwesomeIcon icon={faPenToSquare} /></Button>
                          <Button variant='red'><FontAwesomeIcon icon={faTrash}/></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AccidentLevel