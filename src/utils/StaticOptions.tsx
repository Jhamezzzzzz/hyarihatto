
const StaticOptions = () => {
    const optionsShift = [
        {
            label: "Non-Shift",
            value: "non-shift"
        },
        {
            label: "Red",
            value: "red"
        },
        {
            label: "White",
            value: "white"
        },
    ]

    const optionsHyarihattoHazardType = [
        "Reguler", 
        "Lowfreak", 
        "Irregular", 
        "Abnormal"
    ]

    const optionsHyarihattoHazardSource = [
        "Pengalaman", 
        "Praduga", 
        "Direct", 
        "Ergo"
    ]

    const optionsHyarihattoHazardInjured = [
        "Kepala", 
        "Tangan", 
        "Kaki", 
        "Badan"
    ]

    const optionsHyarihattoHazardCause = [
        "Lalai/Lengah",
        "Tergesa-gesa",
        "Tdk Terampil",
        "Lelah",
    ]

    const optionsHyarihattoHazardCategory = [
        "Human",
        "Machine",
        "Workplace",
    ]

    const optionsHyarihattoAccidentType = [
        "Terjepit",
        "Tertimpa",
        "Tertabrak",
        "Terjatuh",
        "Tersetrum",
        "Terbakar",
        "Keracunan",
        "Habis O2",
        "Terpeleset",
        "Tergores",
        "Terlilit",
        "Terbentur",
        "Masuk Mata",
        "Lainnya"
    ]
    

    return{
        optionsShift,
        optionsHyarihattoHazardType,
        optionsHyarihattoHazardSource,
        optionsHyarihattoHazardInjured,
        optionsHyarihattoHazardCause,
        optionsHyarihattoHazardCategory,
        optionsHyarihattoAccidentType
    }
}

export default StaticOptions
