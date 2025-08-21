import { useRef,useEffect,useState } from "react";
import useHyarihattoDataService from "../../services/HyarihattoDataService";
import { useParams} from 'react-router-dom';
import config from '../../utils/Config'

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
  const handlePrint = () => {
    window.print();
  };


return (
  <div className="p-6">
    {/* Area yang akan diprint */}
    <div ref={printRef} className="border rounded-lg p-4 bg-white">
      <h5 className="text-sm mb-3">Toyota Motor Manufacturing Indonesia</h5>
      <h2 className="text-2xl font-bold mb-2">Creative Idea Suggestion Form</h2>

      {/* Bagian Header */}
      <div className="grid grid-cols-12 gap-4 border p-3 mb-4">
        <div className="col-span-8">
          <div className="mb-2">
            <label className="font-semibold">Judul:</label>
            <p className="border w-full px-2 py-1 text-lg">
              {data?.HazardAssessment?.currentActivity || "-"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold">Nama:</label>
              <p className="border w-full px-2 py-1 text-md">
                {data?.user?.name || "-"}
              </p>
            </div>
            <div>
              <label className="font-semibold">Type:</label>
              <p className="border w-full px-2 py-1 text-md">
                {data?.type || "-"}
              </p>
            </div>
            <div>
              <label className="font-semibold">Noreg:</label>
              <p className="border w-full px-2 py-1 text-md">
                {data?.user?.username || "-"}
              </p>
            </div>
            <div>
              <label className="font-semibold">Divisi:</label>
              <p className="border w-full px-2 py-1 text-md">
                {data?.user?.Organization?.Division?.divisionName || "-"}
              </p>
            </div>
            <div>
              <label className="font-semibold">Departement:</label>
              <p className="border w-full px-2 py-1 text-md">
                {data?.user?.Organization?.Department?.departmentName || "-"}
              </p>
            </div>
            <div>
              <label className="font-semibold">Section:</label>
              <p className="border w-full px-2 py-1 text-md">
                {data?.user?.Organization?.Section?.sectionName || "-"}
              </p>
            </div>
          </div>

          <div className="mt-2">
            <label className="font-semibold">
              Latar Belakang (Masalah yang dihadapi):
            </label>
            <p className="border w-full min-h-[80px] px-2 py-1 text-lg">
              {data?.HazardAssessment?.potentialHazard || "-"}
            </p>
          </div>
        </div>

        <div className="col-span-4 border p-2">
          <label className="font-semibold">Tanggal Pembuatan Ide</label>
          <p className="border w-full px-2 py-1 mb-2 text-md">
            {data?.incidentDate || "-"}
          </p>

          <div className="mt-2">
            <p className="font-semibold">Status Ide:</p>
            <p className="border w-full px-2 py-1">Belum Dilaksanakan</p>
          </div>
        </div>
      </div>

      {/* Masalah & Penanggulangan */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border p-3">
          <h3 className="font-semibold mb-2">Masalah</h3>
            <img
            src={`${config.BACKEND_URL}/${data?.HazardReport.proof}`} 
            className="w-45 h-42 mr-2"
          />
          <p>{data?.HazardAssessment?.potentialHazard || "-"}</p>
          <p>{data?.HazardAssessment?.hazardReason || "-"}</p>
        </div>
        <div className="border p-3">
          <h3 className="font-semibold mb-2">Penanggulangan</h3>
           {/* {( data?.Reviews?.proof) ? (
              <img
                src={`${config.BACKEND_URL}/${data?.Reviews?.proof}`}
                className="w-48 h-42 inline-block mr-2"
              />
            ) : (
              <span className="text-sm text-gray-500">belum ada penanggulangan</span>
            )} */}
          <p>{data?.HazardAssessment?.improvementSuggestion || "-"}</p>
        </div>
      </div>

      {/* Comment GH / SH */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">Comment GL</label>
          <p className="border w-full min-h-[80px] px-2 py-1 text-md">
            {data?.Reviews?.[0]?.suggestionGL || "-"}
          </p>
        </div>
        <div>
          <label className="font-semibold">Comment SH</label>
          <p className="border w-full min-h-[80px] px-2 py-1 text-md">
            {data?.Reviews?.[0]?.suggestionSH || "-"}
          </p>
        </div>
      </div>
    </div>

    {/* Tombol Print */}
    <div className="mt-4 flex justify-end">
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Print
      </button>
    </div>
  </div>
);

}
