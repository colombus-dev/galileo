import React, { useState } from 'react';

export interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  onSelect?: (option: Option) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
  label,
  placeholder = "Choisir une option",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className={`relative w-full max-w-xs ${className}`}>
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      
      {/* Bouton principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2.5 text-sm text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      >
        <span className={!selected ? "text-gray-400" : "text-gray-900"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 focus:outline-none">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 text-sm hover:bg-blue-50 transition-colors ${
                selected?.value === option.value ? 'bg-blue-100 text-blue-900 font-semibold' : 'text-gray-900'
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;