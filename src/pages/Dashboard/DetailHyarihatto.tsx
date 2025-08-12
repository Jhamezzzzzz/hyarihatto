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
  Reviews:{
  feedback: 'rejected' | 'counter-measured'| 'solved'|'section suggestion';
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

export default function DetailHyarihatto() {
  const { id } = useParams<{ id: string }>();
  const { getSubmissionById,
          postRejectLeaderAction,
          postSolvedLeaderAction,
          postCounterMeasureAction,
          postSectionSuggesstion} = useHyarihattoDataService();
  const [data, setData] = useState<Submission | null>(null);
  const { auth } = useAuth();// Misal: 'group' atau 'section'
  const { errors } = useFormErrors()
 // 'group' atau 'section'
  const { STATUS_SUBMISSION } = StaticOptions()
  // const catatan = dummyData.find(item => item.id === Number(id));
   const optionsProgress = ["Terima", "Tolak"];
  const optionsUser = ["Bisa oleh Diri sendiri", "Bersama2 dalam SGA", "Pihak lain"];
  const [selectedProgress, setSelectedProgress] = useState("");

  // utk pilihan user PIC
  const [pihakLain, setPihakLain] = useState(""); // utk input pihak lain jika dipilih
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileImage,setFileImage] = useState<File | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSubmittedGL, setIsSubmittedGL] = useState(false);
  const [isSubmittedSH, setIsSubmittedSH] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false); // ini khusus animasi "Menyimpan..."
  const [reason, setReason] =useState<string>('');
  const [selectedPIC, setSelectedPIC] = useState(""); 
  const [planCM, setPlanCM] = useState<Date | undefined>(undefined);
  const [finishplan, setFinishplan] = useState<Date | undefined>(undefined);
  const [suggestionsect, setSuggestionsect] =useState<string>('');
  const [suggestiongroup, setSuggestiongroup] =useState<string>('');
  const isDisabled = isSubmittedGL || isSubmittedSH;
  const imageSolved = data?.Reviews?.find(r => r.feedback === "solved" );
  const [isSubmittedData, setIsSubmittedData] = useState(false);
  const [isCounterFromGL, setIsCounterFromGL] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);

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


useEffect(() => {
  if (!data) return;

  // Cari review berdasarkan feedback
  const reviewCounter = data.Reviews.find(r => r.feedback === "counter-measured");
  const reviewSectionSuggestion = data.Reviews.find(r => r.feedback === "section suggestion");
  const rejectedReview = data.Reviews.find(r => r.feedback === "rejected");
  const imageSolved = data.Reviews.find(r => r.feedback === "solved");

  setIsCounterFromGL(Boolean(reviewCounter));

  // Set status submitted kalau ada salah satu review
  setIsSubmittedData(Boolean(reviewCounter || reviewSectionSuggestion || rejectedReview || imageSolved));

  if (reviewCounter) {
    setSelectedProgress("Terima");
    setSelectedPIC(reviewCounter.actionPic || "");
    setPihakLain(reviewCounter.thirdParty || "");
    setPlanCM(new Date(reviewCounter.actionPlan));
    setFinishplan(new Date(reviewCounter.actionDate));
    setSuggestiongroup(reviewCounter.suggestionGL || "");
    setSuggestionsect(
      reviewSectionSuggestion?.suggestionSH || reviewCounter.suggestionSH || ""
    );
    setIsSubmittedGL(true);
    setIsSubmittedSH(Boolean(reviewSectionSuggestion?.suggestionSH || reviewCounter.suggestionSH));
  } else {
    // Reset state kalau tidak ada review counter-measured
    setSelectedProgress("");
    setSelectedPIC("");
    setPihakLain("");
    setPlanCM(undefined);
    setFinishplan(undefined);
    setSuggestiongroup("");
    setSuggestionsect("");
    setIsSubmittedGL(false);
    setIsSubmittedSH(false);
  }

  // Preview gambar proof solved
  if (imageSolved?.proof && !previewImage) {
    setPreviewImage(`${config.BACKEND_URL}/${imageSolved.proof}`);
  }

  // Kalau ada review rejected
  if (rejectedReview) {
    setSelectedProgress("Tolak");
    setReason(rejectedReview.suggestionGL || rejectedReview.suggestionSH || "");
    setIsSubmittedGL(true);
    setIsSubmittedSH(true);
  }

  // ====== Logic Disable Tombol ======
  let submitDisabled = false;
  let updateDisabled = true;

  // Kalau sudah submit GL (counter-measured) → disable submit, enable update
  if (reviewCounter) {
    submitDisabled = true;
    updateDisabled = false;
  }

  // Kalau sudah solved atau sudah ada suggestion SH → disable update juga
  if (imageSolved || reviewSectionSuggestion) {
    updateDisabled = true;
  }

  setIsSubmitDisabled(submitDisabled);
  setIsUpdateDisabled(updateDisabled);
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
        const formattedDatePlanCM = new Date(dateplan[0]).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).replace(/ /g, '-');
        console.log("Formatted Date Plan CM:", formattedDatePlanCM);
         setPlanCM(dateplan[0]); 
    };
     const handleChangeFinishPlan  = (date: Date[]) => {
        const formattedDateFinishPlan = new Date(date[0]).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).replace(/ /g, '-');
          console.log("Formatted Date Plan CM:", formattedDateFinishPlan);
         setFinishplan(date[0]); 
    };


  const startCamera = async () => {
    console.log(isCameraActive, "isCameraActive");
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
 
//   const base64ToFile = (base64: string, filename: string, mimeType: string): File => {
//   const arr = base64.split(",");
//   const mime = mimeType || arr[0].match(/:(.*?);/)?.[1] || "image/png";
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mime });
// };




