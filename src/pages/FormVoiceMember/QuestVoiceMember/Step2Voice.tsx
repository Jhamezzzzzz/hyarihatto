import TemplateVoiceMember from "./TemplateVoiceMember";
import ButtonNavigation from "./ButtonVoice";
import TextArea from "../../../components/form/input/TextArea";
import { useFormData } from "../../../context/FormHyarihattoContext";

const Step2FormHyarihatto = () => {
  const { ButtonPrevious, ButtonNext } = ButtonNavigation();
  const { formData, updateFormData } = useFormData();

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData("hazardAssessment", name, value)
  }

  return (
    <div>
      <TemplateVoiceMember showStep step={2}>
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-blue-600 text-white text-center py-3">
            <h5 className="text-lg font-semibold">Catatan</h5>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apa yang sedang dilakukan?{" "}
                <span className="text-red-500">*</span>
              </label>
              <TextArea
                name="currentActivity"
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.hazardAssessment.currentActivity}
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Potensi bahaya apa yang akan timbul{" "}
                <span className="text-red-500">*</span>
              </label>
              <TextArea
                name="potentialHazard"
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.hazardAssessment.potentialHazard}
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mengapa kondisinya berbahaya seperti itu?{" "}
                <span className="text-red-500">*</span>
              </label>
              <TextArea
                name="expectedCondition"
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.hazardAssessment.expectedCondition}
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seharusnya kondisinya bagaimana?{" "}
                <span className="text-red-500">*</span>
              </label>
              <label className="block text-sm text-gray-500 mb-1">
                Tuliskan Harapan / Usulan perbaikan Anda
              </label>
              <TextArea
                name="improvementSuggestion"
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.hazardAssessment.improvementSuggestion}
                onChange={handleChangeInput}
              />
            </div>

            <div className="flex justify-end gap-4">
              {ButtonPrevious(1)}
              {ButtonNext(3)}
            </div>
          </div>
        </div>
      </TemplateVoiceMember>
    </div>
  );
};

export default Step2FormHyarihatto;
