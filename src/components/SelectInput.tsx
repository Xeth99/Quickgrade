import React, { useState } from "react";
import { useField } from "formik";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface SelectInputProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  placeholder: string;
}

const SelectInputWithLabel: React.FC<SelectInputProps> = ({
  name,
  options,
  label,
  placeholder,
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    helpers.setValue(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className="relative pb-4">
      {label && (
        <div>
          <label className="text-[14px]" htmlFor={name}>
            {label}
          </label>
        </div>
      )}
      <div
        className="relative border w-full p-3 rounded-[8px] cursor-pointer outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`w-full text-[14px] ${isOpen ? "border-2" : ""} ${
            field.value ? "text-[#6B6B6B]" : "text-[#6B6B6B]"
          }`}
        >
          {field.value &&
          options.some((option) => option.value === String(field.value)) ? (
            options.find((option) => option.value === String(field.value))
              ?.label || placeholder
          ) : (
            <span className="text-[#6B6B6B]">{placeholder}</span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white text-textcolor outline-none mt-1 shadow-lg overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-primaryVar hover:text-white ${
                index === 0 ? "rounded-t-[8px]" : ""
              } ${index === options.length - 1 ? "rounded-b-[8px]" : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {meta.touched && meta.error ? (
        <div className="text-error text-[12px]">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectInputWithLabel;
