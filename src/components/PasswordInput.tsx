import { ErrorMessage, Field } from "formik";
import { FC } from "react";
import { BiShow, BiHide } from "react-icons/bi";

interface PasswordInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  show: boolean;
  toggleShow: () => void;
  className?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({
  name,
  label,
  placeholder,
  show,
  toggleShow,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-[#101828] text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <Field
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete="off"
          className="sm:p-3 p-2.5 w-full text-textcolor focus:border-primary text-[14px] outline-none border-[1.5px] rounded-[8px] pr-10"
        />

        {/* Icon inside input (absolute positioned) */}
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-primaryVar"
          onClick={toggleShow}
        >
          {show ? <BiShow size={20} /> : <BiHide size={20} />}
        </span>
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-error text-[0.8rem]"
      />
    </div>
  );
};

export default PasswordInput;
