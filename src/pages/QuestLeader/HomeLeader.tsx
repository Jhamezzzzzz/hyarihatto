import { useState } from "react";
import ListSubmissions from "../../components/dashboard/ListSubmissions";
import DatePicker from "../../components/form/date-picker";
import Label from "../../components/form/Label";
import GraphLocationHyat from "../../components/dashboard/GraphLocation";
import "react-datepicker/dist/react-datepicker.css";
import PageMeta from "../../components/common/PageMeta";
import Metrics from "../../components/dashboard/Metrics";
import YearPicker from "../../components/form/year-picker";
import Select from "../../components/form/Select";
import Leaderboard from "../../components/dashboard/Leaderboard";

export type Filter = {
  year: number;
  month: string;
  monthName: string;
  type: string;
}

export default function HomeLeader() {
  const OPTIONS_TYPE = [{
    value: 'hyarihatto',
    label: 'Hyarihatto'
  },{
    value: 'voice member',
    label: 'Voice Member'
  }]
  const [filter, setFilter] = useState<Filter>({
    year: new Date().getFullYear(),
    month: "",
    monthName: "",
    type: "hyarihatto"
  })

  const handleChangeSelect = (name: string, value: string) => {
    setFilter({
      ...filter,
      [name]: value
    })
  }

  const handleChangeDate = (date: Date[]) => {
    setFilter({
      ...filter,
      month: new Date(date[0]).toLocaleDateString('en-CA').slice(5, 7),
      monthName: new Date(date[0]).toLocaleDateString('en-CA', {
        month: "short"
      })
    })
  }

  const handleChangeYear = (year: number) => {
    setFilter({
      ...filter,
      year: year
    })
  }

  const handleClearMonth = () => {
    setFilter({
      ...filter,
      month: "",
      monthName: ""
    })
  }

  return (
    <>
      <PageMeta
        title="Dashboard Leader | Online Hyarihatto & Voice Member"
        description="Online sistem sebagai digitalisasi buku catatan Hyarihatto"
      />

      <div className="col-span-12 xl:col-span-5 flex items-end justify-between mb-6">
        <div>
          <Label>Tipe Catatan</Label>
          <Select
            options={OPTIONS_TYPE}
            defaultValue={filter.type}
            className="w-[200px]"
            onChange={handleChangeSelect}
            name="type"
          />
        </div>
        {/* ///filter/// */}
        <div className="flex gap-4">
          <div className="">
            <Label>Bulan </Label>
            <DatePicker
              id="month"
              mode="month"
              placeholder="Semua periode"
              className="bg-white w-[200px]!"
              onChange={handleChangeDate}
              dateFormat="M"
              defaultDate={filter.monthName}
              isClearable
              onClear={handleClearMonth}
            />
          </div>
          <div className="">
            <Label>Tahun </Label>
            <YearPicker
              placeholder="Pilih tahun"
              onChange={handleChangeYear}
              value={filter.year}
              className="w-[200px]!"
            />
          </div>
        </div>
      </div>

      <div className="col-span-12 space-y-6 xl:col-span-7 mb-3 mt-2">
        <Metrics filter={filter}/>
      </div>
      <div className="col-span-12 space-y-6 mb-4">
        <Leaderboard filter={filter}/>
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-7  mb-4">
        <GraphLocationHyat filter={filter}/>
      </div>
      <div className="col-span-12 xl:col-span-7 mb-4">
        <ListSubmissions filter={filter} />
      </div>

      {/* ----------------------------------VOICE MEMBER-------------------------------- */}
      {/* <div className="col-span-12 space-y-6 xl:col-span-7 mt-10">
        <p className="text-title-md font-bold">Voice Member</p>
      </div>
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
      </div> */}
    </>
  );
}
