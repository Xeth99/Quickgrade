import { ErrorMessage, Field } from "formik";
import { FC } from "react";

interface LightAuthInputProps {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onInput?: (e: any) => void;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
}

const LightAuthInput: FC<LightAuthInputProps> = ({
  name,
  type,
  placeholder,
  label,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-[#101828] text-sm font-medium">
          {label}
        </label>
      )}
      <Field
        label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className="sm:p-3 p-2.5 w-full text-textcolor focus:border-primary text-[14px] outline-none border-[1.5px] rounded-[8px]"
      ></Field>
      <ErrorMessage name={name} component="div" className="text-error" />
    </div>
  );
};

export default LightAuthInput;
