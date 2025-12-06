import quickgradelogo from "../../assets/quick_grade_logo_with_text_blue.png";
import MainButton from "../../components/buttons/mainButton";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const ResetEnterNewPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const handleUserPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword((event.currentTarget as HTMLInputElement).value);
  };
  const currentRoute = location.pathname;
  const baseURL = currentRoute.startsWith("/students")
    ? "/students"
    : currentRoute.startsWith("/lecturers")
    ? "/lecturers"
    : "";
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = currentRoute.startsWith("/students")
        ? await axiosInstance.post(`/students/reset-password/${token}`, {
            password,
            token,
          })
        : currentRoute.startsWith("/lecturers")
        ? await axiosInstance.post(`/lecturers/reset-password/${token}`, {
            password,
            token,
          })
        : null;
      if (res && res.status === 200) {
        if (res.data.invalidPasswordResetToken || res.data.tokenExpired) {
          navigate(`${baseURL}/forgot-password`);
        } else if (res.data.passwordResetSuccessful) {
          navigate(`/${baseURL}/signin`);
        }
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="max-w-[500px] justify-center items-center mx-auto">
      <div className="flex items-center justify-center mx-auto mt-[1rem]">
        <img src={quickgradelogo} alt="logo png" />
      </div>
      <div className="shadow-lg justify-center mx-4 p-2 items-center">
        <div className="">
          <h1 className="font-bold text-[20px] text-center mb-4">
            Reset Password
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="" htmlFor="password">
                New Password:
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                name="Enter your new password"
                id="password"
                required
                value={password}
                onChange={handleUserPassword}
                className="p-2 border w-full rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="re-enter-password-label"
                htmlFor="confirm-password"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                name="confirm-password"
                id="confirm-password"
                required
                className="p-2 border w-full rounded-lg"
              />
              <MainButton button_text="Reset Password" className="mt-6" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetEnterNewPasswordPage;
