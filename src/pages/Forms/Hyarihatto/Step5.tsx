import Template from './Template'
import ButtonNavigation from './ButtonNavigation'
import RadioGroup from '../../../components/form/input/RadioGroup'
import StaticOptions from '../../../utils/StaticOptions'
// import { useFormData } from '../../../context/FormVoiceMemberContext'
import { useFormHyarihatto } from '../../../context/FormHyarihattoContext'
import { useFormErrors } from '../../../context/FormErrorContext'

const Step5FormHyarihatto = () => {
    const { ButtonPrevious, ButtonNext } = ButtonNavigation()
    const { optionsHyarihattoAccidentType } = StaticOptions()
    const { formData, updateFormData } = useFormHyarihatto()
    const { errors, updateError } = useFormErrors()

    const handleChangeRadio = (option: string) => {
        updateError("hazardReport", "accidentType", undefined)
        updateFormData("hazardReport", "accidentType", option)
    }

  return (
    <div>
        <Template showStep step={5}>
            <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-xl overflow-hidden border dark:border-gray-700">
                <div className="bg-green-600 text-white text-center py-3">
                    <h5 className="text-lg font-semibold">Tipe Kecelakaan [Stop 6 + alpha]</h5>
                </div>

                <div className="p-6 space-y-4">
                    <p className="mb-3 dark:text-gray-300">Silakan pilih salah satu:</p>
                    <RadioGroup
                        options={optionsHyarihattoAccidentType}
                        onChange={handleChangeRadio}
                        group='hazardReport'
                        name='accidentType'
                        value={formData.hazardReport.accidentType}
                        hint={errors?.hazardReport?.accidentType}
                        error={errors?.hazardReport?.accidentType !== undefined}
                    />
                    <div className='flex justify-end gap-4'>
                        { ButtonPrevious(4) }
                        { ButtonNext(6) }
                    </div>
                </div>
            </div>
        </Template>
    </div>
  )
}

export default Step5FormHyarihatto