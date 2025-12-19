import { Field, ErrorMessage } from "formik";
import { FC } from "react";

interface RadioOption {
  label?: string;
  value?: string | number;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  className?: string;
  direction?: "row" | "col";
  checked?: string | boolean;
  value?: string;
  onChange?: (e: any) => void;
}

const RadioInput: FC<RadioGroupProps> = ({
  name,
  label,
  options,
  className = "",
  direction = "col",
  checked,
  onChange,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        role="group"
        className={`flex ${
          direction === "row" ? "flex-row gap-6" : "flex-col gap-3"
        }`}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Field
              type="radio"
              name={name}
              value={String(option.value)}
              // checked={checked === String(option.value)}
              className="h-4 w-4 accent-primaryVar cursor-pointer"
            />
            <span className="text-sm text-gray-700">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-error text-xs"
      />
    </div>
  );
};

export default RadioInput;
