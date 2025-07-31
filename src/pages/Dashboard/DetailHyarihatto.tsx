import  { useRef,useState,useEffect} from 'react';
import { useParams} from 'react-router-dom';
import RadioGroupProgress from "../../components/form/input/RadioGroupProgress";
import DatePicker from '../../components/form/date-picker'
import ButtonSubmit from "./ButtonSubmit";
import useHyarihattoDataService from "../../services/HyarihattoDataService";
// import 'bootstrap/dist/css/bootstrap.min.css';

export type Submission = {
  user: {
    name: string;
    username: string;
  };
   HazardAssessment:{
    currentActivity: string;
    potentialHazard: string;
    hazardReason: string;
    expectedCondition: string;
    improvementSuggestion: string;
  }
  HazardReport:{
    pattern: string;
    source: string;
    injured: string;
    cause: string;
    category: string;
    proof: string;
    accidentType: string;
  }
  HazardEvaluation:{
    rank: string;
    totalScore: number;
    hazardControlLevel: string;
    accidentLevel: string;
    workingFrequency: string;
  }
 
  type: string;
  incidentDate: string;
  incidentTime: string;
  shift: string;
};


// export const dummyData: DetailCatatan[] = [
//   {
//     id: 1,
//     tanggal: "2025-07-09",
//     waktu: "11:38",
//     nama: "Dika",
//     noreg: "2234102",
//     shift: "Non-shift",
//     rank: "Bb",
//     score: 16,
//     kegiatan: "Fill in item/part ke rak shopping",
//     potensiBahaya: "Tangan tergores sekat/pembatas pada rak jalur 1 no 5 kolom 7",
//     penyebab: "Sekat atau pembatas pada rak material terbuat dari bahan plat/akrilik",
//     harapan: "Ada sedikit material tambahan seperti karet atau busa untuk melapisi ujung-ujung pembatas/sekat pada rak shopping",
//     usulan: "-",
//     jenis: "Sumber & Akibat, Terluka, Sebab: Regular, Pengalaman: Tangan, Lalai/lengah",
//     kategori: "Human",
//     bukti: "Ini gambar foto",
//     tipeKecelakaan: "Tergores",
//     levelKecelakaan: "b - Perlu Cuti - 6",
//     frekuensiKerja: "Sedang - 4",
//     levelPencegah: "Level Rendah - 6"
//   },
//   {
//     id: 2,
//     tanggal: "2025-07-10",
//     waktu: "08:20",
//     nama: "Bagus",
//     noreg: "2234103",
//     shift: "Pagi",
//     rank: "Cc",
//     score: 12,
//     kegiatan: "Mengangkat box berat ke rak atas",
//     potensiBahaya: "Box terjatuh dan mengenai kepala",
//     penyebab: "Posisi rak terlalu tinggi dan tidak ada bantuan alat",
//     harapan: "Gunakan tangga atau alat bantu angkat",
//     usulan: "Sediakan tangga dorong di area tersebut",
//     jenis: "Tertimpa benda jatuh",
//     kategori: "Environment",
//     bukti: "Foto kondisi rak tinggi",
//     tipeKecelakaan: "Tertimpa",
//     levelKecelakaan: "c - Cidera Ringan - 5",
//     frekuensiKerja: "Tinggi - 5",
//     levelPencegah: "Sedang - 5"
//   }
// ];

export default function DetailHyarihatto() {
  const { id } = useParams<{ id: string }>();
  const { getSubmissionById } = useHyarihattoDataService();
    const [data, setData] = useState<Submission | null>(null);

  // const catatan = dummyData.find(item => item.id === Number(id));
   const optionsProgress = ["Terima", "Tolak"];
  const optionsUser = ["Oleh diri sendiri", "Bersama dalam SGA", "Pihak lain"];
  const [selectedProgress, setSelectedProgress] = useState(""); // utk pilihan "Terima" atau lainnya
  const [selectedPIC, setSelectedPIC] = useState(""); // utk pilihan user PIC
  const [pihakLain, setPihakLain] = useState(""); // utk input pihak lain jika dipilih
  const fileInputRef = useRef<HTMLInputElement | null>(null);
   const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reason, setReason] =useState<string>('');;
  const isDisabled = isSubmitted; 


  //UseEffect Untuk mengambil data submission berdasarkan ID
