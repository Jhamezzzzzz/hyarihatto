import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the type
type FormData = {
  name: string;
  noreg: string;
  shift: string;
  formattedDate: string;
  time: string;
  line: string;
  location: string;
  image: string;

  submissions: {
    userId: number | null;
    type: string;
    shift: string;
    incidentDate: string;
    incidentTime: string;
    workProcess: string;
    location: string;
  };

  hazardAssessment: {
    currentActivity: string;
    potentialHazard: string;
    hazardReason: string;
    expectedCondition: string;
    improvementSuggestion: string;
  };

  hazardReport: {
    pattern: string;
    source: string;
    injured: string;
    cause: string;
    category: string;
    accidentType: string;
  };

  hazardEvaluation: {
    accidentLevelId: number | null;
    hazardControlLevelId: number | null;
    workingFrequencyId: number | null;
  };
};

// 2. Context shape
interface FormDataContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  updateFormData: (section: keyof Pick<FormData, "submissions" | "hazardAssessment" | "hazardReport" | "hazardEvaluation"> | null, key: string, value: string | number | null) => void;
}

// 3. Create context
const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

// 4. Provider
export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: localStorage.getItem("name") || "",
    noreg: localStorage.getItem("noreg") || "",
    shift: localStorage.getItem("submissions.shift") || "",
    formattedDate: localStorage.getItem("formattedDate") || "",
    time: "",
    line: "",
    location: "",
    image: localStorage.getItem("image") || "",

    submissions: {
      userId: Number(localStorage.getItem("submissions.userId")) || null,
      type: "hyarihatto",
      shift: localStorage.getItem("submissions.shift") || "",
      incidentDate: localStorage.getItem("submissions.incidentDate") || "",
      incidentTime: localStorage.getItem("submissions.incidentTime") || "",
      workProcess: localStorage.getItem("submissions.workProcess") || "",
      location: localStorage.getItem("submissions.location") || "",
    },

    hazardAssessment: {
      currentActivity: localStorage.getItem("hazardAssessment.currentActivity") || "",
      potentialHazard: localStorage.getItem("hazardAssessment.potentialHazard") || "",
      hazardReason: localStorage.getItem("hazardAssessment.hazardReason") || "",
      expectedCondition: localStorage.getItem("hazardAssessment.expectedCondition") || "",
      improvementSuggestion: localStorage.getItem("hazardAssessment.improvementSuggestion") || "",
    },

    hazardReport: {
      pattern: localStorage.getItem("hazardReport.pattern") || "",
      source: localStorage.getItem("hazardReport.source") || "",
      injured: localStorage.getItem("hazardReport.injured") || "",
      cause: localStorage.getItem("hazardReport.cause") || "",
      category: localStorage.getItem("hazardReport.category") || "",
      accidentType: localStorage.getItem("hazardReport.accidentType") || "",
    },

    hazardEvaluation: {
      accidentLevelId: Number(localStorage.getItem("hazardEvaluation.accidentLevelId")) || null,
      hazardControlLevelId: Number(localStorage.getItem("hazardEvaluation.hazardControlLevelId")) || null,
      workingFrequencyId: Number(localStorage.getItem("hazardEvaluation.workingFrequencyId")) || null,
    },
  });

  // 5. Helper to update nested formData and localStorage
  const updateFormData = (
    section: keyof Pick<FormData, "submissions" | "hazardAssessment" | "hazardReport" | "hazardEvaluation"> | null,
    key: string,
    value: string | number | null
  ) => {
    if(section === null){
      setFormData((prev) => {
        const updatedSection = {
          ...prev,
          [key]: value,
        };
        localStorage.setItem(`${key}`, String(value));
        return updatedSection;
      });
    }else{
      setFormData((prev) => {
        const updatedSection = {
          ...prev[section],
          [key]: value,
        };
  
        const updatedFormData = {
          ...prev,
          [section]: updatedSection,
        };
  
        localStorage.setItem(`${section}.${key}`, String(value));
        return updatedFormData;
      });
    }
  };

  return (
    <FormDataContext.Provider value={{ formData, setFormData, updateFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

// 6. Hook to use in components
export const useFormData = (): FormDataContextType => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
