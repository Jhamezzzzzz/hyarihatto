// src/FaceCapture.js
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "../button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import useShowAlert from "../../../hooks/useShowAlert";

type FaceCapture ={ 
    setImageFile: (image: string | null) => void,
    handleSubmit: () => void
}
export default function FaceCapture({ 
    setImageFile, 
    handleSubmit
}: FaceCapture) {
  const webcamRef = useRef<Webcam>(null);
  const { alertError } = useShowAlert()
  const [deviceError, setDeviceError] = useState<boolean>(false)
  const [imageWebcam, setImageWebcam] = useState<string | null>(null)

   const captureImage = () => {
    // Corrected: Add an optional chaining operator to safely call getScreenshot
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageFile(imageSrc);
      setImageWebcam(imageSrc);
    }
  };

  const retakeImage = () => {
      setImageFile(null)
      setImageWebcam(null)
  }

  const handleError = (error: unknown) => {
    console.log("Error camera device", error)
    setDeviceError(true)
    alertError("Can't use camera device over HTTP!")
  }

  return (
    <div>
        {(!imageWebcam && !deviceError) && (
            <div className="flex justify-center flex-col items-center">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  width={500}
                  videoConstraints={{ facingMode: "user" }}
                  onUserMediaError={handleError}
                />
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
            <Button variant="primary" className="w-full" onClick={handleSubmit}>Submit</Button>
          </div>
        </>
      )}
    </div>
  );
}
