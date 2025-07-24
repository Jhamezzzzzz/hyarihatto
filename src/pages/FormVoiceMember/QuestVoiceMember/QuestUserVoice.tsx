import React, { useState,useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { FaCamera, FaImage,FaTimes  } from 'react-icons/fa';
import WaveBackground from '../../components/image/Wave-Background.png'
import JapanBackground from '../../components/image/Biru Hyarihatto.png'

// Define the shape of your form data
type FormData = {
  name: string;
  noreg: string;
  shift: string;
  date: string;
  time: string;
  line: string;
  location: string;
  do?: string;
  danger?: string;
  condition?: string;
  hope?: string;
  proposed?: string
};

type PreviewImage = {
  url: string;
  file?: File;
};



const QuestUserTest: React.FC = () => {
    const [showCameraModal, setShowCameraModal] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(2);
    const [step, setStep] = useState<number>(1);
    const [previewImage, setPreviewImage] = useState<PreviewImage[]>([]);
    const galleryInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        noreg: "",
        shift: "",
        date: '',
        time: '',
        line: '',
        location: '',
    });
console.log("currentStep", currentStep)

    const handleNext = () => {
        if (formData.name && formData.noreg && formData.shift) {
        setStep((prevStep) => prevStep + 1);
        } else {
        alert('Please fill in all required fields.');
        }
    };
    const buttonStep = (
        <div className="flex justify-center items-center gap-2 mb-4">
            {[2, 3, 4].map((s, index) => {
            const isActive = step === s;
            const isPassed = step > s;

            return (
                <React.Fragment key={s}>
                <button
                    className={`w-10 h-10 rounded-full font-semibold border transition-all duration-200
                    ${isActive ? 'bg-blue-600 text-white' : 
                        isPassed ? 'border-blue-600 text-blue-600 hover:bg-blue-100' : 
                        'border-gray-300 text-gray-400 cursor-not-allowed'}`}
                    onClick={() => {
                    if (s <= step) setStep(s);
                    }}
                    disabled={s > step}
                >
                    {index + 1}
                </button>

                {index < 2 && (
                    <span className="text-gray-400 select-none">─</span>
                )}
                </React.Fragment>
            );
            })}
        </div>
        );
        const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const handleBack = () => {
            setStep((prev) => prev - 1);
            setCurrentStep((prev) => prev - 1);
        };
        const handleRemoveImage = (index: number) => {
        setPreviewImage((prev) => prev.filter((_, i) => i !== index));
        };


       const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         if (!e.target.files) return;
     
         const files = Array.from(e.target.files);
         const urls = files.map((file) => ({
           url: URL.createObjectURL(file),
           file
         }));
         setPreviewImage((prev) => [...prev, ...urls]);
       }; 

        const handleCameraOpen = async () => {
            try {
            setShowCameraModal(true);
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            });
            setStream(mediaStream);
            } catch (err) {
            console.error("Gagal membuka kamera:", err);
            alert("Tidak bisa mengakses kamera. Pastikan akses kamera diizinkan dan gunakan HTTPS atau localhost.");
            }
        };

      const handleCaptureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/png');
        setPreviewImage((prev) => [...prev, { url: imageData }]);
        handleCloseCamera();
        }
    };

    const handleCloseCamera = () => {
        stream?.getTracks().forEach((track) => track.stop());
        setShowCameraModal(false);
    };

    const handleGalleryInput = () => {
     galleryInputRef.current?.click();
    };

  
  const handleBackMainPage = () => {
    navigate("/member"); // atau "/dashboard", "/user", dst
  };
  

    const isFormatComplete1 =
    formData.date && formData.time && formData.line && formData.location;

     const isFormatComplete2 =
    (formData as any).do &&
    (formData as any).condition &&
    (formData as any).hope &&
    (formData as any).proposed;
    



  return (
    <div>
      {step === 1 && (   
        <div
        className="min-h-screen flex items-center justify-center p-3  bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${WaveBackground})` }}
        >
           
           <button
            onClick={handleBackMainPage}
            className="absolute top-4 left-4 inline-flex items-center px-5 py-2.5 
            bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm 
            font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300
             hover:from-blue-600 hover:to-blue-800"
            >
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


          <div className="w-full max-w-lg">
              <h2 
              style={{fontFamily:'revert',fontSize:'2.4rem'}}
              className="text-3xl font-extrabold text-blue-900 mb-4 text-center">
                VOICE MEMBER</h2>
             <nav className="text-sm text-gray-600 mb-4 text-center" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex items-center space-x-1">
                    <li>
                    <a href="/home" className="text-blue-600 hover:underline font-medium">Home</a>
                    </li>
                    <li>
                    <span className="mx-2">{'>'}</span>
                    <a href="/warehouse-member" className="text-blue-600 hover:underline font-medium">Warehouse Member</a>
                    </li>
                    <li>
                    <span className="mx-2">{'>'}</span>
                    <span className="text-gray-800 font-semibold">Voice Member</span>
                    </li>
                </ol>
            </nav>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="border-b border-gray-200 pb-4 mb-6 text-center">
                <h5 className="text-xl font-semibold text-gray-800">Identitas Member</h5>
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama:<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="text"
                    name="name"
                    placeholder="Nama"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="noreg" className="block text-sm font-medium text-gray-700 mb-1">
                    No.Reg:<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="noreg"
                    type="text"
                    name="noreg"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nomor Registrasi"
                    value={formData.noreg}
                    onChange={handleChange}
                    disabled={!formData.name}
                  />
                </div>

                <div>
                  <label htmlFor="shift" className="block text-sm font-medium text-gray-700 mb-1">
                    Shift:<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="shift"
                    type="text"
                    name="shift"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Shift"
                    value={formData.shift}
                    onChange={handleChange}
                    disabled={!formData.noreg}
                  />
                </div>
              </div>

              <div className="mt-8 text-right">
                <button
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleNext}
                  disabled={!formData.name || !formData.noreg || !formData.shift}
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
       <div className="relative min-h-screen flex flex-col items-center justify-start px-2 py-6">
  {/* Background image dengan opacity */}
        <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
            backgroundImage: `url(${JapanBackground})`,
            opacity: 0.6, // ganti sesuai keinginan
            }}
        />
  {/* Konten tetap di atas dan tidak terkena efek opacity */}
            <div className="relative z-10 w-full max-w-2xl">
            <div className="text-center mt-4 mb-6">
            <h2 className="text-2xl font-bold text-primary">VOICE MEMBER</h2>
            </div>

            <div className="mb-4">{buttonStep}</div>

            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="bg-blue-500 text-white text-center py-3">
                <h5 className="text-lg font-semibold">Waktu & Lokasi</h5>
            </div>

            <div className="p-6 space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal:<span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    name="date"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.date}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waktu:<span className="text-red-500">*</span>
                </label>
                <input
                    type="time"
                    name="time"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.time}
                    onChange={handleChange}
                    disabled={!formData.date}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Line/Process:<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="line"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Contoh: Assembly 1"
                    value={formData.line}
                    onChange={handleChange}
                    disabled={!formData.time}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi:<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="location"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Contoh: Area 3"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!formData.line}
                />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                <button
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                    onClick={handleBack}
                >
                    Sebelumnya
                </button>
                <button
                    className={`px-4 py-2 rounded transition ${
                    isFormatComplete1
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={handleNext}
                    disabled={!isFormatComplete1}
                >
                    Selanjutnya
                </button>
                </div>
            </div>
            </div>
          </div>
        </div>
        )}

       {step === 3 && (
            <div className="relative min-h-screen flex flex-col items-center justify-start px-2 py-6">
  {/* Background image dengan opacity */}
        <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
            backgroundImage: `url(${JapanBackground})`,
            opacity: 0.6, // ganti sesuai keinginan
            }}
        />
  {/* Konten tetap di atas dan tidak terkena efek opacity */}
            <div className="relative z-10 w-full max-w-2xl">
            <div className="text-center mt-4 mb-6">
            <h2 className="text-2xl font-bold text-primary">VOICE MEMBER</h2>

            </div>

            <div className="mb-4">{buttonStep}</div>

            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="bg-blue-500 text-white text-center py-3">
                <h5 className="text-lg font-semibold">Catatan</h5>
            </div>

            <div className="p-6 space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apa yang sedang dilakukan? <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="do"
                    className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.do}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mengapa kondisinya seperti itu? <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="condition"
                    className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.condition}
                    onChange={handleChange}
                    disabled={!formData.do}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seharusnya kondisinya bagaimana? <span className="text-red-500">*</span>
                </label>
                <label className="block text-sm text-gray-500 mb-1">
                   a. Harapan yang diinginkan
                </label>
                <textarea
                    name="hope"
                    className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.hope}
                    onChange={handleChange}
                    disabled={!formData.condition}
                />
                </div>
                   <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    b. Usulan Perbaikan <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="proposed"
                    className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.proposed}
                    onChange={handleChange}
                    disabled={!formData.hope}
                />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                <button
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                    onClick={handleBack}
                >
                    Sebelumnya
                </button>
                <button
                    className={`px-4 py-2 rounded transition ${
                    isFormatComplete2
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={handleNext}
                    disabled={!isFormatComplete2}
                >
                    Selanjutnya
                </button>
                </div>
            </div>
            </div>
          </div>
        </div>
        )}
              {/* Langkah 5: Bukti Kejadian (Upload Gambar) */}
            {step === 4 && (
           <div className="relative min-h-screen flex flex-col items-center justify-start px-2 py-6">
  {/* Background image dengan opacity */}
        <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
            backgroundImage: `url(${JapanBackground})`,
            opacity: 0.6, // ganti sesuai keinginan
            }}
        />
  {/* Konten tetap di atas dan tidak terkena efek opacity */}
            <div className="relative z-10 w-full max-w-2xl">
                <div className="my-5 text-center">
                <h2 className="text-2xl font-bold">HYARIHATTO</h2>
                <h6 className="text-sm text-gray-600">
                    “Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”
                </h6>
                </div>

                <div className="mb-4">{buttonStep}</div>

                <div className="w-full max-w-3xl bg-white shadow rounded-lg">
                <div className="bg-gray-100 px-4 py-2 text-center rounded-t-lg">
                    <h5 className="text-lg font-semibold">Bukti Kejadian</h5>
                </div>

                <div className="p-4">

                    {/* Preview Area */}
                    {previewImage.length === 0 ? (
                    <div className="w-full max-w-xl h-72 bg-black rounded-lg flex items-center justify-center mx-auto mb-5">
                        <p className="text-white text-center">Silakan upload gambar kejadian</p>
                    </div>
                    ) : (
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {previewImage.map((img, index) => (
                        <div
                            key={index}
                            className="relative w-36 h-36 rounded-lg border border-gray-300 overflow-hidden"
                        >
                            <img
                            src={img.url}
                            alt={`img-${index}`}
                            className="w-full h-full object-cover"
                            />
                            <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                            <FaTimes size={12} />
                            </button>
                        </div>
                        ))}
                    </div>
                    )}

                    {/* Tombol Upload */}
                    <div className="flex justify-center gap-3 mb-6">
                    <button
                        onClick={handleGalleryInput}
                        className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition"
                    >
                        <FaImage />
                        Ambil Galeri
                    </button>
                    <button
                        onClick={handleCameraOpen}
                        className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
                    >
                        <FaCamera />
                        Ambil Kamera
                    </button>
                    </div>

                    <input
                    type="file"
                    accept="image/*"
                    ref={galleryInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    />

                    {/* Modal Kamera */}
                    {showCameraModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg overflow-hidden">
                        <div className="flex justify-between items-center px-4 py-3 border-b">
                            <h5 className="text-lg font-medium">Ambil Foto</h5>
                            <button
                            onClick={handleCloseCamera}
                            className="text-gray-500 hover:text-red-500"
                            >
                            ✕
                            </button>
                        </div>
                        <div className="p-4 text-center">
                            <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full max-h-96 bg-black rounded-md"
                            />
                            <canvas ref={canvasRef} className="hidden" />
                        </div>
                        <div className="flex justify-between px-4 py-3 border-t">
                            <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                            onClick={handleCloseCamera}
                            >
                            Batal
                            </button>
                            <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            onClick={handleCaptureImage}
                            >
                            Simpan Gambar
                            </button>
                        </div>
                        </div>
                    </div>
                    )}

                    {/* Tombol Navigasi */}
                    <div className="flex justify-end mt-6 gap-3">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                        onClick={handleBack}
                    >
                        Sebelumnya
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                        previewImage.length > 0
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={handleNext}
                        disabled={previewImage.length === 0}
                    >
                        Selanjutnya
                    </button>
                    </div>
                </div>
            </div>
            </div>
         </div>
        )}

          
        {step === 5 && (
       <div className="relative min-h-screen flex flex-col items-center justify-center px-2 py-6">
  {/* Background image dengan opacity */}
        <div
            className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
            style={{
            backgroundImage: `url(${JapanBackground})`,
            opacity: 0.6, // ganti sesuai keinginan
            }}
        />
  {/* Konten tetap di atas dan tidak terkena efek opacity */}
            <div className="relative z-10 w-full max-w-2xl text-center">
            {/* Judul dan Step Button */}

            <h2 className="text-2xl font-bold">HYARIHATTO</h2>
            <h6 className="text-sm text-gray-600 mt-1">
                “Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”
            </h6>
           
            <div className="mb-6">
            <h6 className="text-base text-gray-1000">
                “Terima kasih telah mengisi catatan Hyarihatto”
            </h6>
            </div>
            <button
            onClick={() => (window.location.href = "/homepage")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
            Kembali ke halaman utama
            </button>
        </div>
        </div>
        )}

    </div>
  );
};

export default QuestUserTest;