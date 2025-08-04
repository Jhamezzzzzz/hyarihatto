import React, { useState, useRef, useEffect } from "react";
import { CalenderIcon } from "../../icons";

type YearPickerProps = {
  value: number;
  minYear?: number;
  maxYear?: number;
  onChange: (year: number) => void;
  placeholder?: string;
  className?: string;
};

const YearPicker: React.FC<YearPickerProps> = ({
  value,
  minYear = 1980,
  maxYear = new Date().getFullYear(),
  onChange,
  placeholder = "Select year",
  className
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
    <div className={`${className} relative w-60`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={` w-full py-2.5 h-11 px-4 border border-gray-300 text-sm dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-primary1/30`}
      >
        {selectedYear ? <span className="text-black dark:text-gray-300">{selectedYear}</span> : <span className="text-gray-400">{placeholder}</span>}
      </button>

      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
        <CalenderIcon className="size-6" />
      </span>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
          {years.map((year) => (
            <div
              key={year}
              onClick={() => handleYearClick(year)}
              className={`px-4 py-2 cursor-pointer dark:text-white ${
                selectedYear === year ? "bg-brand-500 text-white font-semibold" : "hover:bg-gray-100 dark:hover:bg-gray-400"
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
