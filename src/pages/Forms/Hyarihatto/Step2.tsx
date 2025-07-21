import Template from "./Template";
import ButtonNavigation from "./ButtonNavigation";
import TextArea from "../../../components/form/input/TextArea";
import { useFormData } from "../../../context/FormHyarihattoContext";
import { useFormErrors } from "../../../context/FormErrorContext";

const Step2FormHyarihatto = () => {
  const { ButtonPrevious, ButtonNext } = ButtonNavigation();
  const { formData, updateFormData } = useFormData();
  const { errors, updateError } = useFormErrors()

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateError("hazardAssessment", name, undefined)
    updateFormData("hazardAssessment", name, value)
  }

  return (
    <div>
      <Template showStep step={2}>
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-green-600 text-white text-center py-3">
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
                hint={errors.hazardAssessment?.currentActivity}
                error={errors?.hazardAssessment?.currentActivity !== undefined}
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
                hint={errors.hazardAssessment?.potentialHazard}
                error={errors?.hazardAssessment?.potentialHazard !== undefined}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mengapa kondisinya berbahaya seperti itu?{" "}
                <span className="text-red-500">*</span>
              </label>
              <TextArea
                name="hazardReason"
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.hazardAssessment.hazardReason}
                onChange={handleChangeInput}
                hint={errors.hazardAssessment?.hazardReason}
                error={errors?.hazardAssessment?.hazardReason !== undefined}
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">
                Seharusnya kondisinya bagaimana?{" "}
              </p>
              <label className="block text-sm text-gray-500 mb-1">
                a. Harapan yang diinginkan <span className="text-red-500">*</span>
              </label>
              <TextArea
                name="expectedCondition"
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.hazardAssessment.expectedCondition}
                onChange={handleChangeInput}
                hint={errors.hazardAssessment?.expectedCondition}
                error={errors?.hazardAssessment?.expectedCondition !== undefined}
              />
              <label className="block text-sm text-gray-500 mb-1">
                b. Usulan yang diinginkan
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
      </Template>
    </div>
  );
};

export default Step2FormHyarihatto;
