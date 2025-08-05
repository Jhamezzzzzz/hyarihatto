import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the type
type FormData = {
  name: string;
  noreg: string;
  shift: string;
  lineName: string;
  sectionName: string;
  formattedDate: string;
  time: string;
  line: string;
  location: string;
  image: string;

  submissions: {
    userId: number | null;
    lineId: number | null;
    sectionId: number | null;
    type: string;
    shift: string;
    incidentDate: string;
    incidentTime: string;
    location: string;
  };

  voiceMember: {
    currentActivity: string;
    issue: string;
    expectedCondition: string;
    improvementSuggestion?: string;
  }
};

// 2. Context shape
interface FormDataContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  updateFormData: (section: keyof Pick<FormData, "submissions" | "voiceMember"> | null, key: string, value: string | number | null) => void;
  clearAllLocal: () => void
}

// 3. Create context
const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

// 4. Provider
export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: localStorage.getItem("name") || "",
    noreg: localStorage.getItem("noreg") || "",
    lineName: localStorage.getItem("lineName") || "",
    sectionName: localStorage.getItem("sectionName") || "",
    shift: localStorage.getItem("submissions.shift") || "",
    formattedDate: localStorage.getItem("formattedDate") || "",
    time: "",
    line: "",
    location: "",
    image: localStorage.getItem("image") || "",

    submissions: {
      userId: Number(localStorage.getItem("submissions.userId")) || null,
      lineId: Number(localStorage.getItem("submissions.lineId")) || null,
      sectionId: Number(localStorage.getItem("submissions.sectionId")) || null,
      type: "voice member",
      shift: localStorage.getItem("submissions.shift") || "",
      incidentDate: localStorage.getItem("submissions.incidentDate") || "",
      incidentTime: localStorage.getItem("submissions.incidentTime") || "",
      location: localStorage.getItem("submissions.location") || "",
    },

    voiceMember: {
      currentActivity: localStorage.getItem('voiceMember.currentActivity') || "",
      issue: localStorage.getItem('voiceMember.issue') || "",
      expectedCondition: localStorage.getItem('voiceMember.expectedCondition') || "",
      improvementSuggestion: localStorage.getItem('voiceMember.improvementSuggestion') || ""
    }
  });

  // 5. Helper to update nested formData and localStorage
  const updateFormData = (
    section: keyof Pick<FormData, "submissions" | "voiceMember"> | null,
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

  const clearAllLocal = () => {
    localStorage.setItem('noreg', "")
    localStorage.setItem('name', "")
    localStorage.setItem('line', "")
    localStorage.setItem('section', "")
    localStorage.setItem('formattedDate', "")
    localStorage.setItem('image', "")
    localStorage.setItem('submissions.userId', "")
    localStorage.setItem('submissions.lineId', "")
    localStorage.setItem('submissions.sectionId', "")
    localStorage.setItem('submissions.shift', "")
    localStorage.setItem('submissions.incidentDate', "")
    localStorage.setItem('submissions.incidentTime', "")
    localStorage.setItem('submissions.location', "")
    localStorage.setItem('voiceMember.currentActivity', "")
    localStorage.setItem('voiceMember.issue', "")
    localStorage.setItem('voiceMember.expectedCondition', "")
    localStorage.setItem('voiceMember.improvementSuggestion', "")
  }

  return (
    <FormDataContext.Provider value={{ formData, setFormData, updateFormData, clearAllLocal }}>
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
