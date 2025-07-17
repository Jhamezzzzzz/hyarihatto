/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import { Card, CardContent } from '../../components/ui/card/card'
import Button from '../../components/ui/button/Button'
import Input from '../../components/form/input/InputField'
import useMasterDataService from '../../services/MasterDataService'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '../../components/ui/modal'
import Form from '../../components/form/Form'
import Label from '../../components/form/Label'
import NoDataOrLoading from '../../components/ui/table/NoDataOrLoading'
import Pagination from '../../components/ui/table/Pagination'
import { useDebounce } from '../../hooks/useDebonce'

interface MasterDataProps{
  id?: number;
  rank: string;
  minScore: number;
  maxScore: number;
  createdBy?: {
    name?: string;
  }
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: {
    name?: string;
  }
}
interface Loading{
  fetch: boolean;
  submit: boolean;
}

interface PaginationPops{
  currentPage: number,
  limitPerPage: number,
  totalPage: number
}

interface ShowModal{
  type: "add" | "update" | "delete";
  add: boolean;
  update: boolean;
  delete: boolean;
}

const ScoreRank = () => {
  const api = "score-ranks"
  const { getMasterData, postMasterData, updateMasterDataById, deleteMasterDataById } = useMasterDataService()
  const [loading, setLoading] = useState<Loading>({
    fetch: true,
    submit: false
  })
  const [idData, setIdData] = useState<number | null>(null)
  const [originalData, setOriginalData] = useState<MasterDataProps | null>(null);
  const [form, setForm] = useState<MasterDataProps>({
    rank: "",
    minScore: 0,
    maxScore: 0,
  })
  const [showModal, setShowModal] = useState<ShowModal>({
    type: "add",
    add: false,
    update: false,
    delete: false
  })
  const [dataMaster, setDataMaster] = useState<MasterDataProps[] | []>([])
  const [pagination, setPagination] = useState<PaginationPops>({
    currentPage: 1,
    limitPerPage: 10,
    totalPage: 1
  })
  const [searchQ, setSearchQ] = useState<string>("")
  const debouncedQ = useDebounce(searchQ, 500);

  const fetchDataMaster = async() => {
    try {
      setLoading({ ...loading, fetch: true})
      const response = await getMasterData(api, pagination.currentPage, pagination.limitPerPage, searchQ)
      console.log(response)
      setDataMaster(response?.data?.data)
      setPagination({
        currentPage: response?.data.meta.page,
        totalPage: response?.data.meta.totalPages,
        limitPerPage: response?.data.meta.limit,
      })
    } catch (error) {
      console.error(error)
      setDataMaster([])
      setPagination({
        currentPage: 0,
        totalPage: 0,
        limitPerPage: 0
      })
    } finally{
      setLoading({ ...loading, fetch: false})
    }
  }

  useEffect(()=>{
    fetchDataMaster()
  }, [pagination.currentPage, pagination.limitPerPage, debouncedQ])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value})
  }

  const checkChangedFields = () => {
    const changedFields: Partial<MasterDataProps> = {}
    if (form.rank !== originalData?.rank) {
      changedFields.rank = form.rank;
    }
    if (form.minScore !== originalData?.minScore) {
      changedFields.minScore = form.minScore;
    }
    if (form.maxScore !== originalData?.maxScore) {
      changedFields.maxScore = form.maxScore;
    }
    return changedFields
  }

  const handleSubmit = async(type: "add" | "update" | "delete") => {
    try {
      setLoading({ ...loading, submit: true})
      const changedFields: Partial<MasterDataProps> = checkChangedFields()
      const response = type==="add" ? await postMasterData(api, form) : type==="update" ? await updateMasterDataById(api, idData, changedFields) : type==="delete" ? await deleteMasterDataById(api, idData) : []
      console.log("response submit:", response)
      fetchDataMaster()
      handleCloseModal(type)
    } catch (error) {
      console.error(error)
    } finally{
      setLoading({ ...loading, submit: false})
    }
  }

  const handleOpenModal = (type: "add" | "update" | "delete", data: MasterDataProps) =>{
    if(type!=="add" && data.id){
      setIdData(data?.id)
    }
    setOriginalData({
      rank: data?.rank,
      minScore: data?.minScore,
      maxScore: data?.maxScore,
    })
    setForm({
      rank: data?.rank,
      minScore: data?.minScore,
      maxScore: data?.maxScore,
    })
    setShowModal({ ...showModal, type: type, [type]: true})
  }

  const handleCloseModal = (type: "add" | "update" | "delete") => {
    setForm({
      rank: "",
      minScore: 0,
      maxScore: 0,
    })
    setShowModal({...showModal, [type]: false})
  }

  const renderModal = (type: "add" | "update" | "delete") =>{
    return(
      <Modal
        isOpen={showModal[type]}
        onClose={()=>handleCloseModal(type)}
        parentClass="md:px-40 px-10 "
        className="w-full lg:w-100"
      >
        <Card>
          <h1 className='font-bold mb-5'>{type==="add" ? "Tambah" : type==="update" ? "Ubah" : type==="delete" ? "Hapus" : ""} Level</h1>
          <CardContent>
            { type !== "delete" && (
            <Form onSubmit={()=>handleSubmit(type)}>
              <div className='mb-3'>
                <Label>Rank</Label>
                <Input
                  name='rank'
                  onChange={handleChangeInput}
                  value={form.rank}
                />
              </div>
             
              <div className='mb-3'>
                <Label>Minimal Score</Label>
                <Input
                  type='number'
                  name='minScore'
                  onChange={handleChangeInput}
                  value={form.minScore}
                />
              </div>

              <div className='mb-3'>
                <Label>Maksimal Score</Label>
                <Input
                  type='number'
                  name='maxScore'
                  onChange={handleChangeInput}
                  value={form.maxScore}
                />
              </div>

              <div className='flex justify-end gap-4'>
                <Button size='sm' variant='outline' onClick={()=>handleCloseModal(type)}>Batal</Button>
                <Button size='sm' >{type==="add" ? "Tambah" : type==="update" ? "Simpan" :"" }</Button>
              </div>
            </Form>
            )}
            {type==="delete" && (
              <div>
                <h1>Yakin ingin menghapus <span className='font-semibold'>Rank {form.rank}?</span></h1>

                <div className='flex justify-end gap-4 pt-4'>
                  <Button size='sm' onClick={()=>handleCloseModal(type)} variant='outline'>Batal</Button>
                  <Button size='sm' onClick={()=>handleSubmit(type)}>Hapus</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Modal>
    )
  }
  
  return (
    <div>
      <PageBreadcrumb subPage='Master' pageTitle='Score Rank'/>
      { renderModal(showModal.type) }
      <div>
        <Card>
          <CardContent>
            <div className='flex justify-between'>
              <Button size='sm' onClick={()=>handleOpenModal('add', form)}>Tambah Data</Button>
              <Input
                placeholder='Cari'
                onChange={(e)=>setSearchQ(e.target.value)}
              />
            </div>
            <Table className='mt-10'>
              <TableHeader>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Rank</TableCell>
                  <TableCell>Minimal Score</TableCell>
                  <TableCell>Maksimal Score</TableCell>
                  <TableCell>Tanggal Pembuatan</TableCell>
                  <TableCell>Dibuat Oleh</TableCell>
                  <TableCell>Tanggal Perubahan</TableCell>
                  <TableCell>Diubah Oleh</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              { (dataMaster.length > 0 && !loading.fetch) && (
                <TableBody>
                  { dataMaster?.map((item: MasterDataProps, index: number)=>{
                    const dateLocalCreated = new Date(item.createdAt || "").toLocaleString('en-CA', {
                        hourCycle: 'h23',    // Use 24-hour format
                        timeZone: 'Asia/Jakarta'
                    });
                    const dateLocalUpdated = new Date(item.updatedAt || "").toLocaleString('en-CA', {
                        hourCycle: 'h23',    // Use 24-hour format
                        timeZone: 'Asia/Jakarta'
                    });

                    return(
                      <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{item.rank}</TableCell>
                        <TableCell>{item.minScore}</TableCell>
                        <TableCell>{item.maxScore}</TableCell>
                        <TableCell>
                          {dateLocalCreated}
                        </TableCell>
                        <TableCell>{item.createdBy?.name}</TableCell>
                        <TableCell>{item.updatedAt !== item.createdAt ? dateLocalUpdated : ""}</TableCell>
                        <TableCell>{item.updatedBy?.name}</TableCell>
                        <TableCell>
                          <div className='flex gap-2'>
                            <Button variant='blue' onClick={()=>handleOpenModal('update', item)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                            <Button variant='red' onClick={()=>handleOpenModal('delete', item)}><FontAwesomeIcon icon={faTrash}/></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              )}
            </Table>
            <NoDataOrLoading data={dataMaster} loading={loading.fetch}/>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPage}
              onPageChange={(e)=>{
                setPagination({...pagination, currentPage: e})
              }}
              showLimit
              onLimitChange={(e)=>{
                setPagination({ ...pagination, limitPerPage: e, currentPage: 1})
              }}
              limitPerPage={pagination.limitPerPage}
              options={[10, 25, 50]}
              />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ScoreRank