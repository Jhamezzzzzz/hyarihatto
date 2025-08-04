import { useState } from "react";
import RadioV2 from "./RadioV2";

interface RadioGroupProps{
    options: Options[];
    onChange: (option: string, group: string, name: string) => void;
    group: string;
    name: string;
    value: string;
    error?: boolean;
    hint?: string;
}

interface Options{
  id: number;
  option: string;
  rank: string;
  score: number;
}

export default function RadioGroupV2({
    options,
    onChange,
    group,
    name,
    value,
    error = false,
    hint
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleRadioChange = (value: string, name: string) => {
    onChange(value, group, name)
    setSelectedValue(value);
  };

  const radioGroupClass = "border-transparent"
  const errorRadioGroupClass = `border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;

  return (
    // <ComponentCard title="Radio Buttons">
      <div>
        <div className={`flex flex-col gap-1 border-2 rounded-lg ${error ? errorRadioGroupClass : radioGroupClass}`}>
          {options.length > 0 && options.map((opt: Options, index: number)=>{
            const isSelected = Number(value) === opt.id || Number(selectedValue) === opt.id
              return(
                <label htmlFor={name+opt.id+"Radio"+index+1} key={index} className={`flex justify-between border-2 ${isSelected ? " border-brand-500 bg-brand-50" : "border-transparent hover:bg-brand-50/25 hover:border-brand-500 text-gray-700 dark:text-gray-400"} p-2 rounded-full`}>
                  <div className="flex gap-5">
                    {opt.rank && (
                      <label htmlFor={name+opt.id+"Radio"+index+1}>
                        {opt.rank}
                      </label>
                    )}
                    <label htmlFor={name+opt.id+"Radio"+index+1}>
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
        {hint && (
          <p
            className={` p-2 text-xs ${
              error
                ? "text-error-500"
                : "text-gray-500"
            }`}
          >
            {hint}
          </p>
        )}
      </div>
    // </ComponentCard>
  );
}
