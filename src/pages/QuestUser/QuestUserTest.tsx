import React, { useState,useRef} from 'react';
import { FaCamera, FaImage,FaTimes  } from 'react-icons/fa';
import WaveBackground from '../../components/image/Wave-Background-Hyat.png'
import { useNavigate } from "react-router-dom";
import JapanBackground from '../../components/image/Hijau-Hyarihatto.png'
import DatePicker from 'react-datepicker'
// import JapanBackground from '../../components/image/Biru Hyarihatto.png'

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
// Define the shape of your form data
type FormData = {
  name: string;
  noreg: string;
  shift: string;
  date: Date | null;
  time: string;
  line: string;
  location: string;
  do?: string;
  danger?: string;
  condition?: string;
  hope?: string;
};

type PreviewImage = {
  url: string;
  file?: File;
};

type FormCheckBox = {
  jenis: string[];
  sumber: string[];
  terluka: string[];
  sebab: string[];
  kategori: string[];
  // tambah jika ada field lainnya
};

const QuestUserTest: React.FC = () => {
    const [showCameraModal, setShowCameraModal] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
     const [selectedTingkatCatatan, setSelectedTingkatCatatan] = useState<string>("");
    const [currentStep, setCurrentStep] = useState<number>(2);
    const [step, setStep] = useState<number>(1);
    const [previewImage, setPreviewImage] = useState<PreviewImage[]>([]);
    const galleryInputRef = useRef<HTMLInputElement | null>(null);
    const [inputLainnya, setInputLainnya] = useState<string>("");
    const [selectedLevel, setSelectedLevel] = useState<string>("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        noreg: '',
        shift: "",
        date: null,
        time: '',
        line: '',
        location: '',
    });
    const [formCheckBox, setFormCheckBox] = useState<FormCheckBox>({
        jenis: [],
        sumber: [],
        terluka: [],
        sebab: [],
        kategori: [],
        });

    const [selectedLevelKecelakaan, setSelectedLevelKecelakaan] = useState<string>('');
    const [selectedFrekuensiKerja, setSelectedFrekuensiKerja] = useState<string>('');
    const [selectedPencegahBahaya, setSelectedPencegahBahaya] = useState<string>('');

        const [formDate, setFormDate] = useState({
            date: new Date(),
            // field lain
        })

        const handleDateChange = (date: Date | null) => {
            setFormData(prev => ({
                ...prev,
                date: date
            }));
            };
        const handleNext = () => {
            if (formData.name && formData.noreg && formData.shift) {
            setStep((prevStep) => prevStep + 1);
            } else {
            alert('Please fill in all required fields.');
            }
        };
    const buttonStep = (
        <div className="flex justify-center items-center gap-2 mb-4">
            {[2, 3, 4, 5, 6, 7].map((s, index) => {
            const isActive = step === s;
            const isPassed = step > s;

            return (
                <React.Fragment key={s}>
                <button
                    className={`w-10 h-10 rounded-full font-semibold border transition-all duration-200
                    ${isActive ? 'bg-green-600 text-white' : 
                        isPassed ? 'border-green-600 text-green-600 hover:bg-blue-100' : 
                        'border-gray-300 text-gray-400 cursor-not-allowed'}`}
                    onClick={() => {
                    if (s <= step) setStep(s);
                    }}
                    disabled={s > step}
                >
                    {index + 1}
                </button>

                {index < 5 && (
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
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormCheckBox) => {
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
      const handleBackMainPage = () => {
    navigate("/member"); // atau "/dashboard", "/user", dst
        };

    const handleCloseCamera = () => {
        stream?.getTracks().forEach((track) => track.stop());
        setShowCameraModal(false);
    };

    const handleGalleryInput = () => {
     galleryInputRef.current?.click();
    };
  

    const isFormatComplete1 =
    formData.date && formData.time && formData.line && formData.location;

     const isFormatComplete2 =
    (formData as any).do &&
    (formData as any).danger &&
    (formData as any).condition &&
    (formData as any).hope;

  const isFormatComplete3 =
    formCheckBox.jenis.length > 0 &&
    formCheckBox.sumber.length > 0 &&
    formCheckBox.terluka.length > 0 &&
    formCheckBox.sebab.length > 0 &&
    formCheckBox.kategori.length > 0;

  const isFormatComplete4 =
    selectedTingkatCatatan !== "" &&
    (selectedTingkatCatatan !== "Lainnya" || inputLainnya.trim() !== "");

  const isFormatComplete5 =
    selectedLevelKecelakaan !== '' &&
    selectedFrekuensiKerja !== '' &&
    selectedPencegahBahaya !== '';


  return (
    <div>
      {step === 1 && (
        <div
        className="min-h-screen flex items-center justify-center p-4  bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${WaveBackground})` }}
        >
            <button
            onClick={handleBackMainPage}
            className="absolute top-4 left-4 inline-flex items-center px-5 py-2.5 
            bg-gradient-to-r from-green-400 to-green-600 text-white text-sm 
            font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300
             hover:from-green-600 hover:to-green-800"
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
          <div className="w-full max-w-2xl">
            <div className="mb-2 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">HYARIHATTO</h2>
              <p className="text-lg text-gray-600">“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</p>
            </div>
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
                    type="number"
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
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
             <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
            backgroundImage: `url(${JapanBackground})`,
            opacity: 0.6, // ganti sesuai keinginan
            }}
        />
             <div className="relative z-10 w-full max-w-2xl">
            <div className="text-center mt-4 mb-6">
            <h2 className="text-2xl font-bold text-primary">HYARIHATTO</h2>
            <h5 className="text-gray-600 italic text-sm mt-1">
                “Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”
            </h5>
            </div>

            <div className="mb-4">{buttonStep}</div>

            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="bg-green-600 text-white text-center py-3">
                <h5 className="text-lg font-semibold">Waktu & Lokasi</h5>
            </div>

            <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tanggal:<span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="Pilih tanggal"
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
             <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
            backgroundImage: `url(${JapanBackground})`,
            opacity: 0.6, // ganti sesuai keinginan
            }}
        />
             <div className="relative z-10 w-full max-w-2xl">
            <div className="text-center mt-4 mb-6">
            <h2 className="text-2xl font-bold text-primary">HYARIHATTO</h2>
            <h6 className="text-gray-600 italic text-sm mt-1">
                “Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”
            </h6>
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
                    Potensi bahaya apa yang akan timbul <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="danger"
                    className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.danger}
                    onChange={handleChange}
                    disabled={!formData.do}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mengapa kondisinya berbahaya seperti itu? <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="condition"
                    className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.condition}
                    onChange={handleChange}
                    disabled={!formData.danger}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seharusnya kondisinya bagaimana? <span className="text-red-500">*</span>
                </label>
                <label className="block text-sm text-gray-500 mb-1">
                    Tuliskan Harapan / Usulan perbaikan Anda
                </label>
                <textarea
                    name="hope"
                    className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.hope}
                    onChange={handleChange}
                    disabled={!formData.condition}
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
        {step === 4 && (
               <div className="relative min-h-screen flex flex-col items-center justify-start px-2 py-6">
                <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                backgroundImage: `url(${JapanBackground})`,
                opacity: 0.6, // ganti sesuai keinginan
                }}
                />
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
                    <h5 className="font-semibold text-lg">Tingkat Catatan</h5>
                </div>
                <div className="p-4 space-y-6">

                    {/* Row 1: Jenis & Sumber */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Jenis */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="bg-blue-100 px-3 py-2 text-center rounded-t-lg">
                        <h5 className="font-medium">Jenis <span className="text-red-500">*</span></h5>
                        </div>
                        <div className="p-3 space-y-2">
                        {["reguler", "lowfreak", "irregular", "abnormal"].map((val) => (
                            <label key={val} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="jenis"
                                value={val}
                                checked={formCheckBox.jenis.includes(val)}
                                onChange={(e) => handleCheckboxChange(e, "jenis")}
                                className="accent-blue-600"
                            />
                            <span className="capitalize">{val}</span>
                            </label>
                        ))}
                        </div>
                    </div>

                    {/* Sumber */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="bg-blue-100 px-3 py-2 text-center rounded-t-lg">
                        <h5 className="font-medium">Sumber & Akibat <span className="text-red-500">*</span></h5>
                        </div>
                        <div className="p-3 space-y-2">
                        {["pengalaman", "praduga", "direct", "ergo"].map((val) => (
                            <label key={val} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="sumber"
                                value={val}
                                checked={formCheckBox.sumber.includes(val)}
                                onChange={(e) => handleCheckboxChange(e, "sumber")}
                                className="accent-blue-600"
                            />
                            <span className="capitalize">{val === "ergo" ? "Ergo (PAK)" : val}</span>
                            </label>
                        ))}
                        </div>
                    </div>
                    </div>

                    {/* Row 2: Terluka, Sebab, Kategori */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Terluka */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="bg-blue-100 px-3 py-2 text-center rounded-t-lg">
                        <h5 className="font-medium">Terluka <span className="text-red-500">*</span></h5>
                        </div>
                        <div className="p-3 space-y-2">
                        {["kepala", "tangan", "kaki", "badan"].map((val) => (
                            <label key={val} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="terluka"
                                value={val}
                                checked={formCheckBox.terluka.includes(val)}
                                onChange={(e) => handleCheckboxChange(e, "terluka")}
                                className="accent-blue-600"
                            />
                            <span className="capitalize">{val}</span>
                            </label>
                        ))}
                        </div>
                    </div>

                    {/* Sebab */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="bg-blue-100 px-3 py-2 text-center rounded-t-lg">
                        <h5 className="font-medium">Sebab <span className="text-red-500">*</span></h5>
                        </div>
                        <div className="p-3 space-y-2">
                        {[
                            { val: "lalai", label: "Lalai/Lengah" },
                            { val: "gesa", label: "Tergesa-gesa" },
                            { val: "terampil", label: "Tdk Terampil" },
                            { val: "lelah", label: "Lelah" },
                        ].map(({ val, label }) => (
                            <label key={val} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="sebab"
                                value={val}
                                checked={formCheckBox.sebab.includes(val)}
                                onChange={(e) => handleCheckboxChange(e, "sebab")}
                                className="accent-blue-600"
                            />
                            <span>{label}</span>
                            </label>
                        ))}
                        </div>
                    </div>

                    {/* Kategori */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="bg-blue-100 px-3 py-2 text-center rounded-t-lg">
                        <h5 className="font-medium">Kategori <span className="text-red-500">*</span></h5>
                        </div>
                        <div className="p-3 space-y-2">
                        {["human", "machine", "workplace"].map((val) => (
                            <label key={val} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="kategori"
                                value={val}
                                checked={formCheckBox.kategori.includes(val)}
                                onChange={(e) => handleCheckboxChange(e, "kategori")}
                                className="accent-blue-600"
                            />
                            <span className="capitalize">{val}</span>
                            </label>
                        ))}
                        </div>
                    </div>
                    </div>

                    {/* Button navigasi */}
                    <div className="flex justify-end mt-4 gap-3">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                        onClick={handleBack}
                    >
                        Sebelumnya
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                        isFormatComplete3 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={handleNext}
                        disabled={!isFormatComplete3}
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
            {step === 5 && (
            <div className="flex flex-col items-center px-4">
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

           {step === 7 && (
            <div className="flex flex-col items-center px-4">
                {/* Judul dan Step Button */}
                <div className="mt-4 mb-6 text-center">
                <h2 className="text-2xl font-bold">HYARIHATTO</h2>
                <h6 className="text-sm text-gray-600">“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</h6>
                </div>
                <div className="mb-4">{buttonStep}</div>

                <div className="w-full max-w-3xl space-y-6">
                {/* Card Score dan Rank */}
                <div className="bg-white shadow rounded-lg">
                    <div className="bg-gray-100 px-4 py-2 text-center rounded-t-lg">
                    <h5 className="text-lg font-semibold">Pengisian Hyarihatto Score dan Rank</h5>
                    </div>
                    <div className="p-4 space-y-4">
                    {/* Level Kecelakaan */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="bg-gray-100 px-4 py-2 text-center rounded-t-lg">
                        <h5 className="text-base font-semibold">Level Kecelakaan <span className="text-red-500">*</span></h5>
                        </div>
                        <div className="p-4">
                        {[{ kode: "a", label: "Fatal", value: 12 },{ kode: "b", label: "Perlu Cuti", value: 6 },{ kode: "c", label: "Tidak Perlu Cuti", value: 2 },].map((item, index) => (
                            <div
                            key={index}
                            className={`flex items-center justify-between px-4 py-2 mb-2 rounded-full cursor-pointer transition-all border ${selectedLevelKecelakaan === item.kode ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'}`}
                            onClick={() => setSelectedLevelKecelakaan(item.kode)}
                            >
                            <div className="w-8 font-bold">{item.kode}</div>
                            <div className="flex-1 text-left">{item.label}</div>
                            <div className="w-8 text-right">{item.value}</div>
                            <input
                                type="radio"
                                name="levelKecelakaan"
                                className="form-radio ml-3"
                                checked={selectedLevelKecelakaan === item.kode}
                                onChange={() => setSelectedLevelKecelakaan(item.kode)}
                            />
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* Frekuensi & Pencegah */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Frekuensi Kerja */}
                        <div className="bg-white shadow rounded-lg">
                        <div className="bg-gray-100 px-4 py-2 text-center rounded-t-lg">
                            <h5 className="text-base font-semibold">Frekuensi Kerja <span className="text-red-500">*</span></h5>
                        </div>
                        <div className="p-4">
                            {[{ kode: "a", label: "Tinggi", value: 5 },{ kode: "b", label: "Sedang", value: 4 },{ kode: "c", label: "Rendah", value: 3 },].map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between px-4 py-2 mb-2 rounded-full cursor-pointer transition-all border ${selectedFrekuensiKerja === item.kode ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'}`}
                                onClick={() => setSelectedFrekuensiKerja(item.kode)}
                            >
                                <div className="w-8 font-bold">{item.kode}</div>
                                <div className="flex-1 text-left">{item.label}</div>
                                <div className="w-8 text-right">{item.value}</div>
                                <input
                                type="radio"
                                name="frekuensiKerja"
                                className="form-radio ml-3"
                                checked={selectedFrekuensiKerja === item.kode}
                                onChange={() => setSelectedFrekuensiKerja(item.kode)}
                                />
                            </div>
                            ))}
                        </div>
                        </div>

                        {/* Pencegah Bahaya */}
                        <div className="bg-white shadow rounded-lg">
                        <div className="bg-gray-100 px-4 py-2 text-center rounded-t-lg">
                            <h5 className="text-base font-semibold">Level Pencegah Bahaya <span className="text-red-500">*</span></h5>
                        </div>
                        <div className="p-4">
                            {[{ kode: "a", label: "Tinggi", value: 5 },{ kode: "b", label: "Sedang", value: 4 },{ kode: "c", label: "Rendah", value: 3 },].map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between px-4 py-2 mb-2 rounded-full cursor-pointer transition-all border ${selectedPencegahBahaya === item.kode ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'}`}
                                onClick={() => setSelectedPencegahBahaya(item.kode)}
                            >
                                <div className="w-8 font-bold">{item.kode}</div>
                                <div className="flex-1 text-left">{item.label}</div>
                                <div className="w-8 text-right">{item.value}</div>
                                <input
                                type="radio"
                                name="pencegahBahaya"
                                className="form-radio ml-3"
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

                {/* Panduan dan Total Nilai */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Panduan */}
                    <div className="bg-white shadow rounded-lg">
                    <div className="bg-gray-100 px-4 py-2 text-center rounded-t-lg">
                        <h5 className="text-base font-semibold">Panduan Nilai</h5>
                    </div>
                    <div className="p-3 text-sm">
                        <table className="w-full text-left">
                        <thead>
                            <tr>
                            <th className="px-2 py-1">SCORE</th>
                            <th className="px-2 py-1">RANK</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className="px-2 py-1">19 - 25</td>
                            <td className="px-2 py-1">A</td>
                            </tr>
                            <tr>
                            <td className="px-2 py-1">10 - 18</td>
                            <td className="px-2 py-1">B</td>
                            </tr>
                            <tr>
                            <td className="px-2 py-1">6 - 9</td>
                            <td className="px-2 py-1">C</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>

                    {/* Total Nilai */}
                    <div className="bg-white shadow rounded-lg">
                    <div className="bg-gray-100 px-4 py-2 text-center rounded-t-lg">
                        <h5 className="text-base font-semibold">Total Nilai</h5>
                    </div>
                    <div className="flex divide-x divide-gray-200">
                        <div className="flex-1 p-4 text-center">
                        <p className="text-sm text-gray-600 mb-1">SCORE</p>
                        <h2 className="text-2xl font-bold">16</h2>
                        </div>
                        <div className="flex-1 p-4 text-center">
                        <p className="text-sm text-gray-600 mb-1">RANK</p>
                        <h2 className="text-2xl font-bold">Bb</h2>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Tombol Navigasi */}
                <div className="flex justify-end gap-2 mt-4">
                    <button className="btn btn-primary" onClick={handleBack}>Sebelumnya</button>
                    <button
                    className={`btn ${isFormatComplete3 ? 'btn-primary' : 'btn-secondary'}`}
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
        <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
            {/* Judul dan Step Button */}
            <div className="mb-6">
            <h2 className="text-2xl font-bold">HYARIHATTO</h2>
            <h6 className="text-sm text-gray-600 mt-1">
                “Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”
            </h6>
            </div>
            <div className="mb-6">
            <h6 className="text-base text-gray-700">
                “Terima kasih telah mengisi catatan Hyarihatto”
            </h6>
            </div>
            <button
            onClick={() => (window.location.href = "/home")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
            Kembali ke halaman utama
            </button>
        </div>
        )}

    </div>
  );
};

export default QuestUserTest;