import { useParams } from 'react-router-dom';

export default function DetailPage() {
  const { id } = useParams();

  return (
    <div className="p-1">
     <div className="grid grid-cols-3 gap-2  sm:grid-cols-3 md:gap-2">
      {/* <!-- Total Rank --> */}
    <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">Catatan Hyarihatto</h3>

      <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <p className="font-medium">Tanggal Kejadian</p>
          <p>2025-07-09</p>
        </div>
        <div>
          <p className="font-medium">Waktu Kejadian</p>
          <p>11:38</p>
        </div>

        <div>
          <p className="font-medium">Nama</p>
          <p>Dika</p>
        </div>
        <div>
          <p className="font-medium">No REG</p>
          <p>2234102</p>
        </div>

        <div>
          <p className="font-medium">Shift</p>
          <p>Non-shift</p>
        </div>
        <div>
          <p className="font-medium">Nilai Rank</p>
          <p>12</p>
        </div>
      </div>
    </div>

      {/* <!-- Rank A--> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Catatan Hyarihatto</h3>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          {/* Baris 1 */}
          <div>
            <p className="font-medium">Apa yang sedang dilakukan?</p>
            <p>Fill in item/part ke rak shopping</p>
          </div>
          <div>
            <p className="font-medium">Potensi bahaya apa yang akan timbul?</p>
            <p>Tangan tergores sekat/pembatas pada rak jalur 1 no 5 kolom 7</p>
          </div>

          {/* Baris 2 */}
          <div>
            <p className="font-medium">Mengapa kondisinya berbahaya seperti itu?</p>
            <p>Sekat atau pembatas pada rak material terbuat dari bahan plat/akrilik</p>
          </div>
          <div>
            <p className="font-medium">Seharusnya kondisinya bagaimana?</p>
            <p>
              <span className="font-semibold">a. Harapan yang diinginkan:</span><br />
              Ada sedikit material tambahan seperti karet atau busa untuk melapisi ujung-ujung pembatas/sekat pada rak shopping
            </p>
            <p className="mt-1">
              <span className="font-semibold">b. Usulan Perbaikan:</span><br /> -
            </p>
          </div>

          {/* Baris 3 */}
          <div>
            <p className="font-medium">Jenis</p>
            <p>Sumber & Akibat, Terluka, Sebab: Regular, Pengalaman: Tangan, Lalai/lengah</p>
          </div>
          <div>
            <p className="font-medium">Kategori</p>
            <p>Human</p>
          </div>

          {/* Baris 4 */}
          <div>
            <p className="font-medium">Bukti Kejadian</p>
            <p>Ini gambar foto</p>
          </div>
          <div>
            <p className="font-medium">Tipe Kecelakaan [Stop 6 + alpha]</p>
            <p>Tergores</p>
          </div>

          {/* Baris 5 */}
          <div>
            <p className="font-medium">Level Kecelakaan</p>
            <p>b - Perlu Cuti - 6</p>
          </div>
          <div>
            <p className="font-medium">Frekuensi Kerja</p>
            <p>Sedang - 4</p>
          </div>

          {/* Baris 6 */}
          <div>
            <p className="font-medium">Level Pencegah Bahaya</p>
            <p>Level Rendah - 6</p>
          </div>
          <div>
            <p className="font-medium">Total Nilai</p>
            <p>Score: <strong>16</strong> | Rank: <strong>Bb</strong></p>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          
        </div>
      </div>
            {/* <!-- Rank B--> */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Catatan Hyarihatto</h3>
          <div className="flex items-end justify-between mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            {/* Saran dan Usulan */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Saran & Usulan</label>
              <textarea
                rows={4}
                placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Ususlan Leader */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-2">Gambar</label>
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-48 cursor-pointer hover:border-primary">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-gray-500 mt-2">Tambahkan gambar bukti setelah perbaikan</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <button className="text-primary text-sm underline">Galeri</button>
                    <span className="text-gray-400">|</span>
                    <button className="text-primary text-sm underline">Kamera</button>
                  </div>
                </div>
              </div>
            </div>

            {/* PIC Penanggulangan */}
            <div>
              <label className="block font-medium mb-1">PIC Penanggulangan</label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary">
                <option>Oleh diri sendiri</option>
                <option>Bersama dalam SGA</option>
                <option>Pihak lain</option>
              </select>
            </div>

            {/* Nama Pihak (hanya tampil jika "Pihak lain") */}
            <div>
              <label className="block font-medium mb-1">Nama Pihak</label>
              <input
                type="text"
                placeholder="Masukkan nama pihak"
                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Tanggal Plan C/M */}
            <div>
              <label className="block font-medium mb-1">Tanggal Plan C/M</label>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Tanggal Plan Selesai */}
            <div>
              <label className="block font-medium mb-1">Tanggal Plan Selesai</label>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          </div>
        </div>
    </div>
  </div>
  );
}
