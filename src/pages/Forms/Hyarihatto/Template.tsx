import React, { ReactNode, useState } from "react";
import TitleFormHyarihatto from "./Title";
import { useNavigate } from "react-router";
import { useFormHyarihatto } from "../../../context/FormHyarihattoContext";
import { useFormErrors } from "../../../context/FormErrorContext";
import StaticOptions from "../../../utils/StaticOptions";
import PageMeta from "../../../components/common/PageMeta";

const Template = ({
  children,
  showBack,
  backToHome,
  showStep,
  step,
}: {
  children: ReactNode;
  showBack?: boolean;
  backToHome?: boolean;
  showStep?: boolean;
  step?: number;
}) => {
  const [currentStep, setCurrentStep] = useState(step || 0);
  const navigate = useNavigate();
  const { errorMessageObject } = StaticOptions()
  const { formData } = useFormHyarihatto();
  const { updateError, clearAllErrors } = useFormErrors()

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
    switch (step) {
      case 1:
        return step1NotComplete;
      case 2:
        return step2NotComplete;
      case 3:
        return step3NotComplete;
      case 4:
        return step4NotComplete;
      case 5:
        return step5NotComplete;
      case 6:
        return step6NotComplete;
    }
  };

  const setErrorForm = (step: number) => {
      const requiredSections: (keyof typeof formData)[] = ["submissions", "hazardAssessment", "hazardReport", "hazardEvaluation"];
      const sectionForm = formData[requiredSections[step-1]]

      Object.entries(sectionForm).forEach(([key, value]) => {
          const isEmpty = value === "" || value === null || value === undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          updateError(requiredSections[step-1] as any, key, isEmpty ? `${errorMessageObject[key]} tidak boleh kosong!` : undefined);
      });
    };



  const handleClickStep = (s: number) => {
    if(!isError(currentStep) || s < currentStep){
      setCurrentStep(s);
      navigate(`/member/hyarihatto/${s}`);
      clearAllErrors()
    }else{
      setErrorForm(currentStep)
    }
  }


  const buttonStep = (
    <div className="flex justify-center items-center gap-2 mb-4">
      {[1, 2, 3, 4, 5, 6].map((s, index) => {
        const isActive = currentStep === s;
        const isPassed = !isError(s);

        return (
          <React.Fragment key={s}>
            <button
              className={`w-10 h-10 rounded-full font-semibold border transition-all duration-200
                            ${
                              isActive
                                ? "bg-green-600 text-white"
                                : isPassed
                                ? "border-green-600 text-green-600 hover:bg-blue-100"
                                : "border-gray-300 text-gray-400"
                            }`}
              onClick={()=>handleClickStep(s)}
            //   disabled={!canNavigate}
            >
              {index + 1}
            </button>

            {index < 5 && <span className="text-gray-400 select-none">─</span>}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div>
      <PageMeta title="Form Hyarihatto | Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
      <div
        className="min-h-screen flex items-center justify-center p-4 py-30  bg-no-repeat bg-cover bg-center bg-[url(components/image/Wave-Background-Hyat.png)] dark:bg-[url(components/image/Wave-Dark-Background-Hyat.png)]"
      >
        <div className="w-full max-w-2xl">
          <TitleFormHyarihatto showBack={showBack || false} backToHome={backToHome}/>
          {showStep && <div className="mb-4">{buttonStep}</div>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Template;
