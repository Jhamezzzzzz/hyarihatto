import React,{ useState } from "react";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import VoiceMetrics from "../../components/ecommerce/VoiceMetrics";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import RecentVoice from "../../components/ecommerce/RecentVoice";
import GraphLocationVoice from "../../components/common/GraphLocationVoice";
import GraphLocationHyat from "../../components/common/GraphLocation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HomeLeader() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const lokasiOptions = ["Area A", "Area B", "Area C"];
  const plantOptions = ["Plant 1", "Plant 2", "Plant 3"];

  return (
    <>
     
      
        <div className="col-span-12 space-y-6 xl:col-span-5">
          <p className="text-title-sm font-bold">Hyarihatto</p>
        </div>
         {/* ///filter/// */}
        <div className="grid grid-cols-12 gap-4 md:gap-2">
          <div className="col-span-12 sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Periode
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-1 py-1 focus:border-primary focus:ring-primary"
              placeholderText="Pilih Bulan dan Tahun"
            />
          </div>
          

        <div className="col-span-12 sm:col-span-4">
          <label className="block text-sm font-medium text-gray-700">Lokasi</label>
          <select
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-2 py-2 focus:border-primary focus:ring-primary"
          >
            <option value="">Pilih Lokasi</option>
            {lokasiOptions.map((lokasi, index) => (
              <option key={index} value={lokasi}>
                {lokasi}
              </option>
            ))}
          </select>
        </div>

        {/* Plant */}
        <div className="col-span-12 sm:col-span-4">
          <label className="block text-sm font-medium text-gray-700">Plant</label>
          <select
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-2 py-2 focus:border-primary focus:ring-primary"
          >
            <option value="">Pilih Plant</option>
            {plantOptions.map((plant, index) => (
              <option key={index} value={plant}>
                {plant}
              </option>
            ))}
          </select>
        </div>
      </div>

        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <GraphLocationHyat />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <p className="text-title-sm font-bold">Voice Member</p>
        </div>
          {/* ///////////////Filter////////////////////// */}
           <div className="grid grid-cols-12 gap-4 md:gap-2">
            <div className="col-span-12 sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Periode
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-1 py-1 focus:border-primary focus:ring-primary"
                placeholderText="Pilih Bulan dan Tahun"
              />
            </div>
            <div className="col-span-12 sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">Lokasi</label>
              <select
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-2 py-2 focus:border-primary focus:ring-primary"
              >
                <option value="">Pilih Lokasi</option>
                {lokasiOptions.map((lokasi, index) => (
                  <option key={index} value={lokasi}>
                    {lokasi}
                  </option>
                ))}
              </select>
            </div>
          {/* Plant */}
          <div className="col-span-12 sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700">Plant</label>
            <select
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-2 py-2 focus:border-primary focus:ring-primary"
            >
              <option value="">Pilih Plant</option>
              {plantOptions.map((plant, index) => (
                <option key={index} value={plant}>
                  {plant}
                </option>
              ))}
            </select>
          </div>
        </div>

         <div className="col-span-12 space-y-6 xl:col-span-7">
          <VoiceMetrics />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <GraphLocationVoice />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <RecentVoice />
        </div>
  
    </>
  );
}
