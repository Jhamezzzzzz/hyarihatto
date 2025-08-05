import React from 'react';

interface ButtonSubmitProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  showError?: boolean; // ✅ tambahkan prop ini
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ label, onClick, disabled, showError }) => {
  return (
    <div className="text-center col-span-12">
      <button
        className={`mt-4 px-2 py-1 rounded-md w-full font-extrabold text-lg 
          ${disabled ? 'bg-gray-200 text-gray-500' : 'bg-green-200 text-black'}
          ${showError ? 'border-2 border-red-500' : ''}
        `}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
      {showError && (
        <p className="mt-1 text-sm text-red-600 font-medium">
          Harap isi alasan sebelum mengirim
        </p>
      )}
    </div>
  );
};

export default ButtonSubmit;
