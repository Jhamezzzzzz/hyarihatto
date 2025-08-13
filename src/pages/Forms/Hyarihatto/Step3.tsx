import Template from "./Template";
import ButtonNavigation from "./ButtonNavigation";
import RadioGroup from "../../../components/form/input/RadioGroup";
import StaticOptions from "../../../utils/StaticOptions";
// import { useFormData } from "../../../context/FormVoiceMemberContext";
import { useFormHyarihatto } from "../../../context/FormHyarihattoContext";
import { useFormErrors } from "../../../context/FormErrorContext";

type FormDataKey = {
  submissions: string
  hazardAssessment: string
  hazardReport: string
  hazardEvaluation: string
};

const Step3FormHyarihatto = () => {
  const { ButtonPrevious, ButtonNext } = ButtonNavigation();
  const { 
    optionsHyarihattoHazardType, 
    optionsHyarihattoHazardSource, 
    optionsHyarihattoHazardCategory, 
    optionsHyarihattoHazardCause, 
    optionsHyarihattoHazardInjured,
  } = StaticOptions()

  const { formData, updateFormData } = useFormHyarihatto()
  const { errors, updateError } = useFormErrors()

  const handleChangeRadio = (option: string, group: keyof FormDataKey, name: string) => {
    updateError(group, name, undefined)
    updateFormData(group, name, option)
  }
    
  return (
    <div>
      <Template showStep step={3}>
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-green-600 text-white text-center py-3">
            <h5 className="text-lg font-semibold">Tingkat Catatan</h5>
          </div>

          <div className="p-6 space-y-4">
            {/* Row 1: Jenis & Sumber */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Jenis */}
              <div className="bg-white dark:bg-gray-900 shadow rounded-lg border dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-300 px-3 py-2 text-center rounded-t-lg">
                  <h5 className="font-medium">
                    Jenis <span className="text-red-500">*</span>
                  </h5>
                </div>
                <div className="p-3 space-y-2">
                  <RadioGroup
                    options={optionsHyarihattoHazardType}
                    onChange={(option) =>
                      handleChangeRadio(option, "hazardReport", "pattern")
                    }
                    group="hazardReport"
                    name="pattern"
                    value={formData.hazardReport.pattern}
                    hint={errors.hazardReport?.pattern}
                    error={errors?.hazardReport?.pattern !== undefined}
                  />
                </div>
              </div>

              {/* Sumber */}
              <div className="bg-white dark:bg-gray-900 shadow rounded-lg border dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-300 px-3 py-2 text-center rounded-t-lg">
                  <h5 className="font-medium">
                    Sumber & Akibat <span className="text-red-500">*</span>
                  </h5>
                </div>
                <div className="p-3 space-y-2">
                  <RadioGroup
                    options={optionsHyarihattoHazardSource}
                    onChange={(option) =>
                      handleChangeRadio(option, "hazardReport", "source")
                    }
                    group="hazardReport"
                    name="source"
                    value={formData.hazardReport.source}
                    hint={errors.hazardReport?.source}
                    error={errors?.hazardReport?.source !== undefined}
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Terluka, Sebab, Kategori */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Terluka */}
              <div className="bg-white dark:bg-gray-900 shadow rounded-lg border dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-300 px-3 py-2 text-center rounded-t-lg">
                  <h5 className="font-medium">
                    Terluka <span className="text-red-500">*</span>
                  </h5>
                </div>
                <div className="p-3 space-y-2">
                  <RadioGroup
                    options={optionsHyarihattoHazardInjured}
                    onChange={(option) =>
                      handleChangeRadio(option, "hazardReport", "injured")
                    }
                    group="hazardReport"
                    name="injured"
                    value={formData.hazardReport.injured}
                    hint={errors.hazardReport?.injured}
                    error={errors?.hazardReport?.injured !== undefined}
                  />
                </div>
              </div>

              {/* Sebab */}
              <div className="bg-white dark:bg-gray-900 shadow rounded-lg border dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-300 px-3 py-2 text-center rounded-t-lg">
                  <h5 className="font-medium">
                    Sebab <span className="text-red-500">*</span>
                  </h5>
                </div>
                <div className="p-3 space-y-2">
                  <RadioGroup
                    options={optionsHyarihattoHazardCause}
                    onChange={(option) =>
                      handleChangeRadio(option, "hazardReport", "cause")
                    }
                    group="hazardReport"
                    name="cause"
                    value={formData.hazardReport.cause}
                    hint={errors.hazardReport?.cause}
                    error={errors?.hazardReport?.cause !== undefined}
                  />
                </div>
              </div>

              {/* Kategori */}
              <div className="bg-white dark:bg-gray-900 shadow rounded-lg border dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-300 px-3 py-2 text-center rounded-t-lg">
                  <h5 className="font-medium">
                    Kategori <span className="text-red-500">*</span>
                  </h5>
                </div>
                <div className="p-3 space-y-2">
                  <RadioGroup
                    options={optionsHyarihattoHazardCategory}
                    onChange={(option) =>
                      handleChangeRadio(option, "hazardReport", "category")
                    }
                    group="hazardReport"
                    name="category"
                    value={formData.hazardReport.category}
                    hint={errors.hazardReport?.category}
                    error={errors?.hazardReport?.category !== undefined}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              {ButtonPrevious(2)}
              {ButtonNext(4)}
            </div>
          </div>
        </div>
      </Template>
    </div>
  );
};

export default Step3FormHyarihatto;
