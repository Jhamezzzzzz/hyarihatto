import Template from "./TemplateVoiceMember";
import DatePicker from "../../../components/form/date-picker";
import Input from "../../../components/form/input/InputField";
import ButtonVoice from "./ButtonVoice";
import { useFormData } from "../../../context/FormHyarihattoContext";
import { useState } from "react";
import { useFormErrors } from "../../../context/FormErrorContext";

const Step1FormVoiceMember = () => {
  const { ButtonPrevious, ButtonNext } = ButtonVoice();
   const { formData, updateFormData } = useFormData();
   const { errors, updateError } = useFormErrors()
   const [formattedDate, setFormattedDate] = useState(localStorage.getItem("formattedDate") || "")

   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateError("submissions", name, undefined)
    updateFormData("submissions", name, value)
   }

   const handleChangeDate = (date: Date[]) => {
        const dateString = new Date(date[0]).toLocaleDateString('en-CA')
        const formattedDate = new Date(date[0]).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).replace(/ /g, '-');

         updateError("submissions", "incidentDate", undefined)
        updateFormData("submissions", "incidentDate", dateString)
        setFormattedDate(formattedDate)
        localStorage.setItem("formattedDate", formattedDate)
    };

  const handleChangeTime = (date: Date[]) => {
        const stringTime = date[0].toLocaleTimeString("id-ID").replace(".", ":").slice(0, 5)
         updateError("submissions", "incidentTime", undefined)
        updateFormData("submissions", "incidentTime", stringTime)
    }
  
  return (
    <div>
      <Template showStep step={1}>
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl">
          <div className="bg-blue-600 text-white text-center py-3 rounded-t-xl">
            <h5 className="text-lg font-semibold">Waktu & Lokasi</h5>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal:<span className="text-red-500">*</span>
              </label>
              <DatePicker
                id="incidentDate"
                defaultDate={formattedDate}
                onChange={handleChangeDate}
                dateFormat="d-M-Y"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                hint={errors.submissions?.incidentDate}
                error={errors?.submissions?.incidentDate !== undefined}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Waktu:<span className="text-red-500">*</span>
              </label>
              <DatePicker
                id="incidentTime"
                mode="time"
                dateFormat="H:i"
                defaultDate={formData.submissions.incidentTime}
                onChange={handleChangeTime}
                hint={errors.submissions?.incidentTime}
                error={errors?.submissions?.incidentTime !== undefined}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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

export default Step1FormVoiceMember;
