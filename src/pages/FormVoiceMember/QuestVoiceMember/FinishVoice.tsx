import Template from './TemplateVoiceMember'
import { useNavigate } from 'react-router'

const Finish = () => {
    const navigate = useNavigate()

    const handleToHome = () => {
        navigate("/")
    }
  return (
    <div>
        <Template>
            <div className='flex flex-col items-center justify-center gap-3'>
                <h1 className='dark:text-gray-400'>Terima kasih telah mengisi catatan Voice Member!</h1>
                <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm transition"
                onClick={handleToHome}
                >
                Kembali ke Halaman Utama
                </button>
            </div>
        </Template>
    </div>
  )
}

export default Finish