import quickgradelogo from "../../../assets/quick_grade_logo_with_text_blue.png";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import MainButton from "../../../components/buttons/mainButton";
import axiosInstance from "../../../utils/axiosInstance";
import { IoChevronBack } from "react-icons/io5";

interface ForgotPasswordProps {
  location: string;
}
export function ForgotPassword(props: ForgotPasswordProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const handleUserEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail((event.currentTarget as HTMLInputElement).value);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const currentRoute = location.pathname;
    const baseURL = currentRoute.startsWith("/students")
      ? "/students"
      : currentRoute.startsWith("/lecturers")
      ? "/lecturers"
      : "";
    try {
      const res = location.pathname.startsWith("/students")
        ? await axiosInstance.post("/students/reset-password", { email })
        : location.pathname.startsWith("/lecturers")
        ? await axiosInstance.post("/lecturers/reset-password", { email })
        : null;

      // checking the response
      if (res && res.status === 200) {
        if (res.data.userNotFoundError) {
          navigate(`${baseURL}/forgot-password`);
        } else if (res.data.linkSentSuccessfully) {
          navigate(`${baseURL}/reset-password/check-your-email`);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="items-center max-w-[500px] mx-auto">
      <header className="text-center mt-[1rem] flex justify-center md:mt-[5rem]">
        <img src={quickgradelogo} alt="Quickgrade Logo" />
      </header>

      <div className="shadow-lg p-4 justify-center items-center mt-[5rem] border border-white rounded-md mx-4">
        <h1 className="font-PoppinsSemiBold my-[0.5rem] text-center">Forgot Password</h1>
        <p className="text-[12px] text-primaryVar mb-[1rem] font-PoppinsBold">
          Enter the email associated with your account and we’ll send an email
          with instruction to reset your password
        </p>
        <label className="mb-[1.5rem]">Email:</label>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter your email"
            required
            className="w-full border border-[#D0D5DD] rounded-[8px] p-3 mt-2"
            value={email}
            onChange={handleUserEmail}
          />
        </form>
        <MainButton
          button_text="Forgot Password"
          className="mt-[3rem] w-full text-center"
        />
        <Link to={props.location} className=" text-[12px] text-primaryVar ">
          <span className="text-center flex mt-[2rem] cursor-pointer">
            <IoChevronBack size={18} />
            Back to Login
          </span>
        </Link>
      </div>
    </div>
  );
}
