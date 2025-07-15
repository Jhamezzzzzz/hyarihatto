import React, { useState,useRef,useEffect} from "react";
import "../../css/home.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { FaCamera, FaImage,FaTimes  } from 'react-icons/fa';
import { Modal, Button } from "react-bootstrap";

const pilihanCatatan = [
  "Terjepit",
  "Tertimpa",
  "Tertabrak",
  "Terjatuh",
  "Tersetrum",
  "Terbakar",
  "Keracunan",
  "Habis O2",
  "Terpeleset",
  "Tergores",
  "Terlilit",
  "Terbentur",
  "Masuk Mata",
  "Lainnya"
];

const QuestUser = () => {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [previewImage, setPreviewImage] = useState([]);
  const [selectedTingkatCatatan, setSelectedTingkatCatatan] = useState("");
  const [inputLainnya, setInputLainnya] = useState("");
  const [stream, setStream] = useState(null);
  const [currentStep, setCurrentStep] = useState(2); // misalnya sekarang di step 2
  const inputCameraFrontRef = useRef();
  const inputCameraBackRef = useRef();
  const galleryInputRef = useRef(null);
  const [step, setStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    noreg: "",
    shift: "",
    date: '',
    time: '',
    line: '',
    location: '',
  });
  const [formCheckBox, setFormCheckBox] = useState({
  jenis: [],
  sumber: [],
  terluka: [],
  sebab: [],
  kategori: [],
  // ... data lainnya
});
const [selectedLevelKecelakaan, setSelectedLevelKecelakaan] = useState('');
const [selectedFrekuensiKerja, setSelectedFrekuensiKerja] = useState('');
const [selectedPencegahBahaya, setSelectedPencegahBahaya] = useState('');


useEffect(() => {
  if (showCameraModal && videoRef.current && stream) {
    videoRef.current.srcObject = stream;
  }
}, [showCameraModal, stream]);

  const handleNext = () => {
    setStep(step + 1); // step untuk konten
    setCurrentStep(currentStep + 1); // ini untuk update tampilan bullet
  };

  const handleBack = () => {
    setStep(step - 1);
    setCurrentStep(currentStep - 1);
  };


 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

 const buttonStep = (
  <div className="d-flex justify-content-center align-items-center mb-1">
    {[2, 3, 4, 5, 6, 7].map((s, index) => {
      const isActive = step === s;
      const isPassed = step > s;

      return (
        <React.Fragment key={s}>
          <button
            className={`step-bullet btn rounded-circle mx-0 ${
              isActive
                ? 'btn-primary'
                : isPassed
                ? 'btn-outline-primary'
                : 'btn-outline-secondary'
            }`}
            onClick={() => {
              if (s <= step) {
                setStep(s); // pindah step kalau sudah dilewati
              }
            }}
            disabled={s > step} // hanya aktif jika sudah dilewati
          >
            {index + 1}
          </button>
          {index < 5 && <span className="step-line mx-1">──</span>}
        </React.Fragment>
      );
    })}
  </div>
);


const handleCheckboxChange = (e, field) => {
  const { value, checked } = e.target;
  setFormCheckBox((prev) => {
    const updated = checked
      ? [...prev[field], value]
      : prev[field].filter((v) => v !== value);

    return {
      ...prev,
      [field]: updated,
    };
  });
};
//////////////////////////untuk Kamera////////////////////////////////////


  const handleGalleryInput = () => {
    if (galleryInputRef.current) galleryInputRef.current.click();
  };

    const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => ({
      url: URL.createObjectURL(file),
      file
    }));
    setPreviewImage((prev) => [...prev, ...urls]);
  };

