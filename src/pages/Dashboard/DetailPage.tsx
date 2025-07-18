import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export type DetailCatatan = {
  id: number;
  tanggal: string;
  waktu: string;
  nama: string;
  noreg: string;
  shift: string;
  rank: string;
  score: number;
  kegiatan: string;
  potensiBahaya: string;
  penyebab: string;
  harapan: string;
  usulan: string;
  jenis: string;
  kategori: string;
  bukti: string;
  tipeKecelakaan: string;
  levelKecelakaan: string;
  frekuensiKerja: string;
  levelPencegah: string;
};

export const dummyData: DetailCatatan[] = [
  {
    id: 1,
    tanggal: "2025-07-09",
    waktu: "11:38",
    nama: "Dika",
    noreg: "2234102",
    shift: "Non-shift",
    rank: "Bb",
    score: 16,
    kegiatan: "Fill in item/part ke rak shopping",
    potensiBahaya: "Tangan tergores sekat/pembatas pada rak jalur 1 no 5 kolom 7",
    penyebab: "Sekat atau pembatas pada rak material terbuat dari bahan plat/akrilik",
    harapan: "Ada sedikit material tambahan seperti karet atau busa untuk melapisi ujung-ujung pembatas/sekat pada rak shopping",
    usulan: "-",
    jenis: "Sumber & Akibat, Terluka, Sebab: Regular, Pengalaman: Tangan, Lalai/lengah",
    kategori: "Human",
    bukti: "Ini gambar foto",
    tipeKecelakaan: "Tergores",
    levelKecelakaan: "b - Perlu Cuti - 6",
    frekuensiKerja: "Sedang - 4",
    levelPencegah: "Level Rendah - 6"
  },
  {
    id: 2,
    tanggal: "2025-07-10",
    waktu: "08:20",
    nama: "Bagus",
    noreg: "2234103",
    shift: "Pagi",
    rank: "Cc",
    score: 12,
    kegiatan: "Mengangkat box berat ke rak atas",
    potensiBahaya: "Box terjatuh dan mengenai kepala",
    penyebab: "Posisi rak terlalu tinggi dan tidak ada bantuan alat",
    harapan: "Gunakan tangga atau alat bantu angkat",
    usulan: "Sediakan tangga dorong di area tersebut",
    jenis: "Tertimpa benda jatuh",
    kategori: "Environment",
    bukti: "Foto kondisi rak tinggi",
    tipeKecelakaan: "Tertimpa",
    levelKecelakaan: "c - Cidera Ringan - 5",
    frekuensiKerja: "Tinggi - 5",
    levelPencegah: "Sedang - 5"
  }
];

export default function DetailPage() {
  const { id } = useParams();
const catatan = dummyData.find(item => item.id === Number(id));


  return (
    <div className="grid grid-cols-12 gap-2 p-1">
 
      {/* <!-- Total Rank --> */}
    <div className="col-span-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-md
     dark:border-gray-800 dark:bg-white/[0.03] space-y-4 h-[550px]">
      <h3 className=" mt-4 text-xl font-bold text-gray-800 dark:text-white">Catatan Hyarihatto</h3>

      <div className=" text-sm text-gray-700 dark:text-gray-300">
        <div className='space-y-4'>
        <div className="pb-4 border-b border-gray-300">
          <p className="font-medium">Tanggal</p>
          <p>{catatan?.tanggal}</p>
        </div>
        <div className="pb-4 border-b border-gray-300">
          <p className="font-medium">Waktu</p>
          <p>{catatan?.waktu}</p>
        </div>

        <div className="pb-4 border-b border-gray-300">
          <p className="font-medium">Nama</p>
          <p>{catatan?.nama}</p>
        </div>
        <div className="pb-4 border-b border-gray-300">
          <p className="font-medium">No.Reg</p>
          <p>{catatan?.noreg}</p>
        </div>

        <div className="pb-4 border-b border-gray-300">
          <p className="font-medium">Shift</p>
          <p>{catatan?.shift}</p>
        </div>
        <div>
          <p className="font-medium">Rank</p>
          <p>{catatan?.rank}</p>
        </div>
        </div>
      </div>
    </div>

      {/* <!-- Detail--> */}
      <div className="col-span-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Detail Catatan</h3>

        <div className="grid-cols-12  text-sm text-gray-700 dark:text-gray-300">
          {/* Baris 1 */}
          <div className='space-y-4'>
           <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Apa yang sedang dilakukan?</p>
            <p>{catatan?.kegiatan}</p>
          </div>
         
          
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Potensi bahaya apa yang akan timbul?</p>
            <p>{catatan?.potensiBahaya}</p>
          </div>

          {/* Baris 2 */}
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Mengapa kondisinya berbahaya seperti itu?</p>
            <p>{catatan?.penyebab}</p>
          </div>
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Seharusnya kondisinya bagaimana?</p>
            <p>
              <span className="font-semibold">a. Harapan yang diinginkan:</span><br />
              {catatan?.penyebab}
            </p>
            <p className="mt-1">
              <span className="font-semibold">b. Usulan Perbaikan:</span><br />
              {catatan?.penyebab}
            </p>
          </div>

          {/* Baris 3 */}
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Jenis</p>
            
            <p>{catatan?.jenis}</p>
          </div>

          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Kategori</p>
            <p>{catatan?.kategori}</p>
          </div>

          {/* Baris 4 */}
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Bukti Kejadian</p>
            <p>Ini gambar foto</p>
          </div>
          <div>
            <p className="font-medium">Tipe Kecelakaan [Stop 6 + alpha]</p>
            <p>{catatan?.tipeKecelakaan}</p>
          </div>

          {/* Baris 5 */}
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Level Kecelakaan</p>
            <p>{catatan?.levelKecelakaan}</p>
          </div>
          <div>
            <p className="font-medium">Frekuensi Kerja</p>
            <p>{catatan?.levelKecelakaan}</p>
          </div>

          {/* Baris 6 */}
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Level Pencegah Bahaya</p>
            <p>{catatan?.levelPencegah}</p>
          </div>
          <div>
            <p className="font-medium">Total Nilai</p>
            <p>Score: <strong>{catatan?.score}</strong> | Rank: <strong>{catatan?.rank}</strong></p>
          </div>
        </div>
        </div>
      </div> 
     {/* <!-- contermeasure--> */}
        <div className="col-span-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Countermeasure</h3>
          <div className="flex items-end justify-between mt-5">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {/* Saran dan Usulan */}
             <div className='space-y-4'>
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
