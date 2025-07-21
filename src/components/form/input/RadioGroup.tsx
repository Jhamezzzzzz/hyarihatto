import { useState } from "react";
import Radio from "../input/Radio";

interface RadioGroupProps{
    options: string[];
    onChange: (option: string, group: string, name: string) => void;
    group: string;
    name: string;
    value: string;
    error?: boolean;
    hint?: string;
}

export default function RadioGroup({
    options,
    onChange,
    group,
    name,
    value,
    error,
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
      <div className={`flex flex-col gap-3 border-2 rounded-lg ${error ? errorRadioGroupClass : radioGroupClass}`}>
        {options.length > 0 && options.map((opt: string, index: number)=>{
            return(
                <Radio
                  key={index}
                  id={opt+"Radio"+index+1}
                  name={group}
                  value={opt}
                  checked={value === opt || selectedValue === opt}
                  onChange={(value)=>handleRadioChange(value, name)}
                  label={opt}
                />
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
