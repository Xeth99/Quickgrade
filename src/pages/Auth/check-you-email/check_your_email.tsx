import quickgradelogo from "../../../assets/quick_grade_logo_with_text_blue.png";
import { Link } from "react-router-dom";

interface CheckYourEmailProps {
  information: string;
  location: string;
  location_text: string;
}
export function CheckYourEmail(props: CheckYourEmailProps) {
  return (
    <div className="items-center mx-auto max-w-[400px] mt-4 justify-center">
      <header className="items-center mt-[1rem] flex justify-center">
        <img src={quickgradelogo} alt="Quickgrade Logo" />
      </header>

      <div className="shadow-lg justify-center p-4 my-[8rem] items-center">
        <h1 className="text-center font-semibold mb-4">Check your Email</h1>
        <p className="text-primaryVar text-[12px]">{props.information}</p>
        <div className="bg-primaryVar p-2 w-full text-white rounded mt-4 text-center">
          <Link to={props.location}> {props.location_text}</Link>
        </div>
      </div>
    </div>
  );
}
