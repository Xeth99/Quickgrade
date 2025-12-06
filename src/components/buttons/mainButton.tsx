interface MainButtonProps {
  button_text: string;
  className?: string;
  disabled?: boolean;
}
export default function MainButton({
  button_text,
  className,
  disabled,
}: MainButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`bg-primaryVar rounded-md text-white p-2 ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${className}`}
    >
      {button_text}
    </button>
  );
}
