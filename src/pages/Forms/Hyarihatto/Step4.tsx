import Template from "./Template";
import ButtonNavigation from "./ButtonNavigation";
import { useRef, useState } from "react";
import { FaCamera, FaImage, FaTimes } from "react-icons/fa";
import { useFormErrors } from "../../../context/FormErrorContext";
import { useFormHyarihatto } from "../../../context/FormHyarihattoContext";
import FaceCapture from "../../../components/ui/face-capture/face-capture";
import useShowAlert from "../../../hooks/useShowAlert";

const Step4FormHyarihatto = () => {
  const { ButtonPrevious, ButtonNext } = ButtonNavigation();
  const { errors, updateError } = useFormErrors()
  const { formData, updateFormData } = useFormHyarihatto()
  const [showCameraModal, setShowCameraModal] = useState<boolean>(false);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const { alertError } = useShowAlert()

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleRemoveImage = () => {
        updateFormData(null, "image", "")
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        if (!e.target.files) return;
        
        updateError(null, "image", undefined)
        const file = e.target.files[0];

        // Check the size of the file directly
        const sizeInMB = file.size / (1024 * 1024);
        
        const MAX_SIZE_MB = 10;
        
        if (sizeInMB > MAX_SIZE_MB) {
            alertError("Ukuran file gambar tidak boleh lebih dari 10MB.");
            // Optionally, reset the input to clear the selected file
            e.target.value = ""; 
            return;
        }

        // Convert to Base64 and store
        const toBase64 = (file: File): Promise<string> =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
            });
            
        const base64Image = await toBase64(file);

        // Show preview
        updateFormData(null, "image", base64Image)
        localStorage.setItem("hyarihatto.imageFileName", file.name)
        
      } catch (error) {
        console.error("Error reading file:", error);
        alertError("Terjadi kesalahan saat membaca file gambar.");
      }

    };

    const handleSubmitCapture = async(image: string | null) => {
      updateFormData(null, "image", image)
      localStorage.setItem("hyarihatto.imageFileName", `hyarihatto-proof-${new Date()}`)
      setShowCameraModal(false)
    }

    const handleCameraOpen = async () => {
        setShowCameraModal(true); // Tampilkan modal setelah dapat stream
    };
    
    

    const handleGalleryInput = () => {
        galleryInputRef.current?.click();
    };

  return (
    <div>
      <Template showStep step={4}>
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-green-600 text-white text-center py-3">
            <h5 className="text-lg font-semibold">Bukti Kejadian</h5>
          </div>

          <div className="p-6 space-y-4">
            {/* Preview Image */}
            {!formData?.image ? (
              <>
                <div className={`w-full max-w-xl h-72 bg-transparent rounded-lg flex flex-col items-center justify-center mx-auto mb-5 border dark:border-gray-700 ${errors.image !== undefined ? "border-error-500!" : "border-gray-300"}`}>
                  <FaImage size={52} className="text-secondary1"/>
                  <p className="text-secondary1 text-center">
                    Silakan upload gambar kejadian
                  </p>
                  <p className="text-secondary1">Pastikan ukuran gambar tidak lebih dari 10MB</p>
                </div>
                { errors.image !== undefined && <p className="ml-6 text-error-500">Gambar tidak boleh kosong!</p>}
              </>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className={`relative w-100 h-100 rounded-lg border border-gray-300 overflow-hidden`}>
                  <img
                    src={formData?.image}
                    alt={`img-preview`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Tombol Upload */}
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={handleGalleryInput}
                className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition"
              >
                <FaImage />
                Ambil Galeri
              </button>
              <button
                onClick={handleCameraOpen}
                className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
              >
                <FaCamera />
                Ambil Kamera
              </button>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={galleryInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            
            {/* Modal Kamera */}
            {showCameraModal && (
              <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-25 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-lg shadow-lg overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
                    <h5 className="text-lg font-medium dark:text-gray-200">Ambil Foto</h5>
                    <button
                      onClick={()=>setShowCameraModal(false)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-5">
                    <FaceCapture type="hyarihatto" setImageFile={setPreviewImage} handleSubmit={()=>handleSubmitCapture(previewImage)} />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              {ButtonPrevious(3)}
              {ButtonNext(5)}
            </div>
          </div>
        </div>
      </Template>
    </div>
  );
};

export default Step4FormHyarihatto;
