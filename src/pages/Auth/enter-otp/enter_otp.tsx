import quickgradelogo from "../../../assets/quick_grade_logo_with_text_blue.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import MainButton from "../../../components/buttons/mainButton";

function EnterOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const handleUserOtp = (event: ChangeEvent<HTMLInputElement>) => {
    setOtp((event.currentTarget as HTMLInputElement).value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("otp: ", otp);
    try {
      const currentRoute = location.pathname;
      const baseURL = currentRoute.startsWith("/students")
        ? "/students"
        : currentRoute.startsWith("/lecturers")
        ? "/lecturers"
        : "";
      const res = currentRoute.startsWith("/students")
        ? await axiosInstance.post("/students/verify-otp", { otp })
        : currentRoute.startsWith("/lecturers")
        ? await axiosInstance.post("/lecturers/verify-otp", { otp })
        : null;

      console.log("currentRoute: ", currentRoute);

      // checking the response
      if (res && res.status === 200) {
        if (
          res.data.invalidOtp ||
          res.data.expiredOtpError ||
          res.data.internalServerError
        ) {
          navigate(`${baseURL}/confirm-email`);
        } else if (res.data.OtpVerificationSuccess) {
          navigate(`${baseURL}/check-your-email`);
        }
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }

    // redirect to a different page based on user type
  };
  return (
    <div className="items-center max-w-[500px] mx-auto">
      <header className="text-center mt-[1rem] flex justify-center md:mt-[5rem]">
        <img src={quickgradelogo} alt="Quickgrade Logo" />
      </header>

      <div className="shadow-lg p-4 justify-center items-center mt-[5rem] border border-white rounded-md mx-4">
        <h1 className="text-center my-[1.5rem] text-lg">Verify OTP</h1>
        <span className="mb-[1.5rem]">
          {" "}
          <label>Enter the OTP sent to your email:</label>
        </span>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={handleUserOtp}
            className="w-full border border-[#D0D5DD] rounded-[8px] p-3 mt-2"
          />
        </form>
        <MainButton
          button_text="Submit"
          className="mt-[3rem] w-full text-center"
        />
      </div>
    </div>
  );
}

export default EnterOtp;
