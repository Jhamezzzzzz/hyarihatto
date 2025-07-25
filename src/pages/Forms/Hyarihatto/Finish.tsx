import Template from './Template'
import Button from '../../../components/ui/button/Button'
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
                <h1 className=''>Terima kasih telah mengisi catatan Hyarihatto!</h1>
                <Button onClick={handleToHome} size='sm'>Kembali ke Halaman Utama</Button>
            </div>
        </Template>
    </div>
  )
}

export default Finish