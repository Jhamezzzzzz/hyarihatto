import { useNavigate } from 'react-router-dom';

const Panduan =() => {
const navigate = useNavigate();


const handleBack = () => {
  navigate('/home');
};


     return (
        <div className="page-panduan" >
            <div style={{position:'relative'}} >
                {/* Tombol Kembali di kiri */}
                <button 
                    className="button-back"
                    onClick={handleBack}
                    style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
                    Kembali
                </button>

                {/* Judul HYARIHATTO di tengah */}
                  <div style={{ textAlign: 'center' }}>
                    <h2 className="title-bigger-1 m-0">HYARIHATTO</h2>
                    <h6 className="m-0">“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h6>
                </div>
            </div>
            <div 
            className='d-flex justify-content-center align-item-center'
            style={{marginTop:'30px'}}>
                <div className="card shadow" style={{ width: '100%', maxWidth: '700px' }}>
                    <div className="card-header text-center">
                        <h5 className="mb-0">Petunjuk Pengisian Catatan Digital Hyarihatto</h5>
                    </div>
                    <div className="card-body">
                        <p>1. Ini adalah bentuk digital dari Buku Catatan Hyarihatto.</p>
                        <p>2. Diisi oleh masing-masing pribadi dan dikomunikasikan dengan atasan.</p>
                        <p>3. Online Hyarihatto ini juga berfungsi sebagai usulan dari karyawan untuk kondisi
                        safety yang lebih baik di lingkungan kerjanya dan level awareness safety yang ditunjukkan
                        dengan Hyarihatto score.</p>
                        <p>4. Hasil dari Catatan Hyarihatto yang sudah 
                        ditanggulangi dapat diajukan rewardnya melalui format Ide Suggestion.</p>
                        <p>5. Catatan ini dibacakan seminggu sekali bergantian dalam Safety Briefing 
                        5 minutes Talk yang dipimpin oleh GL/TL-nya.</p>
                        <p>6. Online Hyarihatto harus dikontrol secara regular oleh pimpinan kerja.</p>
                        <p>7. Apabila countermeasure tidak diperoleh di level GL/TL maka tema Hyarihatto 
                        tersebut harus dikonsultasikan dengan pimpinan yang lebih tinggi.</p>
                        <p>8. Apabila ada hal yang perlu ditanyakan dapat langsung disampaikan kepada 
                        SHE Karawang (ext. 5551, 5044, 5064, 5061) melalui pimpinan masing-masing.</p> 
                        
                    </div>
                </div>
            </div>
        </div>
 )

 }
 export default Panduan;

 
 

 
 
 