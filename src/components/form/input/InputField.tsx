import type React from "react";
import { useCallback, type FC } from "react";
import { FaTimes } from "react-icons/fa";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  endIcon?: React.ReactNode;
  clearable?: boolean;
}

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  endIcon,
  clearable
}) => {

  let inputClasses = ` h-11 w-full bg-white rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (error && disabled) {
    inputClasses += ` text-gray-500 border-error-500! opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (error) {
    inputClasses += `border-error-500 border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
  }

  const clearInput = useCallback(() => {
    if (onChange) {
      // Create a new synthetic event object to pass to the onChange handler.
      // This is necessary because the Input component is controlled by its parent.
      const syntheticEvent = {
        target: {
          value: ""
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  }, [onChange]);

  return (
    <div className="relative w-full sm:w-auto">
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`${inputClasses} ${(endIcon || clearable) ? "pr-10" : ""} ${(endIcon && clearable) ? "pr-14" : ""}`}
        />
        {endIcon && (<span className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-300">{endIcon}</span>)}
        {(clearable && value !== "") && (<button onClick={clearInput} className={`absolute top-1/2 -translate-y-1/2 ${endIcon ? "right-10" : "right-4"} `}><FaTimes/></button>)}
      </div>

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
