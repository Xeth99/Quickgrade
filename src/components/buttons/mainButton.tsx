interface MainButtonProps {
  button_text: string;
  className?: string;
  disabled?: boolean;
}
export default function MainButton(props: MainButtonProps) {
  return (
    <button type="submit" className="bg-primaryVar rounded-md text-white p-2">
      {props.button_text}
    </button>
  );
}
