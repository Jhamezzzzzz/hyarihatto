import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Match the shape of FormData, but values are error strings
type FormErrors = {
  name?: string;
  noreg?: string;
  shift?: string;
  formattedDate?: string;
  time?: string;
  line?: string;
  location?: string;
  image?: string;

  submissions?: {
    userId?: string;
    sectionId?: string;
    type?: string;
    shift?: string;
    incidentDate?: string;
    incidentTime?: string;
    workProcess?: string;
    location?: string;
  };

  hazardAssessment?: {
    currentActivity?: string;
    potentialHazard?: string;
    hazardReason?: string;
    expectedCondition?: string;
    improvementSuggestion?: string;
  };

  hazardReport?: {
    pattern?: string;
    source?: string;
    injured?: string;
    cause?: string;
    category?: string;
    accidentType?: string;
  };

  hazardEvaluation?: {
    accidentLevelId?: string;
    hazardControlLevelId?: string;
    workingFrequencyId?: string;
  };
};

// 2. Context type
interface FormErrorsContextType {
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  updateError: (
    section: keyof Omit<FormErrors, "name" | "noreg" | "shift" | "formattedDate" | "time" | "line" | "location" | "image"> | null,
    key: string,
    error: string | undefined
  ) => void;
  clearAllErrors: () => void;
}

// 3. Create context
const FormErrorsContext = createContext<FormErrorsContextType | undefined>(undefined);

// 4. Provider
export const FormErrorsProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<FormErrors>({
    name: undefined,
    noreg: undefined,
    shift: undefined,
    formattedDate: undefined,
    time: undefined,
    line: undefined,
    location: undefined,
    image: undefined,

    submissions: {
      userId: undefined,
      sectionId: undefined,
      type: undefined,
      shift: undefined,
      incidentDate: undefined,
      incidentTime: undefined,
      workProcess: undefined,
      location: undefined,
    },

    hazardAssessment: {
      currentActivity: undefined,
      potentialHazard: undefined,
      hazardReason: undefined,
      expectedCondition: undefined,
      improvementSuggestion: undefined,
    },

    hazardReport: {
      pattern: undefined,
      source: undefined,
      injured: undefined,
      cause: undefined,
      category: undefined,
      accidentType: undefined,
    },

    hazardEvaluation: {
      accidentLevelId: undefined,
      hazardControlLevelId: undefined,
      workingFrequencyId: undefined,
    }
  });

  const updateError = (
    section: keyof Omit<FormErrors, "name" | "noreg" | "shift" | "formattedDate" | "time" | "line" | "location" | "image"> | null,
    key: string,
    error: string | undefined
  ) => {
    setErrors((prev) => {
      if (section === null) {
        return {
          ...prev,
          [key]: error,
        };
      }

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: error,
        },
      };
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return (
    <FormErrorsContext.Provider value={{ errors, setErrors, updateError, clearAllErrors }}>
      {children}
    </FormErrorsContext.Provider>
  );
};

// 5. Hook to use the context
export const useFormErrors = (): FormErrorsContextType => {
  const context = useContext(FormErrorsContext);
  if (!context) {
    throw new Error("useFormErrors must be used within a FormErrorsProvider");
  }
  return context;
};
