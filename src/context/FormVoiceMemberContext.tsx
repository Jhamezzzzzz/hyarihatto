import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

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
    image: "",

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

  // useEffect to initialize the database and load the image
    useEffect(() => {
      const setupDBAndLoadImage = async () => {
        try {
          await initIndexedDB('imagesDB', 'images');
          const imageData = await getSavedImageFromDB('imagesDB', 'images', 2);
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
    section: keyof Pick<FormData, "submissions" | "voiceMember"> | null,
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
        store.put({ id: 2, data: value }); // Assuming you use a fixed key '1'
      };
      setFormData((prev) => ({ ...prev, image: value as string }));
    }
    else if(section === null){
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
    // localStorage.setItem('image', "")
    localStorage.setItem('hour', "")
    localStorage.setItem('minute', "")
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
    updateFormData(null, "image", "")
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
