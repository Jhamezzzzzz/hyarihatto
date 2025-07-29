import React, { useState, useRef, useEffect } from "react";

type YearPickerProps = {
  value: number;
  minYear?: number;
  maxYear?: number;
  onChange: (year: number) => void;
  placeholder?: string;
};

const YearPicker: React.FC<YearPickerProps> = ({
  value,
  minYear = 1980,
  maxYear = new Date().getFullYear(),
  onChange,
  placeholder = "Select year"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setIsOpen(false);
    onChange?.(year);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-40" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-primary1/30"
      >
        {selectedYear ? <span>{selectedYear}</span> : <span className="text-gray-400">{placeholder}</span>}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {years.map((year) => (
            <div
              key={year}
              onClick={() => handleYearClick(year)}
              className={`px-4 py-2 cursor-pointer  ${
                selectedYear === year ? "bg-brand-500 text-white font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearPicker;
