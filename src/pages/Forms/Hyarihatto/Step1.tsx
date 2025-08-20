import Template from "./Template";
import DatePicker from "../../../components/form/date-picker";
import Input from "../../../components/form/input/InputField";
import ButtonNavigation from "./ButtonNavigation";
// import { useFormData } from "../../../context/FormVoiceMemberContext";
import { useFormHyarihatto } from "../../../context/FormHyarihattoContext";
import { useState } from "react";
import { useFormErrors } from "../../../context/FormErrorContext";

const Step1FormHyarihatto = () => {
  const { ButtonPrevious, ButtonNext } = ButtonNavigation();
  const { formData, updateFormData } = useFormHyarihatto();
  const { errors, updateError } = useFormErrors();
  const [formattedDate, setFormattedDate] = useState(
    localStorage.getItem("hyarihatto.formattedDate") || ""
  );
  const [hour, setHour] = useState(
    localStorage.getItem("hyarihatto.hour") || ""
  );
  const [minute, setMinute] = useState(
    localStorage.getItem("hyarihatto.minute") || ""
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateError("submissions", name, undefined);
    updateFormData("submissions", name, value);
  };

  const handleChangeDate = (date: Date[]) => {
    const dateString = new Date(date[0]).toLocaleDateString("en-CA");
    const formattedDate = new Date(date[0])
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    updateError("submissions", "incidentDate", undefined);
    updateFormData("submissions", "incidentDate", dateString);
    setFormattedDate(formattedDate);
    localStorage.setItem("hyarihatto.formattedDate", formattedDate);
  };

  const handleChangeTimeHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHour(value);
    updateError("submissions", "incidentTime", undefined);
    localStorage.setItem("hyarihatto.hour", value);
    const timeFormatted = `${value}:${minute}`;
    updateFormData("submissions", "incidentTime", timeFormatted);
    if (value === "" && minute === "") {
      updateFormData("submissions", "incidentTime", "");
    }
  };

  const handleChangeTimeMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMinute(value);
    updateError("submissions", "incidentTime", undefined);
    localStorage.setItem("hyarihatto.minute", value);
    const timeFormatted = `${hour}:${value}`;
    updateFormData("submissions", "incidentTime", timeFormatted);
    if (hour === "" && value === "") {
      updateFormData("submissions", "incidentTime", "");
    }
  };

  const addZeroFormat = (value: string) => {
    return value.length === 1 ? `0${value}` : value;
  };

  const handleBlurHour = (e: React.FocusEvent<HTMLInputElement>) => {
    updateError(null, hour, undefined);
    const { value } = e.target;
    let blurredValue = addZeroFormat(value);
    if (Number(value) > 23) {
      setHour("23");
      blurredValue = "23";
    }
    if (Number(value) < 0) {
      setHour("00");
      blurredValue = "00";
    }
    if (blurredValue === "" || minute === "") {
      setHour(blurredValue);
      localStorage.setItem("hour", blurredValue);
      updateFormData("submissions", "incidentTime", "");
    } else {
      setHour(blurredValue);
      localStorage.setItem("hyarihatto.hour", blurredValue);
      const timeFormatted = `${blurredValue}:${minute}`;
      updateFormData("submissions", "incidentTime", timeFormatted);
    }
  };

  const handleBlurMinute = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let blurredValue = addZeroFormat(value);
    if (Number(value) > 59) {
      setMinute("59");
      blurredValue = "59";
    }
    if (Number(value) < 0) {
      setMinute("00");
      blurredValue = "00";
    }
    if (hour === "" || blurredValue === "") {
      setMinute(blurredValue);
      localStorage.setItem("minute", blurredValue);
      updateFormData("submissions", "incidentTime", "");
    } else {
      setMinute(blurredValue);
      localStorage.setItem("hyarihatto.minute", blurredValue);
      const timeFormatted = `${hour}:${blurredValue}`;
      updateFormData("submissions", "incidentTime", timeFormatted);
    }
  };

  return (
    <div>
      <Template showStep step={1}>
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-xl">
          <div className="bg-green-600 text-white text-center py-3 rounded-t-xl">
            <h5 className="text-lg font-semibold">Waktu & Lokasi</h5>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Tanggal:<span className="text-red-500">*</span>
              </label>
              <DatePicker
                id="incidentDate"
                defaultDate={formattedDate}
                onChange={handleChangeDate}
                dateFormat="d-M-Y"
                placeholder="Pilih tanggal kejadian"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                hint={errors.submissions?.incidentDate}
                error={errors?.submissions?.incidentDate !== undefined}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Waktu:<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="hour"
                  type="number"
                  name="hour"
                  max="23"
                  min="0"
                  onChange={handleChangeTimeHour}
                  value={hour}
                  onBlur={handleBlurHour}
                  error={errors?.submissions?.incidentTime !== undefined}
                  hint={errors?.submissions?.incidentTime}
                />
                <p
                  className={`${
                    errors?.submissions?.incidentTime !== undefined
                      ? "mb-6"
                      : "mb-0"
                  }`}
                >
                  :
                </p>
                <Input
                  id="minute"
                  type="number"
                  name="minute"
                  max="59"
                  min="0"
                  onChange={handleChangeTimeMinute}
                  value={minute}
                  onBlur={handleBlurMinute}
                  error={errors?.submissions?.incidentTime !== undefined}
                  hint={errors?.submissions?.incidentTime}
                />
                <p
                  className={`${
                    errors?.submissions?.incidentTime !== undefined
                      ? "mb-6"
                      : "mb-0"
                  }`}
                >
                  WIB
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Lokasi:<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="location"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Contoh: Area 3"
                value={formData.submissions.location}
                onChange={handleChangeInput}
                hint={errors.submissions?.location}
                error={errors.submissions?.location !== undefined}
              />
            </div>
            <div className="flex justify-end gap-4">
              {ButtonPrevious(0)}
              {ButtonNext(2)}
            </div>
          </div>
        </div>
      </Template>
    </div>
  );
};

export default Step1FormHyarihatto;