useEffect(() => {
  if (id) {
    const numericId = parseInt(id);
    if (!isNaN(numericId)) {
      getSubmissionById(numericId)
        .then((data) => {
          if (data) {
             console.log("✅ Data diterima di DetailHyarihatto:", data);
            setData(data); // ✅ sekarang data bertipe Submission
          }
        })
        .catch((err) => {
          console.error("Failed to fetch detail:", err);
        });
    }
  }
}, [id]);


  if (!data) {
    return <p>Loading...</p>;
  }


   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

   const handleSubmitReject = () => {
    // Simpan ke localStorage (sementara)
    localStorage.setItem(
      'tindakLanjut',
      JSON.stringify({
        progress: selectedProgress,
        reason: reason,
      })
    );

    setIsSubmitted(true); // disable textarea
    alert('Tersimpan ke localStorage!');
  };

  
   const handleSubmitAccept = () => {
    // Simpan ke localStorage (sementara)
    localStorage.setItem(
      'tindakLanjut',
      JSON.stringify({
        pic: selectedProgress,
        // suggestionSect: reason,
        // suggestionGroup: reason,
        // imageProgress: reason,
      })
    );

    setIsSubmitted(true); // disable textarea
    alert('Tersimpan ke localStorage!');
  };


  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Gagal mengakses kamera:', error);
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/png');
    setPreviewImage(imageDataUrl);
    closeCameraModal();
    stopCamera(); // stop kamera setelah ambil gambar
  };
   const openCameraModal = () => {
    setIsCameraModalOpen(true);
    startCamera();
  };

  const closeCameraModal = () => {
    setIsCameraModalOpen(false);
    stopCamera();
  };

  return (
    <div className="grid grid-cols-12 gap-2 p-1">
      {/* <!-- Total Rank --> */}
    <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-2 shadow-md
     dark:border-gray-800 dark:bg-white/[0.03] space-y-4 h-[220px]">
      <h3 className=" mt-4 text-xl font-bold text-gray-800 dark:text-white">Identitas Catatan</h3>
      <div className=" text-sm text-gray-700 dark:text-gray-300">
       <div className="grid grid-cols-4 gap-4">
        <div>
          <p className="font-medium">Nama</p>
          <p className="text-md">{data.user?.name}</p>
        </div>

        <div>
          <p className="font-medium">No.Reg</p>
          <p className="text-md">{data.user?.username}</p>
        </div>

        <div>
          <p className="font-medium">Shift</p>
          <p className="text-md">{data.shift}</p>
        </div>

        <div>
          <p className="font-medium">Nilai Rank</p>
          <p className="text-md">{data.HazardEvaluation?.rank}</p>
        </div>

        <div>
          <p className="font-medium">Catatan</p>
          <p className="text-md">{data.type || "-"}</p>
        </div>

        <div>
          <p className="font-medium">Tanggal Kejadian</p>
          <p className="text-md">{data.incidentDate}</p>
        </div>

        <div>
          <p className="font-medium">Waktu Kejadian</p>
          <p className="text-lg">{new Date(data.incidentTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
         <div>
          <p className="font-medium">Status</p>
         <span className="inline-block text-white bg-green-600 text-md px-2 py-1 rounded-full">
          
        </span>
          {/* <p>{catatan?.rank}</p> */}
        </div>
        </div>
      </div>
    </div>

      {/* <!-- Detail--> */}
      <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Detail Catatan</h3>

        <div className="grid-cols-12  text-sm text-gray-700 dark:text-gray-300">
          {/* Baris 1 */}
          <div className='space-y-4'>
           <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Apa yang sedang dilakukan?</p>
              <p>{data.HazardAssessment?.currentActivity || "-"}</p>
          </div>
         
          
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Potensi bahaya apa yang akan timbul?</p>
             <p>{data.HazardAssessment?.potentialHazard || "-"}</p>
          </div>

          {/* Baris 2 */}
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Mengapa kondisinya berbahaya seperti itu?</p>
            <p>{data.HazardAssessment?.hazardReason || "-"}</p>
          </div>
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Seharusnya kondisinya bagaimana?</p>
            <p>
              <span className="font-semibold">a. Harapan yang diinginkan:</span><br />
              {data.HazardAssessment?.expectedCondition || "-"}
              {/* {catatan?.penyebab} */}
            </p>
            <p className="mt-1">
              <span className="font-semibold">b. Usulan Perbaikan:</span><br />
              {data.HazardAssessment?.improvementSuggestion || "-"}
              {/* {catatan?.penyebab} */}
            </p>
          </div>
          <div className='grid grid-cols-5 gap-4'>
            <div>
              <p className="font-medium">Jenis</p>
              <p>{data.HazardReport?.pattern || "-"}</p>
            </div>
              <div>
              <p className="font-medium">Sumber & Akibat</p>
              <p>{data.HazardReport?.source || "-"}</p>
            </div>
              <div>
              <p className="font-medium">Terluka</p>
              <p>{data.HazardReport?.injured || "-"}</p>
            </div>
              <div>
              <p className="font-medium">Sebab</p>
              <p>{data.HazardReport?.cause || "-"}</p>
            </div>
            <div>
              <p className="font-medium">Kategori</p>
              <p>{data.HazardReport?.category || "-"}</p>
            </div>
          </div>
          {/* Baris 3 */}
        <div className='pb-4 border-b border-gray-300'/>

          {/* Baris 4 */}
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Bukti Kejadian</p>
            <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">a. Harapan yang diinginkan:</span><br />
            <img src={data.HazardReport?.proof || "-"} className="w-8 h-8 inline-block mr-2" />
          </div>
            <div>
              <span className="font-semibold">b. Usulan Perbaikan:</span><br />
              <img src="/images/harapan.png"  className="w-8 h-8 inline-block mr-2" />
              {/* {catatan?.penyebab} */}
            </div>
            </div>
          </div>
          <div>
            <p className="font-medium">Tipe Kecelakaan [Stop 6 + alpha]</p>
              <p>{data.HazardReport?.accidentType || "-"}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
             <div>
              <p className="font-medium">Level Kecelakaan</p>
              <p>{data.HazardEvaluation?.accidentLevel || "-"}</p>
              {/* <p>{catatan?.levelKecelakaan}</p> */}
            </div>
            <div>
              <p className="font-medium">Frekuensi Kerja</p>
              <p>{data.HazardEvaluation?.workingFrequency || "-"}</p>
              {/* <p>{catatan?.levelKecelakaan}</p> */}
            </div>

            {/* Baris 6 */}
            <div >
              <p className="font-medium">Level Pencegah Bahaya</p>
              <p>{data.HazardEvaluation?.hazardControlLevel || "-"}</p>
              {/* <p>{catatan?.levelPencegah}</p> */}
            </div>
          </div>
            <div>
              <p className="font-medium">Total Nilai</p>
            <div className='flex items-center gap-12'>
              <div>
                <p>Score:</p>
                <p className='text-5xl font-semibold'>{data.HazardEvaluation?.totalScore || "-"}</p>
              </div>
              <div>
                <p>Rank:</p>
                <p className='text-5xl font-semibold'>{data.HazardEvaluation?.rank || "-"}</p>
              </div> 
            </div>
           </div>
          </div>
        </div>
      </div> 
       {/* <!-- Progress Tindak Lanjut--> */}
        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Progress</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300"></div>
              <p className='mb-2 font-bold'>Tindak Lanjut</p>
                <div className=" rounded-2xl border border-gray-300 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
                 
                <RadioGroupProgress
                  options={optionsProgress}
                  onChange={(value, group, name) => {
                    setSelectedProgress(value);
                  }}
                  group="pic"
                  name="picRadio"
                  value={selectedProgress}
                  error={false}
                  disabled={isSubmitted}
                />
                </div>
                {selectedProgress === "Tolak" && (
                <div>
                <p className="mb-1 font-semibold">Alasan Menolak</p>
                <textarea
                  rows={4}
                  placeholder="Silakan isi alasan menolak"
                   className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  isDisabled
                    ? 'bg-gray-100 text-gray-500 border-gray-300'
                    : 'border-gray-500 focus:ring-primary focus:border-primary'
                }`}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  disabled={isSubmitted}
                />
                <div className="text-center col-span-12">
                <ButtonSubmit
                  label="SUBMIT"
                  onClick={handleSubmitReject}
                  disabled={isSubmitted}
                  //  showError={selectedProgress === "Tolak" && setReason.trim() === ""}
                />
              </div>
              </div>
              
                )}
          </div>
          {/* <!-- Progress Tindak Lanjut--> */}
          {selectedProgress === "Terima" && (
            <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Progress Tindak Lanjut</h3>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {/* Saran dan Usulan */}
                <div className="grid grid-cols-12 gap-2">
                {/* Kolom 1: PIC */}
                  <div className="col-span-6 md:col-span-8">
                    <p className='mb-1 font-bold'>PIC Penanggulangan</p>
                   <div className=" rounded-2xl border border-gray-400 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
                    <RadioGroupProgress
                      options={optionsUser}
                      onChange={(value, group, name) => {
                        setSelectedPIC(value);
                        if (value !== "Pihak lain") {
                        setPihakLain(''); // reset kalau bukan pihak lain
                      }
                      }}
                      group="pic"
                      name="picRadio" 
                      value={selectedPIC}
                      error={false}
                      disabled={isSubmitted}
                    />
                     {selectedPIC === "Pihak lain" && (
                      <div className="mt-3">
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Nama Pihak Lain"
                          value={pihakLain}
                          onChange={(e) => setPihakLain(e.target.value)}
                          disabled={isSubmitted}
                        />
                      </div>
                    )}
                   </div>
                </div>

                {/* Kolom 2: Tanggal */}
                <div className="col-span-6 md:col-span-4 space-y-4">
                  <div>
                    <label className="block font-medium mb-1">Tanggal Plan C/M</label>
                     <DatePicker
                        id='period'
                        mode='single'
                        placeholder='Semua periode'
                        className='bg-white'
                        disabled={isSubmitted}
                      />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Tanggal Plan Selesai</label>
                    <DatePicker
                        id='period'
                        mode='single'
                        placeholder='Semua periode'
                        className='bg-white'
                        disabled={isSubmitted}
                      />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
              <label className="block font-bold mb-1 mt-3">Saran & Usulan</label>
              <div>
                <label className="block mb-1">Section Head</label>
                <textarea
                rows={4}
                disabled={isSubmitted}
                placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                 className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  isDisabled
                    ? 'bg-gray-100 text-gray-500 border-gray-300'
                    : 'border-gray-500 focus:ring-primary focus:border-primary'
                }`}
              />
              </div>
              <div>
                <label className="block mb-1">Group Leader</label>
                <textarea
                  rows={4}
                  disabled={isSubmitted}
                  placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                   className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  isDisabled
                    ? 'bg-gray-100 text-gray-500 border-gray-300'
                    : 'border-gray-500 focus:ring-primary focus:border-primary'
                }`}
                />
              </div>
              </div>
           
              <div className="md:col-span-2">
              <label className="block font-bold mb-1 mt-2">Gambar</label>
               <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-48 cursor-pointer hover:border-primary">
                {previewImage ? (
                  <div className="relative w-full max-w-xs h-40 mx-auto">
                    {/* Gambar Preview */}
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-contain rounded-md border"
                    />

                    {/* Tombol X di pojok kanan atas gambar */}
                    <button
                      onClick={() => setPreviewImage(null)}
                      className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-600 rounded-full p-1 shadow z-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-10 w-10 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-gray-500 mt-2">Tambahkan gambar bukti setelah perbaikan</p>
                    <div className="flex justify-center gap-2 mt-3">
                      <button
                        className="text-primary text-sm underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        Galeri
                      </button>
                      <span className="text-gray-400">|</span>
                      <button
                        className="text-primary text-sm underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCameraModal();
                        }}
                      >
                        Kamera
                      </button>
                    </div>
                  </div>
                )}
              </div>
            {/* Input Galeri */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            {/* Canvas untuk capture dari kamera */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* Tombol Submit */}
            <div className="text-center col-span-12">
            <ButtonSubmit
              label="SUBMIT"
              onClick={handleSubmitAccept}
              disabled={isSubmitted}
            />
            </div>
             {isCameraModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* BACKDROP BLUR & KLIK UNTUK CLOSE */}
                <div
                  className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                  onClick={closeCameraModal}
                ></div>

                {/* MODAL KAMERA */}
                <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-md z-10">
                  {/* Tombol Close Bulat */}
                  <button
                    onClick={closeCameraModal}
                    className="absolute top-1 right-1 w-10 h-10 flex items-center justify-center
                              text-red-500 hover:text-white text-2xl font-bold 
                              border-2 border-red-500 hover:bg-red-500 
                              rounded-full transition duration-300"
                  >
                    &times;
                  </button>

                  {/* Live Video */}
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-auto rounded mb-1 mt-4"
                  />

                  {/* Tombol Ambil Foto */}
                  <div className="text-center">
                    <button
                      onClick={capturePhoto}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Ambil Foto
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
      </div>
    )}
  </div> 

  );
}
