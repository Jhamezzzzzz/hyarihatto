import  { useState } from 'react';
import { useParams} from 'react-router-dom';
import RadioGroup from "../../components/form/input/RadioGroup";
// import 'bootstrap/dist/css/bootstrap.min.css';



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

export default function DetailHyarihatto() {
  const { id } = useParams();
  const catatan = dummyData.find(item => item.id === Number(id));
   const optionsProgress = ["Terima", "Tolak"];
  const optionsUser = ["Oleh diri sendiri", "Bersama dalam SGA", "Pihak lain"];
  const [selectedProgress, setSelectedProgress] = useState(""); // utk pilihan "Terima" atau lainnya
const [selectedPIC, setSelectedPIC] = useState(""); // utk pilihan user PIC


  return (
    <div className="grid grid-cols-12 gap-2 p-1">
 
      {/* <!-- Total Rank --> */}
    <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-2 shadow-md
     dark:border-gray-800 dark:bg-white/[0.03] space-y-4 h-[220px]">
      <h3 className=" mt-4 text-xl font-bold text-gray-800 dark:text-white">Identitas Catatan</h3>
      <div className=" text-sm text-gray-700 dark:text-gray-300">
       <div className="grid grid-cols-4 gap-4">
        <div className="">
          <p className="font-medium">Nama</p>
          <p className='text-lg'>Dika</p> 
          {/* <p>{catatan?.tanggal}</p> */}
        </div>
        <div className="">
          <p className="font-medium">No.Reg</p>
          <p className='text-lg'>2444404</p> 
          {/* <p>{catatan?.waktu}</p> */}
        </div>

        <div className="">
          <p className="font-medium">Shift</p>
          <p className='text-lg'>White</p> 
          {/* <p>{catatan?.nama}</p> */}
        </div>
        <div className="">
          <p className="font-medium">Nilai Rank</p>
          <p className='text-lg'>12</p> 
          {/* <p>{catatan?.noreg}</p> */}
        </div>

        <div className="">
          <p className="font-medium">Catatan</p>
          <p className='text-lg'>Hyarihatto</p> 
          {/* <p>{catatan?.shift}</p> */}
        </div>
        <div>
          <p className="font-medium">Tanggal Kejadian</p>
          <p className='text-lg'>12-12-2012</p> 
          {/* <p>{catatan?.rank}</p> */}
        </div>
         <div>
          <p className="font-medium">Waktu Kejadian</p>
          <p className='text-lg'>11.38</p>
          {/* <p>{catatan?.rank}</p> */}
        </div>
         <div>
          <p className="font-medium">Status</p>
         <span className="inline-block text-white bg-green-600 text-md px-2 py-1 rounded-full">
          Terselesaikan
        </span>
          {/* <p>{catatan?.rank}</p> */}
        </div>
        </div>
      </div>
    </div>

      {/* <!-- Detail--> */}
      <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Detail Catatan</h3>

        <div className="grid-cols-12  text-sm text-gray-700 dark:text-gray-300">
          {/* Baris 1 */}
          <div className='space-y-4'>
           <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Apa yang sedang dilakukan?</p>
              <p>Mengangkat box berat ke rak atas</p>
            {/* <p>{catatan?.kegiatan}</p> */}
          </div>
         
          
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Potensi bahaya apa yang akan timbul?</p>
             <p>Mengangkat box berat ke rak atas</p>
            {/* <p>{catatan?.potensiBahaya}</p> */}
          </div>

          {/* Baris 2 */}
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Mengapa kondisinya berbahaya seperti itu?</p>
            <p>Mengangkat box berat ke rak atas</p>
            {/* <p>{catatan?.penyebab}</p> */}
          </div>
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Seharusnya kondisinya bagaimana?</p>
            <p>
              <span className="font-semibold">a. Harapan yang diinginkan:</span><br />
              Mengangkat box berat ke rak atas
              {/* {catatan?.penyebab} */}
            </p>
            <p className="mt-1">
              <span className="font-semibold">b. Usulan Perbaikan:</span><br />
              -
              {/* {catatan?.penyebab} */}
            </p>
          </div>
          <div className='grid grid-cols-5 gap-4'>
            <div>
              <p className="font-medium">Jenis</p>
              <p>{catatan?.jenis}</p>
            </div>
              <div>
              <p className="font-medium">Sumber & Akibat</p>
              <p>{catatan?.kategori}</p>
            </div>
              <div>
              <p className="font-medium">Terluka</p>
              <p>{catatan?.kategori}</p>
            </div>
              <div>
              <p className="font-medium">Sebab</p>
              <p>{catatan?.kategori}</p>
            </div>
            <div>
              <p className="font-medium">Kategori</p>
              <p>{catatan?.kategori}</p>
            </div>
          </div>
          {/* Baris 3 */}
        <div className='pb-4 border-b border-gray-300'/>

          {/* Baris 4 */}
          <div className="pb-4 border-b border-gray-300">
            <p className="font-medium">Bukti Kejadian</p>
            <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">a. Harapan yang diinginkan:</span><br />
            <img src="/images/harapan.png"  className="w-8 h-8 inline-block mr-2" />
            {/* <span>{catatan?.penyebab}</span> */}
          </div>
            <div>
              <span className="font-semibold">b. Usulan Perbaikan:</span><br />
              <img src="/images/harapan.png"  className="w-8 h-8 inline-block mr-2" />
              {/* {catatan?.penyebab} */}
            </div>
            </div>
          </div>
          <div>
            <p className="font-medium">Tipe Kecelakaan [Stop 6 + alpha]</p>
              <p>Tergores</p>
            {/* <p>{catatan?.tipeKecelakaan}</p> */}
          </div>

          <div className="grid grid-cols-3 gap-4">
             <div>
              <p className="font-medium">Level Kecelakaan</p>
              <p>b-perlucuti-6</p>
              {/* <p>{catatan?.levelKecelakaan}</p> */}
            </div>
            <div>
              <p className="font-medium">Frekuensi Kerja</p>
              <p>b-perlucuti-6</p>
              {/* <p>{catatan?.levelKecelakaan}</p> */}
            </div>

            {/* Baris 6 */}
            <div >
              <p className="font-medium">Level Pencegah Bahaya</p>
              <p>b-perlucuti-6</p>
              {/* <p>{catatan?.levelPencegah}</p> */}
            </div>
          </div>
            <div>
              <p className="font-medium">Total Nilai</p>
            <div className='flex items-center gap-12'>
              <div>
                <p>Score:</p>
                <p className='text-5xl font-semibold'>12</p>
              </div>
              <div>
                <p>Rank:</p>
                <p className='text-5xl font-semibold'>Bb</p>
              </div> 
            </div>
           </div>
          </div>
        </div>
      </div> 
       {/* <!-- Progress Tindak Lanjut--> */}
        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Progress</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300"></div>
                  <span>PIC Penanggulangan</span>
                   <div className=" rounded-2xl border border-gray-300 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
                    <RadioGroup
                      options={optionsProgress}
                      onChange={(value, group, name) => {
                        setSelectedPIC(value);
                      }}
                      group="pic"
                      name="picRadio"
                      value={selectedPIC}
                      error={false}
                    />
                   </div>
                   {selectedPIC === "Tolak" && (
                   <div>
                    <label className="block mb-1">Alasan Menolak</label>
                    <textarea
                      rows={4}
                      placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
                   )}
              </div>
     {/* <!-- Progress Tindak Lanjut--> */}
      {selectedPIC === "Terima" && (
        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] space-y-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Progress Tindak Lanjut</h3>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {/* Saran dan Usulan */}
              <div className="grid grid-cols-12 gap-4">
                {/* Kolom 1: PIC */}
                <div className="col-span-8">
                  <span>PIC Penanggulangan</span>
                   <div className=" rounded-2xl border border-gray-300 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
                    <RadioGroup
                      options={optionsUser}
                      onChange={(value, group, name) => {
                        setSelectedProgress(value);
                      }}
                      group="pic"
                      name="picRadio"
                      value={selectedPIC}
                      error={false}
                      hint="Pilih siapa yang bertanggung jawab"
                    />
                   </div>
                </div>

                {/* Kolom 2: Tanggal */}
                <div className="col-span-4 space-y-4">
                  <div>
                    <label className="block font-medium mb-1">Tanggal Plan C/M</label>
                    <input
                      type="date"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Tanggal Plan Selesai</label>
                    <input
                      type="date"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
              <label className="block font-medium mb-1">Saran & Usulan</label>
              <div>
                <label className="block mb-1">Section</label>
                <textarea
                rows={4}
                placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
              </div>
              <div>
                <label className="block mb-1">Section</label>
                <textarea
                  rows={4}
                  placeholder="Silakan isi countermeasure untuk kejadian Hyarihatto tersebut"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              </div>
           
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
           </div>
          </div>
        )}
        </div> 

  );
}
