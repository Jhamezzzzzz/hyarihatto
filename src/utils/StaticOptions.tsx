interface ErrorMessageObject{
    [key: string]: string
}

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
        "Regular", 
        "Low Frek", 
        "Irregular", 
        "Abnormal"
    ]

    const optionsHyarihattoHazardSource = [
        "Pengalaman", 
        "Praduga", 
        "Direct acc.", 
        "Ergo (PAK)"
    ]

    const optionsHyarihattoHazardInjured = [
        "Kepala", 
        "Tangan", 
        "Kaki", 
        "Badan",
        "Lainnya"
    ]

    const optionsHyarihattoHazardCause = [
        "Lalai / Lengah",
        "Tergesa-gesa",
        "Tdk terampil",
        "Lelah",
    ]

    const optionsHyarihattoHazardCategory = [
        "Human",
        "Machine",
        "Workplace",
    ]

    const optionsHyarihattoAccidentType = [
        "A - Terjepit",
        "B - Tertimpa",
        "C - Tertabrak",
        "D - Terjatuh",
        "E - Tersetrum",
        "F - Terbakar",
        "a - Keracunan",
        "a - Habis O2",
        "Terpeleset",
        "Tergores",
        "Terlilit",
        "Terbentur",
        "Masuk mata",
        "Lainnya"
    ]
    
    const errorMessageObject: ErrorMessageObject = {
        userId: "Noreg",
        sectionId: "Section",
        shift: "Shift",
        incidentDate: "Tanggal",
        incidentTime: "Waktu",
        workProcess: "Line/Process",
        location: "Lokasi",
        currentActivity: "Temuan kejadian",
        potentialHazard: "Potensi bahaya",
        hazardReason: "Alasan berbahaya",
        expectedCondition: "Harapan",
        pattern: "Jenis",
        source: "Sumber & akibat",
        injured: "Terluka",
        cause: "Sebab",
        category: "Kategori",
        accidentType: "Tipe kecelakaan",
        accidentLevelId: "Level kecelakaan",
        hazardControlLevelId: "Frekuensi kerja",
        workingFrequencyId: "Level pencegah bahaya",
    }

    const STATUS_SUBMISSION = [
        "Diajukan",
        "Dijadwalkan",
        "Terselesaikan",
        "Ditolak"
    ]

    const optionsStatus = [
        {
            value: "0",
            label: "Diajukan"
        },
        {
            value: "1",
            label: "Dijadwalkan"
        },
        {
            value: "2",
            label: "Terselesaikan"
        },
        {
            value: "3",
            label: "Ditolak"
        },
    ]

    return{
        optionsShift,
        optionsHyarihattoHazardType,
        optionsHyarihattoHazardSource,
        optionsHyarihattoHazardInjured,
        optionsHyarihattoHazardCause,
        optionsHyarihattoHazardCategory,
        optionsHyarihattoAccidentType,
        errorMessageObject,
        STATUS_SUBMISSION,
        optionsStatus
    }
}

export default StaticOptions
