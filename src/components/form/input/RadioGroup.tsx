import { useState } from "react";
import Radio from "../input/Radio";

interface RadioGroupProps{
    options: string[];
    onChange: (option: string, group: string, name: string) => void;
    group: string;
    name: string;
    value: string;
}

export default function RadioGroup({
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
      <div className="flex flex-col gap-3">
        {options.length > 0 && options.map((opt: string, index: number)=>{
            return(
                <Radio
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
    // </ComponentCard>
  );
}
