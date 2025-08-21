import { useRef } from "react";

export default function PrintVoiceMember() {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };


  return (
      <div className="p-6">
      {/* Area yang akan diprint */}
      <div ref={printRef} className="border rounded-lg p-4 bg-white">
        <h2 className="text-2xl font-bold mb-4">Creative Idea Suggestion Form</h2>

        {/* Bagian Header */}
        <div className="grid grid-cols-12 gap-4 border p-3 mb-4">
          <div className="col-span-8">
            <div className="mb-2">
              <label className="font-semibold">Judul:</label>
              <input type="text" className="border w-full px-2 py-1" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold">Nama:</label>
                <input type="text" className="border w-full px-2 py-1" />
              </div>
              <div>
                <label className="font-semibold">Type:</label>
                <input type="text" className="border w-full px-2 py-1" />
              </div>
              <div>
                <label className="font-semibold">Noreg:</label>
                <input type="text" className="border w-full px-2 py-1" />
              </div>
              <div>
                <label className="font-semibold">Divisi:</label>
                <input type="text" className="border w-full px-2 py-1" />
              </div>
              <div>
                <label className="font-semibold">Departement:</label>
                <input type="text" className="border w-full px-2 py-1" />
              </div>
              <div>
                <label className="font-semibold">Section:</label>
                <input type="text" className="border w-full px-2 py-1" />
              </div>
            </div>
            <div className="mt-2">
              <label className="font-semibold">Latar Belakang (Masalah yang dihadapi):</label>
              <textarea className="border w-full h-20 px-2 py-1"></textarea>
            </div>
          </div>

          <div className="col-span-4 border p-2">
            <label className="font-semibold">Tanggal Pembuatan Ide</label>
            <input type="date" className="border w-full px-2 py-1 mb-2" />
            <div className="mt-2">
              <p className="font-semibold">Status Ide:</p>
              <div>
                <label>
                  <input type="checkbox" /> Sudah Dilaksanakan, tanggal:
                </label>
                <input type="date" className="border ml-2 px-2 py-1" />
              </div>
              <div>
                <label>
                  <input type="checkbox" /> Belum Dilaksanakan
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Masalah & Penanggulangan */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border p-3">
            <h3 className="font-semibold mb-2">Masalah</h3>
            <p>(Apa kendala yang dihadapi)</p>
          </div>
          <div className="border p-3">
            <h3 className="font-semibold mb-2">Penanggulangan</h3>
            <p>(Harapan Perbaikan / Usulan Perbaikan)</p>
          </div>
        </div>

        {/* Comment GH / SH */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Comment GH</label>
            <textarea className="border w-full h-20 px-2 py-1"></textarea>
          </div>
          <div>
            <label className="font-semibold">Comment SH</label>
            <textarea className="border w-full h-20 px-2 py-1"></textarea>
          </div>
        </div>
      </div>

      {/* Tombol Print */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Print
        </button>
      </div>
    </div>

  );
}

