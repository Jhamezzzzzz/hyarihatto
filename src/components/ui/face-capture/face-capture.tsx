import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Button from "../button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import useShowAlert from "../../../hooks/useShowAlert";
import Select from "../../form/Select";

// Define the type for the Webcam component instance to use with the ref

type FaceCapture = {
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
  
  // State to hold the list of video devices
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  // State to track the currently selected device ID
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  // useEffect to get the list of camera devices when the component mounts
  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((device) => device.kind === 'videoinput');
        setVideoDevices(videoInputs);
        if (videoInputs.length > 0) {
          // Set the first camera as the default
          setSelectedDeviceId(videoInputs[0].deviceId);
        }
      } catch (error) {
        console.error("Error enumerating devices:", error);
      }
    };
    getDevices();
  }, []);

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

  // Handle camera selection change
  const handleDeviceChange = (_name: unknown, value: string) => {
    setSelectedDeviceId(value);
  };

  // Video constraints now depend on the selectedDeviceId state
  const videoConstraints = {
    deviceId: selectedDeviceId || undefined, // Use selectedDeviceId or let the browser choose
  };
  
  // Format the video devices for the Select component
  const cameraOptions = videoDevices.map(device => ({
    value: device.deviceId,
    label: device.label || `Camera ${videoDevices.indexOf(device) + 1}`
  }));

  return (
    <div>
      {(!imageWebcam && !deviceError) && (
        <div className="flex justify-center flex-col items-center">
          {/* We only render the Webcam if there is a selectedDeviceId */}
          {selectedDeviceId && (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width={500}
              videoConstraints={videoConstraints}
              onUserMediaError={handleError}
            />
          )}
          
          {/* Select component to switch between cameras */}
          {videoDevices.length > 1 && (
            <Select
              placeholder="Pilih kamera"
              className="w-full mt-4"
              options={cameraOptions}
              defaultValue={selectedDeviceId?.toString()}
              onChange={handleDeviceChange}
            />
          )}

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