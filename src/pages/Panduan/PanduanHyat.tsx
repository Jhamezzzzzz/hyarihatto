import { useNavigate } from 'react-router-dom';
import WaveBackground from "../../components/image/Hijau-Hyarihatto.png";
export default function PamduanHyat() {
const navigate = useNavigate();


const handleBack = () => {
  navigate('/');
};


     return (
        <div 
        className=" min-h-screen bg-no-repeat bg-cover bg-center"
         style={{ backgroundImage: `url(${WaveBackground})` }} >
            <div style={{position:'relative'}} >
                {/* Tombol Kembali di kiri */}
                <button 
                    className="absolute top-4 left-4 inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300
                 hover:from-green-600 hover:to-green-800"
                    onClick={handleBack}>
                  <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>       
                    Kembali
                </button>
                </div>
                {/* Judul HYARIHATTO di tengah */}
                <div className='card'>
                  <div style={{ textAlign: 'center' }}>
                    <h2 className="title-bigger-1 m-0">HYARIHATTO</h2>
                    <h6 className="m-0">“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h6>
                </div>
           
            <div className='flex justify-center items-center '>
                <div 
                className="card shadow mt-10 px-4 py-4 opacity-80 bg-white rounded-xl backdrop-blur-md" 
                style={{ width: '100%', maxWidth: '750px' }}>
                    <div className="card-header text-center mb-3">
                        <p className="mb-0 text-2xl font-semibold">Petunjuk Pengisian Catatan Digital Hyarihatto</p>
                    </div>
                    <div className="card-body ">
                        <p className='leading-[1.8]'>1. Ini adalah bentuk digital dari Buku Catatan Hyarihatto.</p>
                        <p className='leading-[1.8]'>2. Diisi oleh masing-masing pribadi dan dikomunikasikan dengan atasan.</p>
                        <p className='leading-[1.8]'>3. Online Hyarihatto ini juga berfungsi sebagai usulan dari karyawan untuk kondisi
                        safety yang lebih baik di lingkungan kerjanya dan level awareness safety yang ditunjukkan
                        dengan Hyarihatto score.</p>
                        <p className='leading-[1.8]'>4. Hasil dari Catatan Hyarihatto yang sudah 
                        ditanggulangi dapat diajukan rewardnya melalui format Ide Suggestion.</p>
                        <p className='leading-[1.8]'>5. Catatan ini dibacakan seminggu sekali bergantian dalam Safety Briefing 
                        5 minutes Talk yang dipimpin oleh GL/TL-nya.</p>
                        <p className='leading-[1.8]'>6. Online Hyarihatto harus dikontrol secara regular oleh pimpinan kerja.</p>
                        <p className='leading-[1.8]'>7. Apabila countermeasure tidak diperoleh di level GL/TL maka tema Hyarihatto 
                        tersebut harus dikonsultasikan dengan pimpinan yang lebih tinggi.</p>
                        <p className='leading-[1.8]'>8. Apabila ada hal yang perlu ditanyakan dapat langsung disampaikan kepada 
                        SHE Karawang (ext. 5551, 5044, 5064, 5061) melalui pimpinan masing-masing.</p> 
                        
                    </div>
                    </div>
            </div>
            </div>
        </div>
 )

 }

 
 