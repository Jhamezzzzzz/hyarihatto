import  { useRef,useState,useEffect} from 'react';
import { useParams} from 'react-router-dom';
import RadioGroupProgress from "../../components/form/input/RadioGroupProgress";
import DatePicker from '../../components/form/date-picker'
import ButtonSubmit from "./ButtonSubmitDetail";
import useHyarihattoDataService from "../../services/HyarihattoDataService";
import StaticOptions from "../../utils/StaticOptions";
import Badge from "../../components/ui/badge/Badge";
import config from '../../utils/Config'
import TextArea from "../../components/form/input/TextArea";
import { useAuth } from '../../../src/context/AuthProvider'; // pastikan path-nya sesuai
import { useFormErrors } from "../../../src/context/FormErrorContext";
import { log } from 'console';
// import 'bootstrap/dist/css/bootstrap.min.css';

export type Submission = {
  user: {
    name: string;
    username: string;
  };

  VoiceMember:{
    currentActivity: string;
    issue: string;
    expectedCondition: string;
    improvementSuggestion: string;
    proof: string;

  }
   Reviews:{
  feedback: 'rejected' | 'counter-measured'| 'solved';
  actionPic: string ;
  thirdParty: string ;
  actionPlan: string ;
  actionDate: string ;
  suggestionGL: string;
  suggestionSH: string;

  proof: string;
  createdAt: string;
  updatedAt: string;
  }[];
  status: number;
  type: string;
  incidentDate: string;
  incidentTime: string;
  shift: string;
  location: string;
};

export default function DetailVoiceMember() {
  const { id } = useParams<{ id: string }>();
  const { getSubmissionById,postRejectLeaderAction,postSolvedLeaderAction,postCounterMeasureAction} = useHyarihattoDataService();
  const [data, setData] = useState<Submission | null>(null);
  const { auth } = useAuth();
  const userRole = auth.roleName; // Misal: 'group' atau 'section'
  const { errors, updateError } = useFormErrors()
 // 'group' atau 'section'


  const { STATUS_SUBMISSION } = StaticOptions()
  // const catatan = dummyData.find(item => item.id === Number(id));
   const optionsProgress = ["Terima", "Tolak"];
  const optionsUser = ["Bisa oleh Diri sendiri", "Bersama2 dalam SGA", "Pihak lain"];
  const [selectedProgress, setSelectedProgress] = useState("");
  const [formattedDatePlanCM, setFormattedDatePlanCM] = useState(localStorage.getItem("formattedDatePlanCM") || "")
  const [formattedDateFinishPlan, setFormattedDateFinishPlan] = useState(localStorage.getItem("formattedDateFinishPlan") || "") // utk pilihan "Terima" atau lainnya
 
 
  // utk pilihan user PIC
  const [pihakLain, setPihakLain] = useState(""); // utk input pihak lain jika dipilih
  const fileInputRef = useRef<HTMLInputElement | null>(null);
   const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileImage,setFileImage] = useState<File | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reason, setReason] =useState<string>('');
   const [selectedPIC, setSelectedPIC] = useState(""); 
  const [planCM,setPlanCM ] =useState<Date | undefined>(undefined);
  const [finishplan, setFinishplan] = useState<Date | null>(null);
   const [suggestionsect, setSuggestionsect] =useState<string>('');
    const [suggestiongroup, setSuggestiongroup] =useState<string>('');
  const isDisabled = isSubmitted; 
