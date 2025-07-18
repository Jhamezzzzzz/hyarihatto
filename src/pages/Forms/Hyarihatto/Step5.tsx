import Template from './Template'
import ButtonNavigation from './ButtonNavigation'
import RadioGroup from '../../../components/form/input/RadioGroup'
import StaticOptions from '../../../utils/StaticOptions'
import { useFormData } from '../../../context/FormHyarihattoContext'

const Step5FormHyarihatto = () => {
    const { ButtonPrevious, ButtonNext } = ButtonNavigation()
    const { optionsHyarihattoAccidentType } = StaticOptions()
    const { formData, updateFormData } = useFormData()

    const handleChangeRadio = (option: string) => {
        updateFormData("hazardReport", "accidentType", option)
    }

  return (
    <div>
        <Template showStep step={5}>
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="bg-green-600 text-white text-center py-3">
                    <h5 className="text-lg font-semibold">Tipe Kecelakaan [Stop 6 + alpha]</h5>
                </div>

                <div className="p-6 space-y-4">
                    <p className="mb-3">Silakan pilih salah satu:</p>
                    <RadioGroup
                        options={optionsHyarihattoAccidentType}
                        onChange={handleChangeRadio}
                        group='hazardReport'
                        name='accidentType'
                        value={formData.hazardReport.accidentType}
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