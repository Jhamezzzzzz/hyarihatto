import { useNavigate } from 'react-router';
import { useFormData } from '../../../context/FormVoiceMemberContext';
import usePublicDataService from '../../../services/PublicService';
import { useFormErrors } from '../../../context/FormErrorContext';
import StaticOptions from '../../../utils/StaticOptions';

const ButtonVoice = () => {
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
        !formData.voiceMember.currentActivity ||
        !formData.voiceMember.issue ||
        !formData.voiceMember.expectedCondition 

    const step3NotComplete = !formData.image;



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

        }
    }

    const setErrorForm = (step: number) => {
        const requiredSections: (keyof typeof formData)[] = ["submissions", "submissions", "voiceMember", "image"];
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
                navigate(`/member/voice-member`)
            }else{
                navigate(`/member/voice-member/${toStep}`)
            }
            clearAllErrors()
        };
        return (
            <div>
              <div className="mt-8 text-right">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent 
                    shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                navigate(`/member/voice-member/${toStep}`)
                clearAllErrors()
            }else{
                setErrorForm(Number(toStep)-1)
            }
        };
        return (
          <div>
              <div className="mt-8 text-right">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                     text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                if(step3NotComplete){
                    setErrorForm(3)
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
                    voiceMember: formData.voiceMember,
                }
                newFormData.append("data", JSON.stringify(fieldData))
                newFormData.append("image", fileImage)
                await postFormSubmissions(newFormData)
                clearAllLocal()
                navigate('/member/voice-member/submitted')
            } catch (error) {
                console.error(error)
            }

        }

        return (
          <div>
              <div className="mt-8 text-right">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                     text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 
                      disabled:cursor-not-allowed"
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

export default ButtonVoice