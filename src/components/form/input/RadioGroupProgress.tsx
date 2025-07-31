import React from 'react';
import Radio from '../input/Radio';

type RadioGroupProgressProps = {
  options: string[];
  value: string;
  onChange: (value: string, group: string, name: string) => void;
  group: string;
  name: string;
  error?: boolean;
  disabled?: boolean;
};

const RadioGroupProgress: React.FC<RadioGroupProgressProps> = ({
  options,
  value,
  onChange,
  group,
  name,
  error = false,
  disabled = false,
}) => {
  const handleRadioChange = (selected: string) => {
    if (!disabled) {
      onChange(selected, group, name);
    }
  };

 return (
  <div className={`flex flex-col gap-2 ${error ? 'border border-red-500 p-2 rounded' : ''}`}>
    {options.map((opt, index) => (
      <Radio
        key={index}
        id={`${opt}-radio-${index}`}
        name={name}
        value={opt}
        checked={value === opt}
        onChange={() => onChange(opt, group, name)} // pakai langsung onChange prop
        label={opt}
        disabled={disabled}
     
      />
    ))}
  </div>
);

};

export default RadioGroupProgress;

