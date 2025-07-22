import Template from "../Forms/Hyarihatto/Template";

export default function PamduanHyat() {
  return (
    <div className="">
      <Template showBack backToHome>
        <div
          className="d-flex justify-content-center align-item-center"
          style={{ marginTop: "30px" }}
        >
          <div className="">
            <div className="card-header text-start">
              <h2 className="mb-0 text-xl font-bold">
                Petunjuk Pengisian Catatan Digital Hyarihatto
              </h2>
            </div>
            <div className="card-body">
              <p>1. Ini adalah bentuk digital dari Buku Catatan Hyarihatto.</p>
              <p>
                2. Diisi oleh masing-masing pribadi dan dikomunikasikan dengan
                atasan.
              </p>
              <p>
                3. Online Hyarihatto ini juga berfungsi sebagai usulan dari
                karyawan untuk kondisi safety yang lebih baik di lingkungan
                kerjanya dan level awareness safety yang ditunjukkan dengan
                Hyarihatto score.
              </p>
              <p>
                4. Hasil dari Catatan Hyarihatto yang sudah ditanggulangi dapat
                diajukan rewardnya melalui format Ide Suggestion.
              </p>
              <p>
                5. Catatan ini dibacakan seminggu sekali bergantian dalam Safety
                Briefing 5 minutes Talk yang dipimpin oleh GL/TL-nya.
              </p>
              <p>
                6. Online Hyarihatto harus dikontrol secara regular oleh
                pimpinan kerja.
              </p>
              <p>
                7. Apabila countermeasure tidak diperoleh di level GL/TL maka
                tema Hyarihatto tersebut harus dikonsultasikan dengan pimpinan
                yang lebih tinggi.
              </p>
              <p>
                8. Apabila ada hal yang perlu ditanyakan dapat langsung
                disampaikan kepada SHE Karawang (ext. 5551, 5044, 5064, 5061)
                melalui pimpinan masing-masing.
              </p>
            </div>
          </div>
        </div>
      </Template>
    </div>
  );
}
