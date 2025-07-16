import Spinner from '../spinner'

const NoDataOrLoading = ({data, loading} : {data: unknown[] | [], loading: boolean}) => {
  return (
    <div className='flex justify-center items-center py-10'>
        { (data.length === 0 && !loading) && (
            <p>Tidak ada data ditemukan</p>
        )}
        { (loading) && (
            <div className="w-full h-full flex justify-center items-center gap-2">
                <Spinner/>
                Memuat data
            </div>
        )}
    </div>
  )
}

export default NoDataOrLoading