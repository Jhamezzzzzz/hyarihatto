import Spinner from '../spinner'

const NoDataOrLoading = ({data, loading} : {data: unknown[] | [], loading: boolean}) => {
  return (
    <div className={`flex justify-center items-center ${(data.length === 0 || loading ? "py-10" : "py-2")} dark:text-gray-400`}>
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