const imageSolved = data?.Reviews?.find(r => r.feedback === "solved" );

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
// ⛔ JANGAN TARUH DI BAWAH `if (!data)`!!
useEffect(() => {
  if (!data) return;

  const acceptedReview = data.Reviews?.find((r) => r.feedback === "counter-measured");
  const rejectedReview = data.Reviews?.find((r) => r.feedback === "rejected");
  const imageSolved = data?.Reviews?.find(r => r.feedback === "solved" );

  if (acceptedReview) {
    setSelectedProgress("Terima");
    setSelectedPIC(acceptedReview.actionPic);
    setPlanCM(new Date(acceptedReview.actionPlan));
    setFinishplan(new Date(acceptedReview.actionDate));
    setSuggestiongroup(auth.roleName === 'line head' ? acceptedReview.suggestionGL : '');
    setSuggestionsect(auth.roleName === 'section head' ? acceptedReview.suggestionSH : '');
     if (!previewImage) {
      setPreviewImage(`${config.BACKEND_URL}/${imageSolved?.proof}`);
    }
    setIsSubmitted(true);
  }

  if (rejectedReview) {
    setSelectedProgress("Tolak");
    setReason(rejectedReview.suggestionGL || rejectedReview.suggestionSH || "");
    setIsSubmitted(true);
  }
}, [data]);


  if (!data) {
    return <p>Loading...</p>;
  }

 

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

     const handleChangePlanCM  = (dateplan: Date[]) => {
        const dateStringPlanCM = new Date(dateplan[0]).toLocaleDateString('en-CA')
        const formattedDatePlanCM = new Date(dateplan[0]).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).replace(/ /g, '-');

         setPlanCM(dateplan[0]); 
    };
     const handleChangeFinishPlan  = (date: Date[]) => {
        const dateStringFinishPlan = new Date(date[0]).toLocaleDateString('en-CA')
        const formattedDateFinishPlan = new Date(date[0]).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).replace(/ /g, '-');

         setFinishplan(date[0]); 
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

    localStorage.setItem("hyarihatto.detail.image", imageDataUrl);
    localStorage.setItem("hyarihatto.detail.imageFileName", `proof_${Date.now()}.png`);
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
 
  const base64ToFile = (base64: string, filename: string, mimeType: string): File => {
  const arr = base64.split(",");
  const mime = mimeType || arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};




const handleSubmitReject = async () => {
  // if (selectedProgress === "Tolak" && reason.trim() === "") {
  //   alertWarning("Silakan isi alasan penolakan.");
  //   return;
  // }

  const body = {
    submissionId: Number(id), // pastikan dikonversi ke number jika backend butuh angka
    suggestion: reason.trim(),
  };

  setIsSubmitted(true);

  try {
    await postRejectLeaderAction(body);
    const update = await getSubmissionById(Number(id));
    setData(update);
  } finally {
    setIsSubmitted(false);
  }
};

const handleSubmitAccept = async () => {
  if (!id) return;

  const submissionId = Number(id);

  // Tentukan suggestion berdasarkan role user
 

  // Jika suggestion kosong, bisa tambahkan validasi
  // if (!suggestion) {
  //   alertWarning("Silakan isi saran/usulan terlebih dahulu.");
  //   return;
  // }

const counterMeasureBody = {
  submissionId,
  actionPic: selectedPIC,
  actionPlan: planCM?.toISOString().split('T')[0] || '',
  actionDate: finishplan?.toISOString().split('T')[0] || '',
  suggestionGL: suggestiongroup.trim(),
  suggestionSH: suggestionsect.trim(),
  ...(selectedPIC === 'Pihak lain' && pihakLain.trim() && {
    thirdParty: pihakLain.trim(),
  }),
};
console.log("Counter Measure Body:", counterMeasureBody);
const fieldData={submissionId: submissionId}
 const solvedForm = new FormData();
 
solvedForm.append('data', JSON.stringify(fieldData));
solvedForm.append('image', fileImage as Blob );

// Ambil dari localStorage (pastikan sudah disimpan sebelumnya saat capture)
const base64ImageLocal = localStorage.getItem("hyarihatto.detail.image") || "";
const base64ImageFileNameLocal = localStorage.getItem("hyarihatto..detail.imageFileName") || "proof.png";

if (base64ImageLocal.startsWith("data:image")) {
  const fileImage = base64ToFile(base64ImageLocal, base64ImageFileNameLocal, "image/png");
  solvedForm.append("image", fileImage); // ✅ Ganti 'image' sesuai field backend
  console.log("📷 Image file ready:", fileImage);
} else {
  console.warn("⚠️ No valid base64 image found in localStorage!");
}


  setIsSubmitted(true);

  try {
    // 1. Submit countermeasure
    await postCounterMeasureAction(counterMeasureBody);
    // 2. Submit solve (gambar)
    await postSolvedLeaderAction(solvedForm);

     const updatedData = await getSubmissionById(submissionId);
    setData(updatedData); 
  } catch (error) {
    // error sudah ditangani di masing-masing fungsi
  } finally {
    setIsSubmitted(false);
  }
};

