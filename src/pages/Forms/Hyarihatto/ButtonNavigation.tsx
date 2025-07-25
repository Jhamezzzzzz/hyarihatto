import { useNavigate } from 'react-router';
import { useFormData } from '../../../context/FormHyarihattoContext';
import usePublicDataService from '../../../services/PublicService';
import { useFormErrors } from '../../../context/FormErrorContext';
import StaticOptions from '../../../utils/StaticOptions';

const ButtonNavigation = () => {
    const navigate = useNavigate()
    const { errorMessageObject } = StaticOptions()
    const { formData, clearAllLocal } = useFormData()
    const { updateError, clearAllErrors } = useFormErrors()
    const { postFormSubmissions } = usePublicDataService()

    const identityNotComplete = 
        !formData.submissions.userId || 
        !formData.submissions.sectionId || 
        !formData.submissions.shift

    const step1NotComplete =
        !formData.submissions.incidentDate ||
        !formData.submissions.incidentTime ||
        !formData.submissions.location;

    const step2NotComplete =
        !formData.hazardAssessment.currentActivity ||
        !formData.hazardAssessment.potentialHazard ||
        !formData.hazardAssessment.hazardReason ||
        !formData.hazardAssessment.expectedCondition 

    const step3NotComplete =
        !formData.hazardReport.pattern ||
        !formData.hazardReport.source ||
        !formData.hazardReport.injured ||
        !formData.hazardReport.cause ||
        !formData.hazardReport.category;

    const step4NotComplete = !formData.image;

    const step5NotComplete = !formData.hazardReport.accidentType;

    const step6NotComplete =
        !formData.hazardEvaluation.accidentLevelId ||
        !formData.hazardEvaluation.hazardControlLevelId ||
        !formData.hazardEvaluation.workingFrequencyId;

    const isError = (step: number) => {
        switch (step){
            case 0: 
                return identityNotComplete
            case 1:
                return step1NotComplete
            case 2: 
                return step2NotComplete
            case 3:
                return step3NotComplete
            case 4: 
                return step4NotComplete
            case 5:
                return step5NotComplete
            case 6: 
                return step6NotComplete
        }
    }

    const setErrorForm = (step: number) => {
        const requiredSections: (keyof typeof formData)[] = ["submissions", "submissions", "hazardAssessment", "hazardReport", "image", "hazardReport", "hazardEvaluation"];
        const sectionForm = formData[requiredSections[step]]
        if(sectionForm === ""){
            const isEmpty = formData.image === "" || formData.image === null || formData.image === undefined
            updateError(null, "image", isEmpty ? `Gambar tidak boleh kosong!` : undefined)
            return
        }

        Object.entries(sectionForm).forEach(([key, value]) => {
            const isEmpty = value === "" || value === null || value === undefined;
            const message = errorMessageObject[key] 
            if(key.includes('Id')){
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                updateError(requiredSections[step] as any, key, isEmpty ? `${message} tidak terdaftar!` : undefined);
            }else{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                updateError(requiredSections[step] as any, key, isEmpty ? `${message} tidak boleh kosong!` : undefined);
            }
        });
      };

    

    const ButtonPrevious = (toStep: string | number) => {
        const handleNavigate = () => {
            if(toStep===0){
                navigate(`/member/hyarihatto`)
            }else{
                navigate(`/member/hyarihatto/${toStep}`)
            }
            clearAllErrors()
        };
        return (
            <div>
              <div className="mt-8 text-right">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNavigate}
                    >
                      Kembali
                  </button>
              </div>
          </div>
        )
    }
    const ButtonNext = (toStep: string | number) => {
        const handleNavigate = () => {
            if(!isError(Number(toStep)-1)){
                navigate(`/member/hyarihatto/${toStep}`)
                clearAllErrors()
            }else{
                setErrorForm(Number(toStep)-1)
            }
        };
        return (
          <div>
              <div className="mt-8 text-right">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNavigate}
                  >
                      Selanjutnya
                  </button>
              </div>
          </div>
        )
    }

    const ButtonSubmit = () => {
        const handleSubmit = async() => {
            try {
                if(step6NotComplete){
                    setErrorForm(6)
                    return
                }
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
                const base64ImageLocal = localStorage.getItem("image") || ""
                const base64ImageFileNameLocal = localStorage.getItem("imageFileName") || ""
                const fileImage = base64ToFile(base64ImageLocal, base64ImageFileNameLocal, "image/png")
    
                const newFormData = new FormData()
                const fieldData = {
                    submission: formData.submissions,
                    hazardAssessment: formData.hazardAssessment,
                    hazardReport: formData.hazardReport,
                    hazardEvaluation: formData.hazardEvaluation,
                }
                newFormData.append("data", JSON.stringify(fieldData))
                newFormData.append("image", fileImage)
                await postFormSubmissions(newFormData)
                clearAllLocal()
                navigate('/member/hyarihatto/submitted')
            } catch (error) {
                console.error(error)
            }

        }

        return (
          <div>
              <div className="mt-8 text-right">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                  >
                      Submit
                  </button>
              </div>
          </div>
        )
    }

    return{ ButtonPrevious, ButtonNext, ButtonSubmit}

}

export default ButtonNavigation