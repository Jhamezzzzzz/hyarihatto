import Template from "./Template";
import ButtonNavigation from "./ButtonNavigation";
import { useRef, useState } from "react";
import { FaCamera, FaImage, FaTimes } from "react-icons/fa";
import { useFormErrors } from "../../../context/FormErrorContext";
import { useFormData } from "../../../context/FormHyarihattoContext";

const Step4FormHyarihatto = () => {
  const { ButtonPrevious, ButtonNext } = ButtonNavigation();
  const { errors, updateError } = useFormErrors()
  const { formData, updateFormData } = useFormData()
  const [showCameraModal, setShowCameraModal] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleRemoveImage = () => {
        updateFormData(null, "image", "")
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        updateError(null, "image", undefined)
        const file = e.target.files[0];
        // const imageUrl = URL.createObjectURL(file);

        
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
        localStorage.setItem("imageFileName", file.name)

    };

    const handleCameraOpen = async () => {
        try {
        setShowCameraModal(true);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        });
        setStream(mediaStream);
        } catch (err) {
        console.error("Gagal membuka kamera:", err);
        alert("Tidak bisa mengakses kamera. Pastikan akses kamera diizinkan dan gunakan HTTPS atau localhost.");
        }
    };

    const handleCaptureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
         const ctx = canvas.getContext('2d');
        if (!ctx) return;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);
            // const imageData = canvas.toDataURL('image/png');
            // setImage({ ...image, url: imageData})
            // setPreviewImage((prev) => [...prev, { url: imageData }]);
            handleCloseCamera();
        }
    };
    const handleCloseCamera = () => {
        stream?.getTracks().forEach((track) => track.stop());
        setShowCameraModal(false);
    };

    const handleGalleryInput = () => {
        galleryInputRef.current?.click();
    };

  return (
    <div>
      <Template showStep step={4}>
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-green-600 text-white text-center py-3">
            <h5 className="text-lg font-semibold">Bukti Kejadian</h5>
          </div>

          <div className="p-6 space-y-4">
            {/* Preview Image */}
            {!formData?.image ? (
              <>
                <div className={`w-full max-w-xl h-72 bg-transparent rounded-lg flex flex-col items-center justify-center mx-auto mb-5 border ${errors.image !== undefined ? "border-error-500" : "border-gray-300"}`}>
                  <FaImage size={52} className="text-secondary1"/>
                  <p className="text-secondary1 text-center">
                    Silakan upload gambar kejadian
                  </p>
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
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h5 className="text-lg font-medium">Ambil Foto</h5>
                    <button
                      onClick={handleCloseCamera}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-4 text-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full max-h-96 bg-black rounded-md"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                  <div className="flex justify-between px-4 py-3 border-t">
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                      onClick={handleCloseCamera}
                    >
                      Batal
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      onClick={handleCaptureImage}
                    >
                      Simpan Gambar
                    </button>
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
