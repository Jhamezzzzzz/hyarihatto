import VoiceMetrics from "../../components/ecommerce/VoiceMetrics";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import RecentVoice from "../../components/ecommerce/RecentVoice";
import DatePicker from "../../components/form/date-picker";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import GraphLocationVoice from "../../components/common/GraphLocationVoice";
import GraphLocationHyat from "../../components/dashboard/GraphLocation";
import "react-datepicker/dist/react-datepicker.css";
import PageMeta from "../../components/common/PageMeta";
import Metrics from "../../components/dashboard/Metrics";

export default function HomeLeader() {
  return (
    <>
      <PageMeta
        title="Dashboard Leader | Online Hyarihatto & Voice Member"
        description="Online sistem sebagai digitalisasi buku catatan Hyarihatto"
      />

      <div className="col-span-12 space-y-6 xl:col-span-5">
        <p className="text-title-md font-bold mb-2">Hyarihatto</p>
      </div>
      {/* ///filter/// */}
      <div className="flex gap-4">
        <div>
          <Label>Periode</Label>
          <DatePicker
            id="period"
            mode="month"
            placeholder="Semua periode"
            className="bg-white"
          />
        </div>
      </div>

      <div className="col-span-12 space-y-6 xl:col-span-7 mb-3 mt-2">
        <Metrics />
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-7  mb-4">
        <GraphLocationHyat />
      </div>
      <div className="col-span-12 xl:col-span-7 mb-4">
        <RecentOrders />
      </div>

      {/* ----------------------------------VOICE MEMBER-------------------------------- */}
      <div className="col-span-12 space-y-6 xl:col-span-7 mt-10">
        <p className="text-title-md font-bold">Voice Member</p>
      </div>
      {/* ///////////////Filter////////////////////// */}
      <div className="flex gap-4">
        <div>
          <Label>Periode</Label>
          <DatePicker
            id="period"
            mode="month"
            placeholder="Semua periode"
            className="bg-white"
          />
        </div>
        <div>
          <Label>Rank</Label>
          <Select
            placeholder="Semua rank"
            options={[]}
            onChange={() => {}}
            className="min-w-[200px]"
          />
        </div>
        <div>
          <Label>Member</Label>
          <Select
            placeholder="Semua member"
            options={[]}
            onChange={() => {}}
            className="min-w-[200px]"
          />
        </div>
      </div>

      <div className="col-span-12 space-y-6 xl:col-span-7 mt-4">
        <VoiceMetrics />
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-7 mt-3">
        <GraphLocationVoice />
      </div>
      <div className="col-span-12 xl:col-span-7 mt-4">
        <RecentVoice />
      </div>
    </>
  );
}
