import { FC } from "react";
import { Field, ErrorMessage } from "formik";

interface SelectInputProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}
const SelectInputExam: FC<SelectInputProps> = ({
  name,
  label,
  options,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      <Field as="select" name={name} className="border rounded p-2">
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Field>

      <ErrorMessage
        name={name}
        component="div"
        className="text-error text-xs"
      />
    </div>
  );
};

export default SelectInputExam;
