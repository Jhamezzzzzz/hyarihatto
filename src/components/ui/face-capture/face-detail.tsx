import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "../button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import useShowAlert from "../../../hooks/useShowAlert";
// import Select from "../../form/Select";
import { MdCameraFront, MdCameraRear } from "react-icons/md";



type FaceDetailProps = {
  type: "hyarihatto" | "voice-member";
  setFileImage: React.Dispatch<React.SetStateAction<File | null>>;   // 👉 buat API submit
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>; // 👉 buat <img />
  handleSubmit: () => void;
    onClose: () => void;
};

export default function FaceDetail({
  type,
  setFileImage,
  setPreviewImage,
  handleSubmit,
  onClose,
}: FaceDetailProps) {
  const webcamRef = useRef<Webcam>(null);
  const { alertError } = useShowAlert()
  const [deviceError, setDeviceError] = useState<boolean>(false)
  const [imageWebcam, setImageWebcam] = useState<string | null>(null)
  const [selectedFacingMode, setSelectedFacingMode] = useState<string>("environment")
  const [fileImage, setLocalFileImage] = useState<File | null>(null);


  const stopCamera = () => {
    const stream = webcamRef.current?.stream as MediaStream | undefined;
    stream?.getTracks().forEach((track) => track.stop());
  };

const captureImage = () => {
  const imageSrc = webcamRef.current?.getScreenshot();
  if (!imageSrc) return;

  const base64String = imageSrc.split(",")[1];
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new File([byteArray], `proof_${Date.now()}.png`, {
    type: "image/png",
  });

  setLocalFileImage(file);   // ✅ simpan lokal untuk submit
  setFileImage(file);        // ✅ kirim ke parent
  setPreviewImage(imageSrc); // ✅ kirim ke parent
  setImageWebcam(imageSrc);  // ✅ tampilkan preview
};


const handleFinalSubmit = () => {
  if (fileImage) {
    handleSubmit();  // pakai fileImage dari parent (sudah dikirim lewat setFileImage)
  }
  stopCamera();
  onClose();
};





  const retakeImage = () => {
    setFileImage(null);
    setPreviewImage(null);
    setImageWebcam(null);
  };

  const handleError = (error: unknown) => {
    console.log("Error camera device", error)
    setDeviceError(true)
    alertError("Can't use camera device over HTTP!")
  }



  // const optionFacingModes = [{
  //   value: "user",
  //   label: "Kamera Depan",
  //   icon: <MdCameraFront />
  // }, {
  //   value: "environment",
  //   label: "Kamera Belakang",
  //   icon: <MdCameraRear />
  // }]

 const toggleCamera = () => {
    setSelectedFacingMode((prev) =>
      prev === "user" ? "environment" : "user"
    );
  };

  return (
    <div>
      {(!imageWebcam && !deviceError) && (
        <div className="flex justify-center flex-col items-center">
          {/* We only render the Webcam if there is a selectedDeviceId */}
          <div className="relative">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width={500}
              videoConstraints={{ facingMode: selectedFacingMode}}
              onUserMediaError={handleError}
            />
          {/* Select component to switch between cameras */}
           <button
            onClick={toggleCamera}
            className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            {selectedFacingMode === "user" ? (
              <MdCameraFront size={24} />
            ) : (
              <MdCameraRear size={24} />
            )}
          </button>
         </div>
          <Button className="w-full mt-4" variant="blue" onClick={captureImage}>Ambil</Button>
        </div>
      )}
      {deviceError && (
        <div className="flex flex-col items-center justify-center gap-2 p-10">
          <FontAwesomeIcon icon={faSadTear} className="text-5xl text-gray-300"/>
          <p className="text-gray-400">Tidak bisa membuka kamera</p>
        </div>
      )}
      {imageWebcam && (
        <>
          <div className="flex justify-center items-center">
            <img src={imageWebcam} alt="Captured" width="500" />
          </div>
          <div className="flex items-center justify-between gap-4 mt-4">
            <Button variant="outline" className="w-full" onClick={retakeImage}>Ambil ulang</Button>
            <Button variant={type === "hyarihatto" ? "primary" : "blue"} className="w-full"  onClick={handleFinalSubmit}>Submit</Button>
          </div>
        </>
      )}
    </div>
  );
}