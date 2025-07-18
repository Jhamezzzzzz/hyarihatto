import { useState } from "react";
import RadioV2 from "./RadioV2";

interface RadioGroupProps{
    options: Options[];
    onChange: (option: string, group: string, name: string) => void;
    group: string;
    name: string;
    value: string;
}

interface Options{
  id: number;
  option: string;
  rank: string
  score: number
}

export default function RadioGroupV2({
    options,
    onChange,
    group,
    name,
    value
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleRadioChange = (value: string, name: string) => {
    onChange(value, group, name)
    setSelectedValue(value);
  };

  return (
    // <ComponentCard title="Radio Buttons">
      <div className="flex flex-col gap-1">
        {options.length > 0 && options.map((opt: Options, index: number)=>{
          const isSelected = Number(value) === opt.id || Number(selectedValue) === opt.id
            return(
              <label htmlFor={name+opt.id+"Radio"+index+1} className={`flex justify-between border-2 ${isSelected ? " border-brand-500" : "border-transparent"} p-2 rounded-full`}>
                <div className="flex gap-5">
                  {opt.rank && (
                    <label>
                      {opt.rank}
                    </label>
                  )}
                  <label>
                    {opt.option}
                  </label>
                </div>

                <RadioV2
                  id={name+opt.id+"Radio"+index+1}
                  name={name}
                  value={opt.id.toString()}
                  checked={Number(value) === Number(opt.id) || Number(selectedValue) === Number(opt.id)}
                  onChange={(value)=>handleRadioChange(value, name)}
                  label={opt.score.toString()}
                />
              </label>
            )
        })}
      </div>
    // </ComponentCard>
  );
}