const handleSubmitReject = async () => {
  // if (selectedProgress === "Tolak" && reason.trim() === "") {
  //   alertWarning("Silakan isi alasan penolakan.");
  //   return;
  // }

  const body = {
    submissionId: Number(id),
    suggestionGL: auth.roleName === "line head" ? reason.trim() : "",
    suggestionSH: auth.roleName === "section head" ? reason.trim() : "",
  };

  setIsSubmittedGL(true);
   if (auth.roleName === 'section head') {
      setIsSubmittedSH(true);
    }

  try {
    await postRejectLeaderAction(body);
    const update = await getSubmissionById(Number(id));
    setData(update);
  } finally {
     setIsSubmittedGL(true);
     if (auth.roleName === 'section head') {
      setIsSubmittedSH(true);
    }
  }
};



const handleSubmitCounterMeasure = async () => {
  if (!id) return;
  setIsLoadingSubmit(true);

  const submissionId = Number(id);

  try {
    const body: any = {
      submissionId,
      actionPic: selectedPIC,
      actionPlan: planCM ? new Date(planCM).toISOString().split("T")[0] : "",
      actionDate: finishplan ? new Date(finishplan).toISOString().split("T")[0] : "",
    };

    if (auth.roleName === "line head") {
      body.suggestionGL = suggestiongroup.trim();
    } else if (auth.roleName === "section head") {
      body.suggestionSH = suggestionsect.trim();
      body.suggestionGL = ""; // Optional kosongin supaya gak null
    }

    if (selectedPIC === "Pihak lain" && pihakLain.trim()) {
      body.thirdParty = pihakLain.trim();
    }

    await postCounterMeasureAction(body);

    if (auth.roleName === "line head") setIsSubmittedGL(true);
    if (auth.roleName === "section head") setIsSubmittedSH(true);

  } catch (error) {
    console.error(error);
  } finally {
    setIsLoadingSubmit(false);
  }
};

const handleSubmitSolved = async () => {
  if (!id || !fileImage) return;
  setIsLoadingSubmit(true);

  const submissionId = Number(id);

  try {
    const solvedForm = new FormData();
    solvedForm.append("data", JSON.stringify({ submissionId }));
    solvedForm.append("image", fileImage as Blob);
    await postSolvedLeaderAction(solvedForm);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoadingSubmit(false);
  }
};


