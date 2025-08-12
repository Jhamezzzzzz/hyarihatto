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
    year: Number(localStorage.getItem("filter.year")) || new Date().getFullYear(),
    month: localStorage.getItem("filter.month") || "",
    monthName: localStorage.getItem("filter.monthName") || "",
    type: localStorage.getItem("filter.type") || "hyarihatto"
  })

  const handleChangeSelect = (name: string, value: string) => {
    setFilter({
      ...filter,
      [name]: value
    })
    localStorage.setItem(`filter.${name}`, value)
  }

  const handleChangeDate = (date: Date[]) => {
    const formattedMonth = new Date(date[0]).toLocaleDateString('en-CA').slice(5, 7)
    const formattedMonthName = new Date(date[0]).toLocaleDateString('en-CA', {
        month: "short"
      })
    setFilter({
      ...filter,
      month: formattedMonth,
      monthName: formattedMonthName
    })
    localStorage.setItem(`filter.month`, formattedMonth)
    localStorage.setItem(`filter.monthName`, formattedMonthName)
  }

  const handleChangeYear = (year: number) => {
    setFilter({
      ...filter,
      year: year
    })
    localStorage.setItem(`filter.year`, year.toString())
  }

  const handleClearMonth = () => {
    setFilter({
      ...filter,
      month: "",
      monthName: ""
    })
    localStorage.setItem("filter.month", "")
    localStorage.setItem("filter.monthName", "")
  }

  return (
    <>
      <PageMeta
        title="Dashboard Leader | Online Hyarihatto & Voice Member"
        description="Online sistem sebagai digitalisasi buku catatan Hyarihatto"
      />

      <div className="grid grid-cols-12 items-start justify-between mb-6 ">
        <div className="col-span-12 sm:mb-0 mb-3 sm:col-span-8 w-full sm-w-auto">
          <Label>Tipe Catatan</Label>
          <Select
            options={OPTIONS_TYPE}
            defaultValue={filter.type}
            className="sm:w-[200px]"
            onChange={handleChangeSelect}
            name="type"
          />
        </div>
        {/* ///filter/// */}
        <div className="col-span-12 sm:col-span-4 flex gap-4  justify-end">
          <div className="w-full sm:w-auto">
            <Label>Bulan </Label>
            <DatePicker
              id="month"
              mode="month"
              placeholder="Semua periode"
              className="bg-white sm:w-[200px]!"
              onChange={handleChangeDate}
              dateFormat="M"
              defaultDate={filter.monthName}
              isClearable
              onClear={handleClearMonth}
            />
          </div>
          <div className="w-full sm:w-auto">
            <Label>Tahun </Label>
            <YearPicker
              placeholder="Pilih tahun"
              onChange={handleChangeYear}
              value={filter.year}
              className="sm:w-[200px]!"
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
    </>
  );
}