const handleCameraOpen = async () => {
  try {
    setShowCameraModal(true); // tampilkan modal lebih dulu

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
    setStream(mediaStream); // simpan stream

    // srcObject akan diset otomatis oleh useEffect
  } catch (err) {
    console.error("Gagal membuka kamera:", err);
    alert("Tidak bisa mengakses kamera. Pastikan akses kamera diizinkan dan gunakan HTTPS atau localhost.");
  }
};
  
  const handleRemoveImage = (index) => {
    setPreviewImage((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCaptureImage = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;
  if (video && canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/png');

    // Tambahkan ke preview
    setPreviewImage((prev) => [...prev, { url: imageData }]);

    // Tutup modal dan hentikan kamera
    handleCloseCamera();
  }
};

const handleCloseCamera = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  setShowCameraModal(false);
};


  //////////////////////button selajutnya////////////////////////////////

const isFormatComplete1 =
  formData.date &&
  formData.time &&
  formData.line &&
  formData.location ;
 
  const isFormatComplete2 =
  formData.do && 
  formData.danger &&
  formData.condition &&
  formData.hope;

 const isFormatComplete3 =
  formCheckBox.jenis.length > 0 &&
  formCheckBox.sumber.length > 0 &&
  formCheckBox.terluka.length > 0 &&
  formCheckBox.sebab.length > 0 &&
  formCheckBox.kategori.length > 0;

  const isFormatComplete4 = 
  selectedTingkatCatatan !== "" && (
  selectedTingkatCatatan !== "Lainnya" || inputLainnya.trim() !== ""
);

const isFormatComplete5 =
  selectedLevelKecelakaan !== '' &&
  selectedFrekuensiKerja !== '' &&
  selectedPencegahBahaya !== '';



  return (
    <div className="form-wrapper" >
      {step === 1 && (
        <div className="page-center" >
            <div style={{marginTop:'10px',marginBottom:'20px',textAlign:'center'}}>
                <h2 className="title-bigger-1">HYARIHATTO</h2>
                <h5>“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h5>
            </div>
          <div className="card shadow" style={{ width: '100%', maxWidth: '700px' }}>
          <div className="card-header text-center">
            <h5 className="mb-0">Identitas Member</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">
                Nama:<span className="text-danger">*</span>
                </label>
              <input
              className="input-control"
                type="text"
                name="name"
                placeholder="Nama"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                No.Reg:<span className="text-danger">*</span>
                </label>
              <input
                type="number"
                name="noreg"
                className="input-control"
                placeholder="Nomor Registrasi"
                value={formData.noreg}
                onChange={handleChange}
                disabled={!formData.name} // Disable if name is not entered
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Shift:<span className="text-danger">*</span>
                </label>
              <input
                type="text"
                name="shift"
                className="input-control"
                placeholder="Shift"
                value={formData.shift}
                onChange={handleChange}
                disabled={!formData.noreg} // Disable if noreg is not entered
              />
            </div>

            <div className="text-end">
              <button 
              className="btn btn-primary" 
              onClick={handleNext}
              disabled={
                !formData.name ||
                !formData.noreg ||
                !formData.shift 
                }>
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
        </div>
      )}
{/* //////////////////////////////////////////Pertanyaan Ke-1////////////////////////////////////////// */}
      {step === 2 && (
         <div className="page-center" >
            <div style={{marginTop:'10px',marginBottom:'20px',textAlign:'center'}}>
                <h2 className="title-bigger-1">HYARIHATTO</h2>
                <h5>“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h5>
            </div>
           <div className="d-flex justify-content-center mb-4">
                {buttonStep}
            </div>
          <div className="card shadow" style={{ width: '100%', maxWidth: '700px' }}>
          <div className="card-header text-center">
            <h5 className="mb-0">Waktu & Lokasi</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">
                Tanggal:<span className="text-danger">*</span>
                </label>
              <input
              className="input-control"
                type="date"
                name="date"
                placeholder="Tanggal"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Waktu: <span className="text-danger">*</span>
                </label>
              <input
                type="time"
                name="time"
                className="input-control"
                placeholder="Waktu"
                value={formData.time}
                onChange={handleChange}
                disabled={!formData.date} // Disable if date is not selected
              />
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Line/Process:<span className="text-danger">*</span>
                </label>
              <input
                type="text"
                name="line"
                className="input-control"
                placeholder="Line"
                value={formData.line}
                onChange={handleChange}
                disabled={!formData.time} // Disable if date is not selected
              />
            </div>
             <div className="mb-3">
              <label className="form-label">
                Lokasi:<span className="text-danger">*</span>
                </label>
              <input
                type="text"
                name="location"
                className="input-control"
                placeholder="Lokasi"
                value={formData.location}
                onChange={handleChange}
                disabled={!formData.line} // Disable if date is not selected
              />
            </div>

            <div className="text-end">
                <button className="btn btn-primary" onClick={handleBack} style={{ marginRight: "10px" }}>
                Sebelumnya
              </button>
             <button 
                className={`btn me-2 ${isFormatComplete1? "btn-primary" : "btn-secondary"}`} 
                onClick={handleNext}
                disabled={!isFormatComplete1}
                >
                Selanjutnya
                </button>
            </div>
          </div>
        </div>
        </div>
      )}

      {step === 3 && (
       <div className="page-center" >
            <div style={{marginTop:'10px',marginBottom:'20px',textAlign:'center'}}>
                <h2 className="title-bigger-1">HYARIHATTO</h2>
                <h6>“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h6>
            </div>
           <div className="d-flex justify-content-center mb-4">
                {buttonStep}
            </div>
          <div className="card shadow" style={{ width: '100%', maxWidth: '700px' }}>
          <div className="card-header text-center">
            <h5 className="mb-0">Catatan</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">
                Apa yang sedang dilakukan?<span className="text-danger">*</span>
                </label>
              <textarea
              className="input-control"
                type="text"
                name="do"
                placeholder=""
                value={formData.do}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Potensi bahaya apa yang akan timbul <span className="text-danger">*</span>
                </label>
              <textarea
                type="text"
                name="danger"
                className="input-control"
                value={formData.danger}
                onChange={handleChange}
                disabled={!formData.do} // Disable if date is not selected
              />
            </div>

            <div className="mb-3">
                <label className="form-label">
                Mengapa kondisinya berbahaya seperti itu?<span className="text-danger">*</span>
                </label>
              <textarea
                type="text"
                name="condition"
                className="input-control"
                value={formData.condition}
                onChange={handleChange}
                disabled={!formData.danger} // Disable if date is not selected
              />
            </div>
             <div className="row-text ">
              <label className="form-label">
                Seharusnya kondisinya bagaimana?<span className="text-danger">*</span>
                </label>
                 <label className="form-label">
                Tuliskan Harapan / Usulan perbaikan Anda
                </label>
              <textarea
                type="text"
                name="hope"
                className="input-control"
                value={formData.hope}
                onChange={handleChange}
                disabled={!formData.condition} // Disable if date is not selected
              />
            </div>

            <div className="text-end">
                <button className="btn btn-primary" onClick={handleBack} style={{ marginRight: "10px" }}>
                Sebelumnya
              </button>
               <button 
                className={`btn me-2 ${isFormatComplete2 ? "btn-primary" : "btn-secondary"}`} 
                onClick={handleNext}
                disabled={!isFormatComplete2}
                >
                Selanjutnya
                </button>
            </div>
          </div>
        </div>
        </div>
      )}
        {/* /////////////////////////////////////////////CheckBox////////////////////////////////////// */}
      {step === 4 && (
        <div className="page-center" >
            <div style={{marginTop:'10px',marginBottom:'20px',textAlign:'center'}}>
                <h2 className="title-bigger-1">HYARIHATTO</h2>
                <h6>“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h6>
            </div>
           <div className="d-flex justify-content-center mb-4">
                {buttonStep}
            </div>
          <div className="card shadow" style={{ width: '100%', maxWidth: '700px' }}>
            <div className="card-header text-center">
                <h5 className="mb-0">Tingkat Catatan</h5>
            </div>
            <div className="card-body">

            {/* //////////////////////////Card Jenis & Akibat //////////////////////////////////// */}
           <div className="row">
            <div className="col-12 col-md-6 mb-3">
                <div className="card shadow h-100">
                <div className="card-header text-center">
                    <h5 className="mb-0">
                      Jenis <span className="text-danger">*</span>
                    </h5>
                </div>
                <div className="card-body">
                      <div className="form-check">
                        <input
                        className="form-check-input"
                        type="checkbox"
                        name="jenis"
                        value="reguler"
                        checked={formCheckBox.jenis.includes("reguler")}
                        onChange={(e) => handleCheckboxChange(e, "jenis")}
                        
                        />
                        <label className="form-check-label">Reguler</label>
                      </div>

                      <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="jenis"
                          value="lowfreak"
                          checked={formCheckBox.jenis.includes("lowfreak")}
                          onChange={(e) => handleCheckboxChange(e, "jenis")} 
                          />
                          <label className="form-check-label">Low Freak </label>
                      </div>
                       <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="jenis"
                          value="irregular"
                          checked={formCheckBox.jenis.includes("irregular")}
                          onChange={(e) => handleCheckboxChange(e, "jenis")}  
                          />
                          <label className="form-check-label">Irregular</label>
                      </div> 
                        <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="jenis"
                          value="abnormal"
                          checked={formCheckBox.jenis.includes("abnormal")}
                          onChange={(e) => handleCheckboxChange(e, "jenis")}  
                          />
                          <label className="form-check-label">Abnormal</label>
                      </div> 
                  </div>
                </div>
            </div>

            <div className="col-12 col-md-6 mb-3">
                <div className="card shadow h-100">
                <div className="card-header text-center">
                    <h5 className="mb-0">
                      Sumber & Akibat<span className="text-danger">*</span>
                    </h5>
                </div>
                <div className="card-body">
                     <div className="form-check">
                        <input
                        className="form-check-input"
                        type="checkbox"
                        name="sumber"
                        value="pengalaman"
                        checked={formCheckBox.sumber.includes("pengalaman")}
                        onChange={(e) => handleCheckboxChange(e, "sumber")}  
                        
                        />
                        <label className="form-check-label">Pengalaman</label>
                      </div>

                      <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="sumber"
                          value="praduga"
                          checked={formCheckBox.sumber.includes("praduga")}
                          onChange={(e) => handleCheckboxChange(e, "sumber")}   
                          />
                          <label className="form-check-label">Praduga</label>
                      </div>
                       <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="sumber"
                          value="direct" 
                          checked={formCheckBox.sumber.includes("direct")}
                          onChange={(e) => handleCheckboxChange(e, "sumber")} 
                          />
                          <label className="form-check-label">Direct acc</label>
                      </div> 
                        <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="sumber"
                          value="ergo" 
                          checked={formCheckBox.sumber.includes("ergo")}
                          onChange={(e) => handleCheckboxChange(e, "sumber")} 
                          />
                          <label className="form-check-label">Ergo (PAK)</label>
                      </div> 
                </div>
                </div>
            </div>
            </div>

                 {/* //////////////////////////Terluka,sebab& Kategoru //////////////////////////////////// */}
             <div className="row"> 
                <div className="col-12 col-md-4 mb-3">
                  <div className="card shadow" style={{ width: '100%', maxWidth: '700px' }}>
                    <div className="card-header text-center">
                        <h5 className="mb-0">
                          Terluka <span className="text-danger">*</span>
                          </h5>
                    </div>
                    <div className="card-body">
                      <div className="form-check">
                        <input
                        className="form-check-input"
                        type="checkbox"
                        name="terluka"
                        value="kepala"
                        checked={formCheckBox.terluka.includes("kepala")}
                        onChange={(e) => handleCheckboxChange(e, "terluka")} 
                        
                        />
                        <label className="form-check-label">Kepala</label>
                      </div>

                      <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="terluka"
                          value="tangan"
                          checked={formCheckBox.terluka.includes("tangan")}
                          onChange={(e) => handleCheckboxChange(e, "terluka")}  
                          />
                          <label className="form-check-label">Tangan</label>
                      </div>
                       <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="terluka"
                          value="kaki" 
                          checked={formCheckBox.terluka.includes("kaki")}
                          onChange={(e) => handleCheckboxChange(e, "terluka")} 
                          />
                          <label className="form-check-label">Kaki</label>
                      </div> 
                        <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="terluka"
                          value="badan"
                          checked={formCheckBox.terluka.includes("badan")}
                          onChange={(e) => handleCheckboxChange(e, "terluka")} 
                          />
                          <label className="form-check-label">Badan</label>
                      </div> 
                    </div>
                  </div>
                 </div> 
                <div className="col-12 col-md-4 mb-3">
                    <div className="card shadow" style={{ width: '100%', maxWidth: '700px' }}>
                        <div className="card-header text-center">
                            <h5 className="mb-0">
                              Sebab <span className="text-danger">*</span>
                            </h5>
                        </div>
                        <div className="card-body">
                      <div className="form-check">
                        <input
                        className="form-check-input"
                        type="checkbox"
                        name="sebab"
                        value="lalai"
                        checked={formCheckBox.sebab.includes("lalai")}
                        onChange={(e) => handleCheckboxChange(e, "sebab")} 
                        
                        />
                        <label className="form-check-label">Lalai/Lengah</label>
                      </div>

                      <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="sebab"
                          value="gesa"
                          checked={formCheckBox.sebab.includes("gesa")}
                          onChange={(e) => handleCheckboxChange(e, "sebab")}  
                          />
                          <label className="form-check-label">Tergesa-gesa</label>
                      </div>
                       <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="sebab"
                          value="terampil"
                          checked={formCheckBox.sebab.includes("terampil")}
                          onChange={(e) => handleCheckboxChange(e, "sebab")}  
                          />
                          <label className="form-check-label">Tdk Terampil</label>
                      </div> 
                        <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="sebab"
                          value="lelah"
                          checked={formCheckBox.sebab.includes("lelah")}
                          onChange={(e) => handleCheckboxChange(e, "sebab")}   
                          />
                          <label className="form-check-label">Lelah</label>
                        </div>
                      </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 mb-3">
                 <div className="card shadow" style={{ width: '100%', maxWidth: '700px' }}>
                    <div className="card-header text-center">
                        <h5 
                        className="mb-0">Kategori <span className="text-danger">*</span>
                        </h5>
                    </div>
                    <div className="card-body">
                       <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="kategori"
                          value="human"
                          checked={formCheckBox.kategori.includes("human")}
                          onChange={(e) => handleCheckboxChange(e, "kategori")} 
                          />
                          <label className="form-check-label">Human</label>
                      </div>
                       <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="kategori"
                          value="machine"
                          checked={formCheckBox.kategori.includes("machine")}
                          onChange={(e) => handleCheckboxChange(e, "kategori")}  
                          />
                          <label className="form-check-label">Machine</label>
                      </div> 
                        <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          name="kategori"
                          value="workplace"
                          checked={formCheckBox.kategori.includes("workplace")}
                          onChange={(e) => handleCheckboxChange(e, "kategori")} 
                          />
                          <label className="form-check-label">Workplace</label>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {/* //////////////////////Button End//////////////////////////// */}
            <div className="text-end">
                <button className="btn btn-primary" onClick={handleBack} style={{ marginRight: "10px" }}>
                Sebelumnya
              </button>
               <button 
                className={`btn me-2 ${isFormatComplete3 ? "btn-primary" : "btn-secondary"}`} 
                onClick={handleNext}
                disabled={!isFormatComplete3}
                >
                Selanjutnya
                </button>
            </div>
          </div>
        </div>
        </div>
      )}

      {step === 5 && (
        <div className="page-center" >
            <div style={{marginTop:'10px',marginBottom:'20px',textAlign:'center'}}>
                <h2 className="title-bigger-1">HYARIHATTO</h2>
                <h6>“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h6>
            </div>
           <div className="d-flex justify-content-center mb-4">
                {buttonStep}
            </div>
          <div className="card shadow" style={{ width: '100%', maxWidth: '700px' }}>
            <div className="card-header text-center">
                <h5 className="mb-0">Bukti Kejadian</h5>
            </div>
            <div className="card-body">
            {/* PREVIEW AREA */}
              {previewImage.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "280px",
                    backgroundColor: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <p className="text-white m-0">Silakan upload gambar kejadian</p>
                </div>
              ) : (
                <div
                  className="d-flex flex-wrap justify-content-center gap-3 mb-4"
                >
                  {previewImage.map((img, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: "140px",
                        height: "140px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "2px solid #dee2e6",
                      }}
                    >
                      <img
                        src={img.url}
                        alt={`img-${index}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          background: "#dc3545",
                          color: "#fff",
                          border: "none",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* //////////////////button//////////////////// */}

              <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-outline-success" onClick={handleGalleryInput}>
                  <FaImage className="me-2" />
                  Ambil Galeri
                </button>
                <button className="btn btn-outline-primary" onClick={handleCameraOpen}>
                  <FaCamera className="me-2" />
                  Ambil Kamera
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={galleryInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {showCameraModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Ambil Foto</h5>
                        <button type="button" className="btn-close" onClick={handleCloseCamera}></button>
                      </div>
                      <div className="modal-body text-center">
                       <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          style={{
                            width: '100%',
                            maxHeight: '400px',
                            backgroundColor: '#000',
                            borderRadius: '8px'
                          }}
                        />
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                      </div>
                      <div className="modal-footer justify-content-between">
                        <button className="btn btn-secondary" onClick={handleCloseCamera}>Batal</button>
                        <button className="btn btn-primary" onClick={handleCaptureImage}>Simpan Gambar</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

                <div className="text-end">
                <button className="btn btn-primary" onClick={handleBack} style={{ marginRight: "10px" }}>
                Sebelumnya
              </button>
              <button 
                className={`btn me-2 ${previewImage.length > 0 ? "btn-primary" : "btn-secondary"}`} 
                onClick={handleNext}
                disabled={previewImage.length === 0}
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
        </div>
      )}
       {step === 6 && (
        <div className="page-center" >
            <div style={{marginTop:'10px',marginBottom:'20px',textAlign:'center'}}>
                <h2 className="title-bigger-1">HYARIHATTO</h2>
                <h6>“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h6>
            </div>
           <div className="d-flex justify-content-center mb-4">
                {buttonStep}
            </div>
          <div className="card shadow" style={{ width: '100%', maxWidth: '700px' }}>
            <div className="card-header text-center">
                <h5 className="mb-0">Tingkat Catatan</h5>
            </div>
           <div className="card-body">
              <p className="mb-3">Silakan pilih salah satu:</p>

              {pilihanCatatan.map((item, index) => {
                const isChecked = selectedTingkatCatatan === item;

                return (
                  <div key={index}>
                    <div
                      className="d-flex justify-content-between align-items-center px-3 py-2 mb-2"
                      style={{
                        border: isChecked ? "2px solid #0d6efd" : "1px solid #dee2e6",
                        borderRadius: "8px",
                        backgroundColor: isChecked ? "rgba(13, 110, 253, 0.1)" : "white",
                        transition: "all 0.3s",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedTingkatCatatan(item)}
                    >
                      <label
                        htmlFor={`tingkat-${index}`}
                        style={{ marginBottom: 0, cursor: "pointer", flex: 1 }}
                      >
                        {item}
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tingkatCatatan"
                        id={`tingkat-${index}`}
                        value={item}
                        checked={isChecked}
                        onChange={() => setSelectedTingkatCatatan(item)}
                      />
                    </div>

                    {/* ✅ Tambahkan input jika "Lainnya" dipilih */}
                    {item === "Lainnya" && isChecked && (
                      <div className="mb-3 px-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan deskripsi lainnya..."
                          value={inputLainnya}
                          onChange={(e) => setInputLainnya(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* //////////////////////Button End//////////////////////////// */}
            <div className="text-end">
                <button className="btn btn-primary" onClick={handleBack} style={{ marginRight: "10px" }}>
                Sebelumnya
              </button>
              <button 
                className={`btn me-2 ${isFormatComplete3 ? "btn-primary" : "btn-secondary"}`} 
                onClick={handleNext}
                disabled={!isFormatComplete4}
              >
                Selanjutnya
              </button>

            </div>
          </div>
        </div>
      )}
          {/* ////////////////////////Rank//////////////////////////////////// */}
       {step === 7 && (
          <div className="page-center">
            {/* Judul dan Step Button */}
            <div style={{ marginTop: '10px', marginBottom: '20px', textAlign: 'center' }}>
              <h2 className="title-bigger-1">HYARIHATTO</h2>
              <h6>“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h6>
            </div>
            <div className="d-flex justify-content-center mb-4">{buttonStep}</div>
            <div className="card-body" style={{ width: '100%', maxWidth: '700px' }}>
            {/* Card Pengisian Hyarihatto */}
            <div className="card shadow mx-auto mb-4" style={{ width: '100%', maxWidth: '700px' }}>
              <div className="card-header text-center">
                <h5 className="mb-0">Pengisian Hyarihatto Score dan Rank</h5>
              </div>
              <div className="card-body">
                {/* Level Kecelakaan */}
                <div className="card shadow mb-3">
                  <div className="card-header text-center">
                    <h5 className="mb-0">Level Kecelakaan <span className="text-danger">*</span></h5>
                  </div>
                  <div className="card-body">
                    {[
                      { kode: "a", label: "Fatal", value: 12 },
                      { kode: "b", label: "Perlu Cuti", value: 6 },
                      { kode: "c", label: "Tidak Perlu Cuti", value: 2 },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between px-3 py-2 mb-2"
                        style={{
                          border: selectedLevel === item.kode ? "2px solid #0d6efd" : "1px solid #ccc",
                          borderRadius: "25px",
                          backgroundColor: selectedLevel === item.kode ? "rgba(13,110,253,0.1)" : "#fff",
                          transition: "all 0.2s",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedLevelKecelakaan(item.kode)}
                      >
                        <div style={{ width: "30px", fontWeight: "bold" }}>{item.kode}</div>
                        <div style={{ flex: 1, textAlign: "left" }}>{item.label}</div>
                        <div style={{ width: "30px", textAlign: "right" }}>{item.value}</div>
                        <input
                          type="radio"
                          name="levelKecelakaan"
                          className="form-check-input ms-3"
                          checked={selectedLevelKecelakaan === item.kode}
                          onChange={() => setSelectedLevelKecelakaan(item.kode)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2 Kolom: Frekuensi Kerja & Level Pencegahan */}
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <div className="card shadow h-100">
                      <div className="card-header text-center">
                        <h5 className="mb-0">Frekuensi Kerja <span className="text-danger">*</span></h5>
                      </div>
                      <div className="card-body">
                        {[
                          { kode: "a", label: "Tinggi", value: 5 },
                          { kode: "b", label: "Sedang", value: 4 },
                          { kode: "c", label: "Rendah", value: 3 },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center justify-content-between px-3 py-2 mb-2"
                            style={{
                              border: selectedLevel === item.kode ? "2px solid #0d6efd" : "1px solid #ccc",
                              borderRadius: "25px",
                              backgroundColor: selectedLevel === item.kode ? "rgba(13,110,253,0.1)" : "#fff",
                              transition: "all 0.2s",
                              cursor: "pointer",
                            }}
                            onClick={() => setSelectedFrekuensiKerja(item.kode)}
                          >
                            <div style={{ width: "30px", fontWeight: "bold" }}>{item.kode}</div>
                            <div style={{ flex: 1, textAlign: "left" }}>{item.label}</div>
                            <div style={{ width: "30px", textAlign: "right" }}>{item.value}</div>
                            <input
                              type="radio"
                              name="frekuensiKerja"
                              className="form-check-input ms-3"
                             checked={selectedFrekuensiKerja === item.kode}
                              onChange={() => setSelectedFrekuensiKerja(item.kode)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <div className="card shadow h-100">
                      <div className="card-header text-center">
                        <h5 className="mb-0">Level Pencegah Bahaya <span className="text-danger">*</span></h5>
                      </div>
                      <div className="card-body">
                        {[
                          { kode: "a", label: "Tinggi", value: 5 },
                          { kode: "b", label: "Sedang", value: 4 },
                          { kode: "c", label: "Rendah", value: 3 },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center justify-content-between px-3 py-2 mb-2"
                            style={{
                              border: selectedLevel === item.kode ? "2px solid #0d6efd" : "1px solid #ccc",
                              borderRadius: "25px",
                              backgroundColor: selectedLevel === item.kode ? "rgba(13,110,253,0.1)" : "#fff",
                              transition: "all 0.2s",
                              cursor: "pointer",
                            }}
                            onClick={() => setSelectedPencegahBahaya(item.kode)}
                          >
                            <div style={{ width: "30px", fontWeight: "bold" }}>{item.kode}</div>
                            <div style={{ flex: 1, textAlign: "left" }}>{item.label}</div>
                            <div style={{ width: "30px", textAlign: "right" }}>{item.value}</div>
                            <input
                              type="radio"
                              name="pencegahBahaya"
                              className="form-check-input ms-3"
                              checked={selectedPencegahBahaya === item.kode}
                              onChange={() => setSelectedPencegahBahaya(item.kode)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panduan dan Total Nilai */}
            <div className="row justify-content-center">
              <div className="col-12 col-md-5 mb-3">
                <div className="card shadow w-100" style={{ maxWidth: '700px' }}>
                  <div className="card-header text-center">
                    <h5 className="mb-0">Panduan Nilai</h5>
                  </div>
                  <div className="card-body p-1" style={{ fontSize: '13px' }}>
                    <table className="table table-borderless mb-0" style={{ marginBottom: 0 }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '4px 8px' }}>SCORE</th>
                          <th style={{ padding: '4px 8px' }}>RANK</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '4px 8px' }}>19 - 25</td>
                          <td style={{ padding: '4px 8px' }}>A</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '4px 8px' }}>10 - 18</td>
                          <td style={{ padding: '4px 8px' }}>B</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '4px 8px' }}>6 - 9</td>
                          <td style={{ padding: '4px 8px' }}>C</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-7 mb-3">
                <div className="card shadow w-100" style={{ maxWidth: '700px' }}>
                  <div className="card-header text-center">
                    <h5 className="mb-0">Total Nilai</h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="d-flex text-center" style={{ borderTop: "1px solid #dee2e6" }}>
                      <div className="flex-fill p-4" style={{ borderRight: "1px solid #dee2e6" }}>
                        <p className="mb-1">SCORE</p>
                        <h2 className="mb-0 fw-bold">16</h2>
                      </div>
                      <div className="flex-fill p-4">
                        <p className="mb-1">RANK</p>
                        <h2 className="mb-0 fw-bold">Bb</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Navigasi */}
            <div className="text-end mt-3" style={{ maxWidth: '700px', margin: '0 auto' }}>
              <button className="btn btn-primary me-2" onClick={handleBack}>Sebelumnya</button>
              <button
                className={`btn ${isFormatComplete3 ? "btn-primary" : "btn-secondary"}`}
                onClick={handleNext}
                disabled={!isFormatComplete5}
              >
                Submit
              </button>
            </div>
          </div>
         </div>
        )}
        {step === 8 && (
          <div className="page-finish">
            {/* Judul dan Step Button */}
            <div style={{ marginTop: '10px', marginBottom: '20px', textAlign: 'center' }}>
              <h2 className="title-bigger-1">HYARIHATTO</h2>
              <h6>“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h6>
            </div>
             <div style={{ marginTop: '10px', marginBottom: '20px', textAlign: 'center' }}>
              <h6>“Terima kasih telah mengisi catatan Hyarihatto”</h6>
            </div>
            <button
             onClick={() => window.location.href = "/home"}>
              Kembali ke halaman utama
            </button>
           
         </div>
        )}

    </div>
  );
};

export default QuestUser;