const handleSubmitSuggestion = async () => {
  if (!id) return;
  setIsLoadingSubmit(true);

  const submissionId = Number(id);

  try {
    await postSectionSuggesstion({
      submissionId,
      suggestionSH: suggestionsect.trim(),
    });
    setIsSubmittedSH(true);

    // Fetch ulang data terbaru biar suggestionSH gak null di state
    const updatedData = await getSubmissionById(submissionId);
    setData(updatedData);

  } catch (error) {
    console.error(error);
  } finally {
    setIsLoadingSubmit(false);
  }
};

const handleSubmitCounter = async () => {
  if (!id) return;
  setIsLoadingSubmit(true);
  setIsSubmitSuccess(false);

  try {
    await handleSubmitCounterMeasure();
    if (fileImage) {
      await handleSubmitSolved();
    }
    setIsSubmitSuccess(true);

    const updatedData = await getSubmissionById(Number(id));
    setData(updatedData);

    setIsSubmitDisabled(true);   // matikan submit
    setIsUpdateDisabled(false);  // hidupkan update
  } catch (err) {
    console.error(err);
  } finally {
    setIsLoadingSubmit(false);
  }
};

const handleUpdateData = async () => {
  if (!id) return;
  setIsLoadingUpdate(true);
  setIsUpdateSuccess(false);

  try {
    if (auth.roleName === "section head") {
      if (fileImage) {
        await handleSubmitSolved();
      }
      await handleSubmitSuggestion();
    } else if (auth.roleName === "line head") {
      if (fileImage) {
        await handleSubmitSolved();
      }
    }

    setIsUpdateSuccess(true);

    const updatedData = await getSubmissionById(Number(id));
    setData(updatedData);

    setIsUpdateDisabled(true); // matikan update setelah klik
  } catch (err) {
    console.error(err);
  } finally {
    setIsLoadingUpdate(false);
  }
};

console.log (isUpdateSuccess,isCounterFromGL,isSubmitSuccess)
// disable kalau loading, submit sukses, atau kondisi lain
// const isSubmitDisabled =
//   isLoadingSubmit ||
//   isSubmitSuccess ||
//   auth.roleName === "section head"; // section head tidak boleh submit counter

// const isUpdateDisabled = isLoadingUpdate || isUpdateSuccess;

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
  <p className="font-medium text-sm md:text-md">Nama</p>
  <p className="text-sm md:text-md">{data.user?.name}</p>
