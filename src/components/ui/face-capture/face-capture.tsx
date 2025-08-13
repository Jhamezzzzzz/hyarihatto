import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "../button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import useShowAlert from "../../../hooks/useShowAlert";
import Select from "../../form/Select";

// Define the type for the Webcam component instance to use with the ref

type FaceCapture = {
  type: "hyarihatto" | "voice-member";
  setImageFile: (image: string | null) => void,
  handleSubmit: () => void
}

export default function FaceCapture({
  type,
  setImageFile,
  handleSubmit
}: FaceCapture) {
  const webcamRef = useRef<Webcam>(null);
  const { alertError } = useShowAlert()
  const [deviceError, setDeviceError] = useState<boolean>(false)
  const [imageWebcam, setImageWebcam] = useState<string | null>(null)

  const [selectedFacingMode, setSelectedFacingMode] = useState<string>("environment")



  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Check the size of the base64 string
      const base64String = imageSrc.split(',')[1];
      const sizeInBytes = (base64String.length * 0.75) - 2; // Estimate actual size in bytes
      const sizeInMB = sizeInBytes / (1024 * 1024);

      // Check if it's more than 10MB
      if (sizeInMB > 10) {
        alertError("Ukuran capture melebihi 10MB!");
        return;
      }
      
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


  const optionFacingModes = [{
    value: "user",
    label: "Kamera Depan",
  }, {
    value: "environment",
    label: "Kamera Belakang"
  }]
  

  const handleChangeFacingMode = (_name: unknown, value: string) => {
    setSelectedFacingMode(value)
  }

  return (
    <div>
      {(!imageWebcam && !deviceError) && (
        <div className="flex justify-center flex-col items-center">
          {/* We only render the Webcam if there is a selectedDeviceId */}
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width={500}
              videoConstraints={{ facingMode: selectedFacingMode}}
              onUserMediaError={handleError}
            />
          
          {/* Select component to switch between cameras */}
            <Select
              placeholder="Pilih kamera"
              className="w-full mt-4"
              options={optionFacingModes}
              defaultValue={selectedFacingMode}
              onChange={handleChangeFacingMode}
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
            <Button variant={type === "hyarihatto" ? "primary" : "blue"} className="w-full" onClick={handleSubmit}>Submit</Button>
          </div>
        </>
      )}
    </div>
  );
}