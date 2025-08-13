import Template from "./Template";
import ButtonNavigation from "../Hyarihatto/ButtonNavigation";
// import { useFormData } from "../../../context/FormVoiceMemberContext";
import { useFormHyarihatto } from "../../../context/FormHyarihattoContext";
import { useEffect, useState } from "react";
import usePublicDataService from "../../../services/PublicService";
import RadioGroupV2 from "../../../components/form/input/RadioGroupV2";
import Spinner from "../../../components/ui/spinner";
import { useFormErrors } from "../../../context/FormErrorContext";

interface ResponseLevel {
  id: number;
  option: string;
  score: number;
  rank?: string;
  minScore?: number;
  maxScore?: number
}

const Step6FormHyarihatto = () => {
  const { ButtonPrevious, ButtonSubmit } = ButtonNavigation();
  const [loading, setLoading] = useState(true)
  const { formData, updateFormData } = useFormHyarihatto();
  const { errors, updateError } = useFormErrors()
  const [optionsAccidentLevel, setOptionsAccidentLevel] = useState([]);
  const [optionsHazardControlLevel, setOptionsHazardControlLevel] = useState([]);
  const [optionsWorkingFrequency, setOptionsWorkingFrequency] = useState([]);
  const [scoreRanks, setScoreRanks] = useState([])

  
  const [finalScoreRank, setFinalScoreRank] = useState({
    score: Number(localStorage.getItem('finalScore')) || 0,
    rank: localStorage.getItem("finalRank") || ""
  })

  const { getOptionMaster, calculateFinalScoreRank } = usePublicDataService();

  const fetchAllOptions = async () => {
    try {
        setLoading(true)
      const responseAccident = await getOptionMaster("accident-levels");
      const options1 = responseAccident?.data.data.map(
        (item: ResponseLevel) => {
          return {
            id: item.id,
            option: item.option,
            score: item.score,
            rank: item.rank,
          };
        }
      );
      setOptionsAccidentLevel(options1);

      const responseHazard = await getOptionMaster("hazard-control-levels");
      const options2 = responseHazard?.data.data.map((item: ResponseLevel) => {
        return {
          id: item.id,
          option: item.option,
          score: item.score,
        };
      });
      setOptionsHazardControlLevel(options2)

      const responseWorkFreq = await getOptionMaster("working-frequencies");
      const options3 = responseWorkFreq?.data.data.map((item: ResponseLevel) => {
        return {
          id: item.id,
          option: item.option,
          score: item.score,
        };
      });
      setOptionsWorkingFrequency(options3)

      const responseScoreRank = await getOptionMaster("score-ranks")
      const scores = responseScoreRank?.data.data.map((item: ResponseLevel) => {
        return {
          id: item.id,
          option: item.option,
          minScore: item.minScore,
          maxScore: item.maxScore,
          rank: item.rank,
        };
      });
      setScoreRanks(scores)

    } catch (error) {
      console.error(error);
    } finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    fetchAllOptions();
  }, []);

  const handleChangeRadio = (option: string, group: "submissions" | "hazardAssessment" | "hazardReport" | "hazardEvaluation", name: string) => {
    updateError(group, name, undefined)
    updateFormData(group, name, option)
  }

  const getFinalScoreRank = async() => {
    try {
        const response = await calculateFinalScoreRank({
            accidentLevelId: formData.hazardEvaluation.accidentLevelId, 
            hazardControlLevelId: formData.hazardEvaluation.hazardControlLevelId,
            workingFrequencyId: formData.hazardEvaluation.workingFrequencyId
        })
        const responseData = response?.data.data
        setFinalScoreRank({
            score: responseData.totalScore,
            rank: responseData.rank
        })
        localStorage.setItem("finalScore", responseData.totalScore)
        localStorage.setItem("finalRank", responseData.rank)
    } catch (error) {
        console.error(error)        
    }
  }

  useEffect(()=>{
    if(formData.hazardEvaluation.accidentLevelId !== null && formData.hazardEvaluation.hazardControlLevelId !== null && formData.hazardEvaluation.workingFrequencyId !== null){
        getFinalScoreRank()
    }
  }, [formData.hazardEvaluation])

  return (
    <div>
      <Template showStep step={6}>
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-xl overflow-hidden border dark:border-gray-700">
          <div className="bg-green-600 text-white text-center py-3">
            <h5 className="text-lg font-semibold">
              Pengisian Hyarihatto Score dan Rank
            </h5>
          </div>

          <div className="p-6 space-y-4">
            {/* Card Score dan Rank */}
            <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow rounded-lg">
              <div className="bg-gray-100 dark:bg-gray-600 px-4 py-2 text-center rounded-t-lg">
                <h5 className="text-lg font-semibold dark:text-gray-300">
                  Silakan pilih satu pada ketiga level berikut 
                </h5>
              </div>
              <div className="p-4 space-y-4">
                {/* Level Kecelakaan */}
                <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow rounded-lg">
                  <div className="bg-gray-100 dark:bg-gray-600 px-4 py-2 text-center rounded-t-lg">
                    <h5 className="text-base font-semibold dark:text-gray-300">
                      Level Kecelakaan <span className="text-red-500">*</span>
                    </h5>
                  </div>
                  <div className="p-4">
                    <RadioGroupV2
                        options={optionsAccidentLevel}
                        onChange={(option)=>handleChangeRadio(option, "hazardEvaluation", "accidentLevelId")}
                        group="hazardEvaluation"
                        name="accidentLevelId"
                        value={formData.hazardEvaluation.accidentLevelId?.toString() || ""}
                        hint={errors?.hazardEvaluation?.accidentLevelId}
                        error={errors?.hazardEvaluation?.accidentLevelId !== undefined}
                    />
                    { loading && (
                      <div className="flex items-center justify-center gap-2 py-14">
                        Memuat pilihan
                        <Spinner/>
                      </div>  
                    )}
                  </div>
                </div>

                {/* Frekuensi & Pencegah */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Frekuensi Kerja */}
                  <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow rounded-lg">
                    <div className="bg-gray-100 dark:bg-gray-600 px-4 py-2 text-center rounded-t-lg">
                      <h5 className="text-base font-semibold dark:text-gray-300">
                        Frekuensi Kerja <span className="text-red-500">*</span>
                      </h5>
                    </div>
                    <div className="p-4">
                      <RadioGroupV2
                        options={optionsWorkingFrequency}
                        onChange={(option)=>handleChangeRadio(option, "hazardEvaluation", "workingFrequencyId")}
                        group="hazardEvaluation"
                        name="workingFrequencyId"
                        value={formData.hazardEvaluation.workingFrequencyId?.toString() || ""}
                        hint={errors?.hazardEvaluation?.workingFrequencyId}
                        error={errors?.hazardEvaluation?.workingFrequencyId !== undefined}
                      />
                      { loading && (
                      <div className="flex items-center justify-center gap-2 py-18">
                        Memuat pilihan
                        <Spinner/>
                      </div>  
                    )}
                    </div>
                  </div>

                  {/* Pencegah Bahaya */}
                  <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow rounded-lg">
                    <div className="bg-gray-100 dark:bg-gray-600 px-4 py-2 text-center rounded-t-lg">
                      <h5 className="text-base font-semibold dark:text-gray-300">
                        Level Pencegah Bahaya{" "}
                        <span className="text-red-500">*</span>
                      </h5>
                    </div>
                    <div className="p-4">
                      <RadioGroupV2
                        options={optionsHazardControlLevel}
                        onChange={(option)=>handleChangeRadio(option, "hazardEvaluation", "hazardControlLevelId")}
                        group="hazardEvaluation"
                        name="hazardControlLevelId"
                        value={formData.hazardEvaluation.hazardControlLevelId?.toString() || ""}
                        hint={errors?.hazardEvaluation?.hazardControlLevelId}
                        error={errors?.hazardEvaluation?.hazardControlLevelId !== undefined}
                      />
                      { loading && (
                        <div className="flex items-center justify-center gap-2 py-18">
                          Memuat pilihan
                          <Spinner/>
                        </div>  
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panduan dan Total Nilai */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Panduan */}
              <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow rounded-lg">
                <div className="bg-gray-100 dark:bg-gray-600 px-4 py-2 text-center rounded-t-lg">
                  <h5 className="text-base font-semibold dark:text-gray-300">Panduan Nilai</h5>
                </div>
                <div className="p-3 text-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="px-2 py-1 dark:text-gray-300">SCORE</th>
                        <th className="px-2 py-1 dark:text-gray-300">RANK</th>
                      </tr>
                    </thead>
                    <tbody>
                      { scoreRanks.map((item: ResponseLevel, index: number)=>{
                        return(
                          <tr key={index}>
                            <td className="px-2 py-1 dark:text-gray-400">{item.minScore} - {item.maxScore}</td>
                            <td className="px-2 py-1 dark:text-gray-400">{item.rank}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  { loading && (
                    <div className="flex items-center justify-center gap-2 py-18">
                      Memuat pilihan
                      <Spinner/>
                    </div>  
                  )}
                </div>
              </div>

              {/* Total Nilai */}
              <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 shadow rounded-lg">
                <div className="bg-gray-100 dark:bg-gray-600 px-4 py-2 text-center rounded-t-lg">
                  <h5 className="text-base font-semibold dark:text-gray-300">Total Nilai</h5>
                </div>
                <div className="flex divide-x divide-gray-200 dark:divide-gray-700">
                  <div className="flex-1 p-4 text-center">
                    <p className="text-sm text-gray-600 font-semibold dark:text-gray-300 mb-1">SCORE</p>
                    <h2 className="text-2xl font-bold dark:text-gray-400">{finalScoreRank.score || "-"}</h2>
                  </div>
                  <div className="flex-1 p-4 text-center">
                    <p className="text-sm text-gray-600 font-semibold dark:text-gray-300 mb-1">RANK</p>
                    <h2 className="text-2xl font-bold dark:text-gray-400">{finalScoreRank.rank || "-"}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              {ButtonPrevious(5)}
              {ButtonSubmit()}
            </div>
          </div>
        </div>
      </Template>
    </div>
  );
};

export default Step6FormHyarihatto;
