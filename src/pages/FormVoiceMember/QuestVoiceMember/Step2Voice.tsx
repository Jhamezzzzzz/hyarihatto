import TemplateVoiceMember from "./TemplateVoiceMember";
import ButtonNavigation from "./ButtonVoice";
import TextArea from "../../../components/form/input/TextArea";
import { useFormData } from "../../../context/FormVoiceMemberContext";
import { useFormErrors } from "../../../context/FormErrorContext";

const Step2FormVoiceMember = () => {
  const { ButtonPrevious, ButtonNext } = ButtonNavigation();
  const { formData, updateFormData } = useFormData();
  const { errors, updateError } = useFormErrors()

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateError("voiceMember", name, undefined)
    updateFormData("voiceMember", name, value)
  }

  return (
    <div>
      <TemplateVoiceMember showStep step={2}>
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-blue-600 text-white text-center py-3">
            <h5 className="text-lg font-semibold">Catatan</h5>
          </div>

          <div className="p-6 space-y-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400">
                Apa yang sedang dilakukan?{" "}
                <span className="text-red-500">*</span>
              </label>
              <TextArea
                name="currentActivity"
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.voiceMember.currentActivity}
                onChange={handleChangeInput}
                hint={errors?.voiceMember?.currentActivity}
                error={errors?.voiceMember?.currentActivity !== undefined}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400">
                Apa kendala yang dihadapi?*{" "}
                <span className="text-red-500">*</span>
              </label>
              <TextArea
                name="issue"
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.voiceMember.issue}
                onChange={handleChangeInput}
                hint={errors?.voiceMember?.issue}
                error={errors?.voiceMember?.issue !== undefined}
              />
            </div>
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400">
                Seharusnya kondisinya bagaimana?{" "}
              </p>
              <label className="block text-sm text-gray-500 mb-1 dark:text-gray-500">
                a. Harapan yang diinginkan <span className="text-red-500">*</span>
              </label>
              <TextArea
                name="expectedCondition"
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.voiceMember.expectedCondition}
                onChange={handleChangeInput}
                hint={errors?.voiceMember?.expectedCondition}
                error={errors?.voiceMember?.expectedCondition !== undefined}
              />
              <label className="block text-sm text-gray-500 mb-1 dark:text-gray-500">
                b. Usulan yang diinginkan
              </label>
              <TextArea
                name="improvementSuggestion"
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.voiceMember.improvementSuggestion}
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

export default Step2FormVoiceMember;