// const acceptedReview = data?.Reviews?.find(r => r.feedback === "counter-measured");



  return (

    <div className="grid grid-cols-12 gap-2 p-1">
      {/* <!-- Total Rank --> */}
    <div className="col-span-12 rounded-2xl border border-gray-200 bg-white px-5 py-2 shadow-md
     dark:border-gray-800 dark:bg-white/[0.03] space-y-4 h-[220px]">
      <h3 className=" mt-4 text-xl font-bold text-gray-800 dark:text-white">Identitas Catatan</h3>
      <div className=" text-sm text-gray-700 dark:text-gray-300">
       <div className="grid grid-cols-4 gap-4">
        <div>
          <p className="font-medium">Nama</p>
          <p className="text-lg">{data.user?.name}</p>
        </div>

        <div>
          <p className="font-medium">No.Reg</p>
          <p className="text-lg">{data.user?.username}</p>
        </div>

        <div>
          <p className="font-medium">Shift</p>
           <Badge color={data.shift === "non-shift" ? "light" : data.shift === "red" ? "error" : data.shift === "white" ? "dark" : "info"}>
            {data.shift.toUpperCase()}
            </Badge>
        </div>
        <div>
          <p className="font-medium">Catatan</p>
          <p className="text-lg">{data.type || "-"}</p>
        </div>

        <div>
          <p className="font-medium">Lokasi</p>
          <p className="text-lg">{data.location}</p>
        </div>

        <div>
          <p className="font-medium">Tanggal Kejadian</p>
          <p className="text-lg">{data.incidentDate}</p>
        </div>

        <div>
          <p className="font-medium">Waktu Kejadian</p>
          <p className="text-lg">{new Date(data.incidentTime).toLocaleTimeString('en-GB', 
            { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta', })}</p>
        </div>
         <div>
          <p className="font-medium">Status</p>
          <Badge
            size="md"
            variant="solid"
            color={
              data.status === 2
                ? "success"
                : data.status === 0
                ? "warning"
                : data.status === 1
                ? "info"
                : data.status === 3
                ? "error"
                : "error"
            }
          >
            {STATUS_SUBMISSION[data.status].toUpperCase() || ""}
          </Badge>
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
           <div className="pb-2 border-b border-gray-300">
            <p className="font-medium">Apa yang sedang dilakukan?</p>
              <p className="text-lg">{data.VoiceMember?.currentActivity || "-"}</p>
          </div>
          {/* Baris 2 */}
          <div className="pb-2 border-b border-gray-300">
            <p className="font-medium">Apa kendala yang dihadapi??</p>
            <p className="text-lg">{data.VoiceMember?.issue || "-"}</p>
          </div>
          <div className="pb-2 border-b border-gray-300">
            <p className="font-medium">Seharusnya kondisinya bagaimana?</p>
             <span className="font-semibold">a. Harapan yang diinginkan:</span><br />
            <p className="text-lg">
              {data.VoiceMember?.expectedCondition || "-"}
              {/* {catatan?.penyebab} */}
            </p>
            <span className="font-semibold">b. Usulan Perbaikan:</span><br />
            <p className="text-lg">
              {data.VoiceMember?.improvementSuggestion || "-"}
              {/* {catatan?.penyebab} */}
            </p>
          </div>
         
  
          {/* Baris 4 */}
          <div className="pb-4">
            <p className="font-medium">Bukti Kejadian</p>
            <div className="grid grid-cols-2 gap-4">
              
          <div>
            <span className="font-semibold">a. Sebelum ditanggulangi</span><br />
            {/* <img src={data.HazardReport?.proof || "-"} className="w-8 h-8  mr-2" /> */}
           
           <img
            src={`${config.BACKEND_URL}/${data.VoiceMember.proof}`} 
            className="w-42 h-42 mr-2"
          />

          </div>
            <div>
              <span className="font-semibold">b. Setelah ditanggulangi</span><br />
             {(previewImage || imageSolved?.proof) ? (
              <img
                src={previewImage?.startsWith("data:image") ? previewImage : `${config.BACKEND_URL}/${imageSolved?.proof}`}
                className="w-42 h-42 inline-block mr-2"
              />
            ) : (
              <span className="text-sm text-gray-500">belum ada penanggulangan</span>
            )}
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
                  isSubmitted ? (
                <div>
                <p className="mb-1 font-semibold">Alasan Menolak</p>
                <TextArea
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
                  showError={selectedProgress === "Tolak" && reason.trim() === ""}
                />
              </div>
              </div>
                ) : (
                 <div>
                <p className="mb-1 font-semibold">Alasan Menolak</p>
                <TextArea
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
                  showError={selectedProgress === "Tolak" && reason.trim() === ""}
                />
              </div>
              </div> 
              )
            )}
          </div>
          {/* <!-- Progress Tindak Lanjut--> */}
          {selectedProgress === "Terima" &&  (  
            isSubmitted?(
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
                      id="plan-cm"
                      mode="single"
                      defaultDate={planCM}
                      onChange={handleChangePlanCM}
                      placeholder='dd-MMM-yyyy'
                      dateFormat="d-M-Y"
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      hint={errors.submissions?.incidentDate}
                      error={errors?.submissions?.incidentDate !== undefined}
                      disabled={isSubmitted}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Tanggal Plan Selesai</label>
                  <DatePicker
                    id="finish-plan"
                    mode="single"
                    defaultDate={finishplan ?? undefined}
                    onChange={handleChangeFinishPlan}
                    placeholder='dd-MMM-yyyy'
                    dateFormat="d-M-Y"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                    hint={errors.submissions?.incidentDate}
                    error={errors?.submissions?.incidentDate !== undefined}
                    disabled={isSubmitted}
                  />

                  </div>
                </div>
              </div>
              {finishplan && (
                <>
              <div className="md:col-span-2">
              <label className="block font-bold mb-1 mt-3">Saran & Usulan</label>
             <div>
              <label className="block mb-1">Section Head</label>
              <TextArea
                rows={4}
                value={suggestionsect}
                onChange={(e) => setSuggestionsect(e.target.value)}
                disabled={isSubmitted || auth.roleName !== 'section head'}
                placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  isSubmitted || auth.roleName !== 'section'
                    ? 'bg-gray-100 text-gray-500 border-gray-300'
                    : 'border-gray-500 focus:ring-primary focus:border-primary'
                }`}
              />
            </div>

            <div>
              <label className="block mb-1">Group Leader</label>
              <TextArea
                rows={4}
                value={suggestiongroup}
                onChange={(e) => setSuggestiongroup(e.target.value)}
                disabled={isSubmitted || auth.roleName !== 'line head'}
                placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  isSubmitted || auth.roleName !== 'group'
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
        </>
        )}
      </div>
      </div>
      ) :(


        //Buat Input
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
                      id="plan-cm"
                      mode="single"
                      defaultDate={planCM}
                      onChange={handleChangePlanCM}
                      placeholder='dd-MMM-yyyy'
                      dateFormat="d-M-Y"
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      hint={errors.submissions?.incidentDate}
                      error={errors?.submissions?.incidentDate !== undefined}
                      disabled={isSubmitted}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Tanggal Plan Selesai</label>
                  <DatePicker
                    id="finish-plan"
                    mode="single"
                    defaultDate={finishplan ?? undefined}
                    onChange={handleChangeFinishPlan}
                    placeholder='dd-MMM-yyyy'
                    dateFormat="d-M-Y"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                    hint={errors.submissions?.incidentDate}
                    error={errors?.submissions?.incidentDate !== undefined}
                    disabled={isSubmitted}
                  />
                  </div>
                </div>
              </div>
             {finishplan && (

              <>
              <div className="md:col-span-2">
              <label className="block font-bold mb-1 mt-3">Saran & Usulan</label>
             <div>
              <label className="block mb-1">Section Head</label>
              <TextArea
                rows={4}
                value={suggestionsect}
                onChange={(e) => setSuggestionsect(e.target.value)}
                disabled={isSubmitted || auth.roleName !== 'section head'}
                placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  isSubmitted || auth.roleName !== 'section'
                    ? 'bg-gray-100 text-gray-500 border-gray-300'
                    : 'border-gray-500 focus:ring-primary focus:border-primary'
                }`}
              />
            </div>

            <div>
              <label className="block mb-1">Group Leader</label>
              <TextArea
                rows={4}
                value={suggestiongroup}
                onChange={(e) => setSuggestiongroup(e.target.value)}
                disabled={isSubmitted || auth.roleName !== 'line head'}
                placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  isSubmitted || auth.roleName !== 'group'
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
       </>
      )}
        <div className="text-center col-span-12">
                {isSubmitted ? (
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <svg className="animate-spin h-5 w-5 text-green-600" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    <span className="text-gray-600 font-semibold">Menyimpan...</span>
                  </div>
                ) : (
                  <ButtonSubmit label="SUBMIT" onClick={handleSubmitAccept} disabled={isSubmitted} />
                )}
              </div>
      </div>
      </div>

    )
    )}
  </div> 

  );
}