</div>
      <div>
        <p className="font-medium text-sm sm:text-base">No.Reg</p>
        <p className="text-md">{data.user?.username}</p>
      </div>
      <div>
        <p className="text-md sm:text-base">Shift</p>
        <Badge
          color={
            data.shift === "non-shift"
              ? "light"
              : data.shift === "red"
              ? "error"
              : data.shift === "white"
              ? "dark"
              : "info"
          }
        >
          {data.shift.toUpperCase()}
        </Badge>
      </div>
      <div>
        <p className="font-medium text-sm sm:text-base">Catatan</p>
        <p className="text-md">{data.type || "-"}</p>
      </div>
      <div>
        <p className="font-medium text-sm sm:text-base">Lokasi</p>
        <p className="text-md">{data.location}</p>
      </div>
      <div>
        <p className="font-medium text-sm sm:text-base">Tanggal Kejadian</p>
        <p className="text-md">{data.incidentDate}</p>
      </div>
      <div>
        <p className="font-medium text-sm sm:text-base">Waktu Kejadian</p>
        <p className="text-md">
          {new Date(data.incidentTime).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Jakarta",
          })}
        </p>
      </div>
         <div>
          <p className="font-medium">Status</p>
          <Badge
            size="sm"
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
              <p className="text-lg">{data.HazardAssessment?.currentActivity || "-"}</p>
            </div>
            <div className="pb-2 border-b border-gray-300">
              <p className="font-medium">Potensi bahaya apa yang akan timbul?</p>
              <p className="text-lg">{data.HazardAssessment?.potentialHazard || "-"}</p>
            </div>
          {/* Baris 2 */}
          <div className="pb-2 border-b border-gray-300">
            <p className="font-medium">Mengapa kondisinya berbahaya seperti itu?</p>
            <p className="text-lg">{data.HazardAssessment?.hazardReason || "-"}</p>
          </div>
          <div className="pb-2 border-b border-gray-300">
            <p className="font-medium">Seharusnya kondisinya bagaimana?</p>
             <span className="font-semibold">a. Harapan yang diinginkan:</span><br />
            <p className="text-lg">
              {data.HazardAssessment?.expectedCondition || "-"}
              {/* {catatan?.penyebab} */}
            </p>
            <span className="font-semibold">b. Usulan Perbaikan:</span><br />
            <p className="text-lg">
              {data.HazardAssessment?.improvementSuggestion || "-"}
              {/* {catatan?.penyebab} */}
            </p>
          </div>
          <div className='grid grid-cols-5 gap-4'>
            <div>
              <p className="font-medium">Jenis</p>
              <p className="text-lg">{data.HazardReport?.pattern || "-"}</p>
            </div>
              <div>
              <p className="font-medium">Sumber & Akibat</p>
              <p className="text-lg">{data.HazardReport?.source || "-"}</p>
            </div>
              <div>
              <p className="font-medium">Terluka</p>
              <p className="text-lg">{data.HazardReport?.injured || "-"}</p>
            </div>
              <div>
              <p className="font-medium">Sebab</p>
              <p className="text-lg">{data.HazardReport?.cause || "-"}</p>
            </div>
            <div>
              <p className="font-medium">Kategori</p>
              <p className="text-lg">{data.HazardReport?.category || "-"}</p>
            </div>
          </div>
          {/* Baris 3 */}
        <div className='pb-4 border-b border-gray-300'/>

          {/* Baris 4 */}
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Bukti Kejadian</p>
            <div className="grid grid-cols-2 gap-4">
              
          <div>
            <span className="font-semibold">a. Sebelum ditanggulangi</span><br />
            {/* <img src={data.HazardReport?.proof || "-"} className="w-8 h-8  mr-2" /> */}
           
           <img
            src={`${config.BACKEND_URL}/${data.HazardReport.proof}`} 
            className="w-45 h-42 mr-2"
          />

          </div>
            <div>
              <span className="font-semibold">b. Setelah ditanggulangi</span><br />
             {(previewImage || imageSolved?.proof) ? (
              <img
                src={previewImage?.startsWith("data:image") ? previewImage : `${config.BACKEND_URL}/${imageSolved?.proof}`}
                className="w-48 h-42 inline-block mr-2"
              />
            ) : (
              <span className="text-sm text-gray-500">belum ada penanggulangan</span>
            )}
            </div>
            </div>
          </div>
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Tipe Kecelakaan [Stop 6 + alpha]</p>
              <p className="text-lg">{data.HazardReport?.accidentType || "-"}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
             <div>
              <p className="font-medium">Level Kecelakaan</p>
              <p className="text-lg">{data.HazardEvaluation?.accidentLevel || "-"}</p>
              {/* <p>{catatan?.levelKecelakaan}</p> */}
            </div>
            <div>
              <p className="font-medium">Frekuensi Kerja</p>
              <p className="text-lg">{data.HazardEvaluation?.workingFrequency || "-"}</p>
              {/* <p>{catatan?.levelKecelakaan}</p> */}
            </div>

            {/* Baris 6 */}
            <div >
              <p className="font-medium">Level Pencegah Bahaya</p>
              <p className="text-lg">{data.HazardEvaluation?.hazardControlLevel || "-"}</p>
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
                  onChange={(value) => {
                    setSelectedProgress(value);
                  }}
                  group="pic"
                  name="picRadio"
                  value={selectedProgress}
                  error={false}
                  disabled={isDisabled}
                />
                </div>
                {selectedProgress === "Tolak" && (
                  isSubmittedGL || isSubmittedSH ? (
                <div>
                <p className="mb-1 font-semibold">Alasan Menolak</p>
                <TextArea
                  rows={4}
                  placeholder={
                    auth.roleName === 'line head'
                      ? 'Silakan isi alasan dari Group Leader'
                      : 'Silakan isi alasan dari Section Head'
                  }
                   className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  isDisabled
                    ? 'bg-gray-100 text-gray-500 border-gray-300'
                    : 'border-gray-500 focus:ring-primary focus:border-primary'
                 }`}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  disabled={isDisabled}
                />
                <div className="text-center col-span-12">
                <ButtonSubmit
                label={isSubmittedData ? "UPDATE" : "SUBMIT"}
                  onClick={handleSubmitReject}
                  disabled={isDisabled}
                  showError={selectedProgress === "Tolak" && reason.trim() === ""}
                />

              </div>
              </div>
                ) : (
                 <div>
                <p className="mb-1 font-semibold">Alasan Menolak</p>
                <TextArea
                  rows={4}
                   placeholder={
                    auth.roleName === 'line head'
                      ? 'Silakan isi alasan dari Group Leader'
                      : 'Silakan isi alasan dari Section Head'
                  }
                   className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  isDisabled
                    ? 'bg-gray-100 text-gray-500 border-gray-300'
                    : 'border-gray-500 focus:ring-primary focus:border-primary'
                 }`}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  disabled={isDisabled}
                />
                <div className="text-center col-span-12">
               <ButtonSubmit
                label={isSubmittedData ? "UPDATE" : "SUBMIT"}
                  onClick={handleSubmitReject}
                  disabled={isDisabled}
                  showError={selectedProgress === "Tolak" && reason.trim() === ""}
                />
              </div>
              </div> 
              )
            )}
          </div>
          {/* <!-- Progress Tindak Lanjut--> */}
          {selectedProgress === "Terima" &&  (  
            isSubmittedGL || isSubmittedSH?(
            <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Progress Penanggulangan</h3>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {/* Saran dan Usulan */}
                <div className="grid grid-cols-12 gap-2">
                {/* Kolom 1: PIC */}
                 {/* Kolom 1: PIC Penanggulangan */}
                  <div className="col-span-8 md:col-span-12">
                    <p className="mb-1 font-bold">PIC Penanggulangan</p>
                    <div className="rounded-2xl border border-gray-400 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
                      <RadioGroupProgress
                        options={optionsUser}
                        onChange={(value) => {
                          setSelectedPIC(value);
                          if (value !== "Pihak lain") {
                            setPihakLain(""); // reset kalau bukan pihak lain
                          }
                        }}
                        group="pic"
                        name="picRadio"
                        value={selectedPIC}
                        error={false}
                        disabled={isDisabled}
                      />
                      {selectedPIC === "Pihak lain" && (
                        <div className="mt-3">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Nama Pihak Lain"
                            value={pihakLain}
                            onChange={(e) => setPihakLain(e.target.value)}
                            disabled={isDisabled}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Kolom 2: Tanggal */}
                  <div className="col-span-12 md:col-span-4 space-y-4">
                    <div>
                      <label className="block font-medium mb-1">Tanggal Plan C/M</label>
                      <DatePicker
                        id="plan-cm"
                        mode="single"
                        defaultDate={planCM}
                        onChange={handleChangePlanCM}
                        placeholder="dd-MMM-yyyy"
                        dateFormat="d-M-Y"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                        hint={errors.submissions?.incidentDate}
                        error={errors?.submissions?.incidentDate !== undefined}
                        disabled={isDisabled}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Tanggal Plan Selesai</label>
                      <DatePicker
                        id="finish-plan"
                        mode="single"
                        defaultDate={finishplan ?? undefined}
                        onChange={handleChangeFinishPlan}
                        placeholder="dd-MMM-yyyy"
                        dateFormat="d-M-Y"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                        hint={errors.submissions?.incidentDate}
                        error={errors?.submissions?.incidentDate !== undefined}
                        disabled={isDisabled}
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
                disabled={auth.roleName !== 'section head' || isSubmittedSH} // hanya disable kalau bukan role SH atau sudah submit SH
                placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  auth.roleName !== 'section head' || isSubmittedSH
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
              disabled={auth.roleName !== 'line head' || isSubmittedGL}
              placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
              className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                auth.roleName !== 'line head' || isSubmittedGL
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
       <div className="text-center col-span-12">
        {isLoadingSubmit || isLoadingUpdate ? (
          <div className="flex justify-center items-center gap-2 mt-4">
            <svg
              className="animate-spin h-5 w-5 text-green-600"
              viewBox="0 0 24 24"
            >
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
        <div className="grid grid-cols-12 gap-2">
  {/* Tombol UPDATE */}
  <div className="col-span-6">
    <ButtonSubmit
      label="UPDATE"
      onClick={handleUpdateData}
      disabled={isUpdateDisabled}
    />
  </div>

  {/* Tombol SUBMIT */}
  <div className="col-span-6">
    <ButtonSubmit
      label="SUBMIT"
      onClick={handleSubmitCounter}
      disabled={isSubmitDisabled}
      showError={
        auth.roleName === 'line head' &&
        selectedProgress === 'Terima' &&
        !fileImage &&
        !isSubmittedGL
      }
    />
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
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Progress Penanggulangan</h3>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {/* Saran dan Usulan */}
                <div className="grid grid-cols-12 gap-2">
                {/* Kolom 1: PIC */}
                  <div className="col-span-6 md:col-span-8">
                    <p className='mb-1 font-bold'>PIC Penanggulangan</p>
                   <div className=" rounded-2xl border border-gray-400 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
                    <RadioGroupProgress
                      options={optionsUser}
                      onChange={(value) => {
                        setSelectedPIC(value);
                        if (value !== "Pihak lain") {
                        setPihakLain(''); // reset kalau bukan pihak lain
                      }
                      }}
                      group="pic"
                      name="picRadio" 
                      value={selectedPIC}
                      error={false}
                      disabled={isDisabled}
                    />
                     {selectedPIC === "Pihak lain" && (
                      <div className="mt-3">
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Nama Pihak Lain"
                          value={pihakLain}
                          onChange={(e) => setPihakLain(e.target.value)}
                          disabled={isDisabled}
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
                      disabled={isDisabled}
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
                    disabled={isDisabled}
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
                disabled={auth.roleName !== 'section head' || isSubmittedSH} // hanya disable kalau bukan role SH atau sudah submit SH
                placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  auth.roleName !== 'section head' || isSubmittedSH
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
                disabled={auth.roleName !== 'line head' || isSubmittedGL}
                placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                className={`w-full rounded-md border shadow-sm py-2 px-2 ${
                  auth.roleName !== 'line head' || isSubmittedGL
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
  {isLoadingSubmit || isLoadingUpdate ? (
    <div className="flex justify-center items-center gap-2 mt-4">
      <svg
        className="animate-spin h-5 w-5 text-green-600"
        viewBox="0 0 24 24"
      >
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
    <div className="grid grid-cols-12 gap-2">
  {/* Tombol UPDATE */}
  <div className="col-span-6">
    <ButtonSubmit
      label="UPDATE"
      onClick={handleUpdateData}
      disabled={isUpdateDisabled}
    />
  </div>

  {/* Tombol SUBMIT */}
  <div className="col-span-6">
    <ButtonSubmit
      label="SUBMIT"
      onClick={handleSubmitCounter}
      disabled={isSubmitDisabled}
      showError={
        auth.roleName === 'line head' &&
        selectedProgress === 'Terima' &&
        !fileImage &&
        !isSubmittedGL
      }
    />
  </div>
</div>

  )}
</div>

      </div>
      </div>

    )
    )}
  </div> 

  );
}
