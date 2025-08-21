import { useRef,useEffect,useState } from "react";
import useHyarihattoDataService from "../../services/HyarihattoDataService";
import { useParams} from 'react-router-dom';
import config from '../../utils/Config'
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// import '../../components/styles/PrintStyle.css'

export type Submission = {
  user: {
    name: string;
    username: string;
    Organization:{
        Line:{
        lineName: string; 
        }
        Section:{
        sectionName: string; 
        }
        Department:{
        departmentName: string; 
        }
        Division:{
        divisionName: string; 
        }
    }
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
  VoiceMember:{
    currentActivity: string;
    issue: string;
    expectedCondition: string;
    improvementSuggestion: string;
    proof: string;
  }
  status: number;
  type: string;
  incidentDate: string;
  incidentTime: string;
  shift: string;
  location: string;
};
export default function PrintHyarihatto() {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Submission | null>(null);
    const printRef = useRef<HTMLDivElement>(null);
   

    const { getSubmissionById} = useHyarihattoDataService();


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

  const handlePrint = useReactToPrint({
  contentRef: printRef,   // ✅ langsung pakai contentRef, bukan function lagi
  documentTitle: "Creative Idea Suggestion Form", // opsional biar nama file PDF rapi
});
const handleDownloadPDF = async () => {
  if (printRef.current) {
    const element = printRef.current;

    const canvas = await html2canvas(element, { 
      scale: 2,
      useCORS: true // penting biar foto dari backend gak hilang
    });

    const imgData = canvas.toDataURL("image/png");

    // Landscape A4
    const pdf = new jsPDF("l", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // const imgProps = pdf.getImageProperties(imgData);
    // const imgWidth = pdfWidth;
    // const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    // kalau tinggi gambar lebih panjang dari halaman → scale ke fit
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); 

    const nama = data?.user?.name || "Unknown";
    const noreg = data?.user?.username || "NoReg";
    const filename = `${nama}_${noreg}_Hyarihatto_Print.pdf`;

    pdf.save(filename);
  }
};



return (
  <div className="p-6">
    {/* Area yang akan diprint */}
    <div ref={printRef} className="border rounded-lg p-4 bg-white print-wrapper">
      <h5 className="text-sm mb-1">Toyota Motor Manufacturing Indonesia</h5>
      <h2 className="text-2xl font-bold mb-1">Creative Idea Suggestion Form</h2>

      {/* Bagian Header */}
      <div className="grid grid-cols-12 gap-4 border p-3 mb-4">
        <div className="col-span-8">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-9 mb-1">
              <label className="font-semibold">Judul:</label>
               <p className="border w-full px-2 py-1 text-md">
              {data?.HazardAssessment?.currentActivity || "-"}
                </p>
            </div>
            <div className="col-span-3">
              <label className="font-semibold">Type:</label>
              <p className="border w-full px-2 py-1 text-sm">
                {data?.type || "-"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-8">
                  <label className="font-semibold">Nama:</label>
                  <p className="border w-full px-2 py-1 text-sm">
                    {data?.user?.name || "-"}
                  </p>
                </div>
           
                <div className="col-span-4">
                  <label className="font-semibold">Noreg:</label>
                  <p className="border w-full px-2 py-1 text-sm">
                    {data?.user?.username || "-"}
                  </p>
                </div>
              </div>
                <div>
                <label className="font-semibold">Section:</label>
                <p className="border w-full px-2 py-1 text-sm">
                  {data?.user?.Organization?.Section?.sectionName || "-"}
                </p>
              </div>   
              <div>
                <label className="font-semibold">Departement:</label>
                <p className="border w-full px-2 py-1 text-sm">
                  {data?.user?.Organization?.Department?.departmentName || "-"}
                </p>
              </div>
              <div>
                <label className="font-semibold">Divisi:</label>
                <p className="border w-full px-2 py-1 text-sm">
                  {data?.user?.Organization?.Division?.divisionName || "-"}
                </p>
              </div>
            </div>
            <div className="col-span-6">
            <div>
              <label className="font-semibold">
                Latar Belakang (Masalah yang dihadapi):
              </label>
              <p className="border w-full min-h-[80px] px-2 py-1 text-sm">
                {data?.HazardAssessment?.potentialHazard || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

        <div className="col-span-4 border p-2">
          <label className="font-semibold">Tanggal Pembuatan Ide</label>
          <p className="border w-full px-2 py-1 mb-2 text-md">
            {data?.incidentDate || "-"}
          </p>

          <div className="mt-2">
            <p className="font-semibold">Status Ide:</p>
            <div className="grid grid-cols-1 py-2">
           <div>
           <label
              className={`flex items-center gap-2 ${
                data?.status !== 2 ? "text-gray-400" : "text-black"
              }`}
            >
              <input
              type="radio"
              name="statusRadio"
              value="sudah"
              checked={data?.status==2}
              disabled
              className="accent-blue-200"/>
              <span className="text-sm">Sudah dilaksanakan, tanggal [{data?.Reviews?.[0]?.actionPlan}] </span>
            </label>
             <label
              className={`flex items-center gap-2 ${
                data?.status !== 1 ? "text-gray-400" : "text-black"
              }`}
              >
              <input
              type="radio"
              name="statusRadio"
              value="Dijadwalkan"
              checked={data?.status==1}

              className="accent-blue-500"/>
              <span className="text-sm">Dijadwalkan, tanggal [{data?.Reviews?.[0]?.actionDate}]</span>
            </label>
               <label
              className={`flex items-center gap-2 ${
                data?.status !== 0 ? "text-gray-400" : "text-black"
              }`}
              >
              <input
              type="radio"
              name="statusRadio"
              value="belum"
              checked={data?.status==0}
              disabled
              className="accent-blue-200"/>
              <span className="text-sm" >Belum dilaksanakan</span>
            </label>
           </div>
          </div>
          </div>
        </div>
      </div>

      {/* Masalah & Penanggulangan */}
      <div className="grid grid-cols-2 gap-2 ">
        <div className="border p-2">
          <h3 className="font-semibold mb-2">Masalah</h3>
          <div className="grid grid-cols-12 gap-2 ">
            <img
            src={`${config.BACKEND_URL}/${data?.HazardReport.proof}`} 
            className="w-40 h-40 mr-1 col-span-4"
            />
          <div className="col-span-8">
            <p className="text-sm">{data?.HazardAssessment?.potentialHazard || "-"}</p>
            <p className="text-sm">{data?.HazardAssessment?.hazardReason || "-"}</p>
          </div>
        </div>
      </div> 
      <div className="border p-3">
          <h3 className="font-semibold mb-2">Penanggulangan</h3>
        <div className="grid grid-cols-12 gap-2 ">
          {( data?.Reviews?.[0]?.proof) ? (
          <img
            src={`${config.BACKEND_URL}/${data?.Reviews?.[0]?.proof}`}
            className="w-40 h-40 inline-block mr-1 col-span-4"
          />
          ) : (
            <span className="text-sm text-gray-500 w-48 h-42 inline-block mr-1 col-span-4">Belum ada Foto penanggulangan</span>
          )}
          <div className="col-span-8">
            <p className="text-sm">{data?.HazardAssessment?.improvementSuggestion || "-"}</p>
          </div>
        </div>
      </div>
    </div>
      {/* Comment GH / SH */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="font-semibold">Comment GL</label>
        <p className="border w-full min-h-[80px] px-2 py-1 text-sm">
          {data?.Reviews?.[0]?.suggestionGL || "-"}
        </p>
      </div>
      <div>
        <label className="font-semibold">Comment SH</label>
        <p className="border w-full min-h-[80px] px-2 py-1 text-sm">
          {data?.Reviews?.[0]?.suggestionSH || "-"}
        </p>
      </div>
    </div>
  </div>

    {/* Tombol Print */}
   <div className="mt-4 flex justify-end gap-3 no-print">
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Print
      </button>
      <button
        onClick={handleDownloadPDF}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Download PDF
      </button>
    </div>
  </div>
);

}
