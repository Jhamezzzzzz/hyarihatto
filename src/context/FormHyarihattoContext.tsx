import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// 1. Define the type
type FormHyarihatto = {
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
interface FormHyarihattoContextType {
  formData: FormHyarihatto;
  setFormData: React.Dispatch<React.SetStateAction<FormHyarihatto>>;
  updateFormData: (section: keyof Pick<FormHyarihatto, "submissions" | "hazardAssessment" | "hazardReport" | "hazardEvaluation"> | null, key: string, value: string | number | null) => void;
  clearAllLocal: () => void
}

// 3. Create context
const FormHyarihattoContext = createContext<FormHyarihattoContextType | undefined>(undefined);

// Utils to initialize IndexedDB
const initIndexedDB = (dbName: string, storeName: string): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

// Utils Get saved image from IndexedDB
const getSavedImageFromDB = (dbName: string, storeName: string, key: IDBValidKey): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);
    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const getRequest = store.get(key);
      getRequest.onsuccess = () => {
        resolve(getRequest.result?.data || null);
      };
      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    };
    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

// 4. Provider
export const FormHyarihattoProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormHyarihatto>({
    name: localStorage.getItem("hyarihatto.name") || "",
    noreg: localStorage.getItem("hyarihatto.noreg") || "",
    lineName: localStorage.getItem("hyarihatto.lineName") || "",
    sectionName: localStorage.getItem("hyarihatto.sectionName") || "",
    shift: localStorage.getItem("hyarihatto.submissions.shift") || "",
    formattedDate: localStorage.getItem("hyarihatto.formattedDate") || "",
    time: "",
    line: "",
    location: "",
    image: "",

    submissions: {
      userId: Number(localStorage.getItem("hyarihatto.submissions.userId")) || null,
      lineId: Number(localStorage.getItem("hyarihatto.submissions.lineId")) || null,
      sectionId: Number(localStorage.getItem("hyarihatto.submissions.sectionId")) || null,
      type: "hyarihatto",
      shift: localStorage.getItem("hyarihatto.submissions.shift") || "",
      incidentDate: localStorage.getItem("hyarihatto.submissions.incidentDate") || "",
      incidentTime: localStorage.getItem("hyarihatto.submissions.incidentTime") || "",
      location: localStorage.getItem("hyarihatto.submissions.location") || "",
    },

    hazardAssessment: {
      currentActivity: localStorage.getItem("hyarihatto.hazardAssessment.currentActivity") || "",
      potentialHazard: localStorage.getItem("hyarihatto.hazardAssessment.potentialHazard") || "",
      hazardReason: localStorage.getItem("hyarihatto.hazardAssessment.hazardReason") || "",
      expectedCondition: localStorage.getItem("hyarihatto.hazardAssessment.expectedCondition") || "",
      improvementSuggestion: localStorage.getItem("hyarihatto.hazardAssessment.improvementSuggestion") || "",
    },

    hazardReport: {
      pattern: localStorage.getItem("hyarihatto.hazardReport.pattern") || "",
      source: localStorage.getItem("hyarihatto.hazardReport.source") || "",
      injured: localStorage.getItem("hyarihatto.hazardReport.injured") || "",
      cause: localStorage.getItem("hyarihatto.hazardReport.cause") || "",
      category: localStorage.getItem("hyarihatto.hazardReport.category") || "",
      accidentType: localStorage.getItem("hyarihatto.hazardReport.accidentType") || "",
    },

    hazardEvaluation: {
      accidentLevelId: Number(localStorage.getItem("hyarihatto.hazardEvaluation.accidentLevelId")) || null,
      hazardControlLevelId: Number(localStorage.getItem("hyarihatto.hazardEvaluation.hazardControlLevelId")) || null,
      workingFrequencyId: Number(localStorage.getItem("hyarihatto.hazardEvaluation.workingFrequencyId")) || null,
    },
  });

  // useEffect to initialize the database and load the image
  useEffect(() => {
    const setupDBAndLoadImage = async () => {
      try {
        await initIndexedDB('imagesDB', 'images');
        const imageData = await getSavedImageFromDB('imagesDB', 'images', 1);
        if (imageData) {
          setFormData((prev) => ({
            ...prev,
            image: imageData,
          }));
        }
      } catch (error) {
        console.error('Failed to set up IndexedDB or load image:', error);
      }
    };
    setupDBAndLoadImage();
  }, []); // Run only once on mount

  // 5. Helper to update nested formData and localStorage
  const updateFormData = (
    section: keyof Pick<FormHyarihatto, "submissions" | "hazardAssessment" | "hazardReport" | "hazardEvaluation"> | null,
    key: string,
    value: string | number | null
  ) => {
    // Check if the key is 'image'
    if (key.includes('image')) {
      console.log("Updating image in formData:", value);
      // Use IndexedDB to save the image data
      const dbRequest = indexedDB.open('imagesDB', 1);
      dbRequest.onsuccess = (event) => {
        const db = (event.target as IDBRequest).result;
        const transaction = db.transaction(['images'], 'readwrite');
        const store = transaction.objectStore('images');
        store.put({ id: 1, data: value }); // Assuming you use a fixed key '1'
      };
      setFormData((prev) => ({ ...prev, image: value as string }));
    }
    else if(section === null){
      setFormData((prev) => {
        const updatedSection = {
          ...prev,
          [key]: value,
        };
        localStorage.setItem(`hyarihatto.${key}`, String(value));
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
  
        localStorage.setItem(`hyarihatto.${section}.${key}`, String(value));
        return updatedFormData;
      });
    }
  };

  const clearAllLocal = () => {
    localStorage.setItem('hyarihatto.noreg', "")
    localStorage.setItem('hyarihatto.name', "")
    localStorage.setItem('hyarihatto.line', "")
    localStorage.setItem('hyarihatto.section', "")
    localStorage.setItem('hyarihatto.formattedDate', "")
    // localStorage.setItem('hyarihatto.image', "")
    localStorage.setItem('hyarihatto.hour', "")
    localStorage.setItem('hyarihatto.minute', "")
    localStorage.setItem('hyarihatto.submissions.userId', "")
    localStorage.setItem('hyarihatto.submissions.lineId', "")
    localStorage.setItem('hyarihatto.submissions.sectionId', "")
    localStorage.setItem('hyarihatto.submissions.shift', "")
    localStorage.setItem('hyarihatto.submissions.incidentDate', "")
    localStorage.setItem('hyarihatto.submissions.incidentTime', "")
    localStorage.setItem('hyarihatto.submissions.location', "")
    localStorage.setItem('hyarihatto.hazardAssessment.currentActivity', "")
    localStorage.setItem('hyarihatto.hazardAssessment.potentialHazard', "")
    localStorage.setItem('hyarihatto.hazardAssessment.hazardReason', "")
    localStorage.setItem('hyarihatto.hazardAssessment.expectedCondition', "")
    localStorage.setItem('hyarihatto.hazardAssessment.improvementSuggestion', "")
    localStorage.setItem('hyarihatto.hazardReport.pattern', "")
    localStorage.setItem('hyarihatto.hazardReport.source', "")
    localStorage.setItem('hyarihatto.hazardReport.injured', "")
    localStorage.setItem('hyarihatto.hazardReport.cause', "")
    localStorage.setItem('hyarihatto.hazardReport.category', "")
    localStorage.setItem('hyarihatto.hazardReport.accidentType', "")
    localStorage.setItem('hyarihatto.hazardEvaluation.accidentLevelId', "")
    localStorage.setItem('hyarihatto.hazardEvaluation.hazardControlLevelId', "")
    localStorage.setItem('hyarihatto.hazardEvaluation.workingFrequencyId', "")
    updateFormData(null, "image", "")
  }

  return (
    <FormHyarihattoContext.Provider value={{ formData, setFormData, updateFormData, clearAllLocal }}>
      {children}
    </FormHyarihattoContext.Provider>
  );
};

// 6. Hook to use in components
export const useFormHyarihatto = (): FormHyarihattoContextType => {
  const context = useContext(FormHyarihattoContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
