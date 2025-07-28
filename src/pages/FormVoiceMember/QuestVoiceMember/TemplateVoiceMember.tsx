import React, { ReactNode, useState } from "react";
import WaveBackground from "../../../components/image/Wave-Background.png";
import TitleFormHyarihatto from "./Title";
import { useNavigate } from "react-router";
import { useFormData } from "../../../context/FormHyarihattoContext";

const TemplateVoiceMember = ({
  children,
  showBack,
  showStep,
  step,
}: {
  children: ReactNode;
  showBack?: boolean;
  showStep?: boolean;
  step?: number;
}) => {
  const [currentStep, setCurrentStep] = useState(step || 0);
  const navigate = useNavigate();
  const { formData } = useFormData();

const step1NotComplete =
    !formData.submissions.incidentDate ||
    !formData.submissions.incidentTime ||
    !formData.submissions.location;

  const step2NotComplete =
    !formData.hazardAssessment.currentActivity ||
    !formData.hazardAssessment.potentialHazard ||
    !formData.hazardAssessment.expectedCondition ||
    !formData.hazardAssessment.improvementSuggestion;



  const step4NotComplete = !formData.hazardReport.pattern;



  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return !step1NotComplete;
      case 2:
        return !step2NotComplete;
      case 4:
        return !step4NotComplete;
    }
  };

  const buttonStep = (
    <div className="flex justify-center items-center gap-2 mb-4">
      {[1, 2, 3, 4].map((s, index) => {
        const isActive = currentStep === s;
        const isPassed = validateStep(s);
        // const canNavigate = validateStep(currentStep);

        return (
          <React.Fragment key={s}>
            <button
              className={`w-10 h-10 rounded-full font-semibold border transition-all duration-200
                            ${
                              isActive
                                ? "bg-blue-600 text-white"
                                : isPassed
                                ? "border-blue-600 text-blue-600 hover:bg-blue-100"
                                : "border-gray-300 text-gray-400 cursor-not-allowed"
                            }`}
              onClick={() => {
                // if (s <= currentStep) {
                console.log("CLICKED S: ", s)
                setCurrentStep(s);
                navigate(`/member/hyarihatto/${s}`);
                // }
              }}
            //   disabled={!canNavigate}
            >
              {index + 1}
            </button>

            {index < 3 && <span className="text-gray-400 select-none">─</span>}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center p-4  bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${WaveBackground})` }}
      >
        <div className="w-full max-w-2xl">
          <TitleFormHyarihatto showBack={showBack || false} />
          {showStep && <div className="mb-4">{buttonStep}</div>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default TemplateVoiceMember;
