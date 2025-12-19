import { FC } from "react";
import { MoonLoader } from "react-spinners";
interface AuthButtonProps {
  isLoading: boolean;
  disabled: boolean;
  children: any;
  onClick?: () => void;
  className?: string;
}
const AuthButton: FC<AuthButtonProps> = ({
  isLoading,
  disabled,
  children,
  onClick,
  className,
}) => {
  const baseStyles =
    "sm:p-3 p-2.5 rounded-[8px] w-full font-PoppinsBold text-[14px] flex justify-center items-center";
  const enabledStyles = "bg-primaryVar text-white";
  const disabledStyles =
    "bg-disabled text-disabledtext cursor-not-allowed";

  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${baseStyles} ${disabled ? disabledStyles : enabledStyles} ${className}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <MoonLoader color="#ffffff" size={17} />
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;