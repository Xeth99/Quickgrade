import { useState, FormEvent, ChangeEvent } from "react";
import quickgradelogo from "../../assets/quick_grade_logo_with_text.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import MainButton from "../../components/buttons/mainButton";
import bgImage from "../../assets/landing-background.svg";

function LandingPage() {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const handleUserRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserRole((event.currentTarget as HTMLSelectElement).value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axiosInstance.get(`/${userRole}`);

      if (res.status === 200 && res.data.role === "lecturer") {
        navigate("/lecturers/signin");
      } else if (res.status === 200 && res.data.role === "student") {
        navigate("/students/signin");
      }
    } catch (error) {
      console.log("error", error);
    }

    // redirect to a different page based on user type
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-cover bg-no-repeat pt-[30px] flex flex-col relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex flex-col h-[90%]">
          <div className="w-[60%] mx-auto mb-[40px] mt-[2rem]">
            <div className="w-[65%] mx-auto flex items-center justify-center">
              <img src={quickgradelogo} alt="Logo" />
            </div>
            <div>
              <h4 className="text-tertiary text-center text-[16px] mx-auto">
                Unlock your exam potential with our management system.
              </h4>
            </div>
          </div>

          <div className="w-[80%] sm:w-[70%] md:w-[50%] lg:w-[35%] bg-white mx-auto px-[60px] py-[20px] rounded-[16px]">
            {/* Form */}
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <div className=" gap-1 flex flex-col w-full mb-[30px]">
                <label
                  className="w-full text-[#101828] text-left"
                  htmlFor="userRole"
                >
                  Sign in As:
                </label>

                <select
                  className="border border-[#bdbdbd] rounded-md p-2 outline-none"
                  id="userRole"
                  name="userRole"
                  value={userRole}
                  onChange={handleUserRoleChange}
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="lecturer">Lecturer</option>
                  <option value="student">Student</option>
                </select>
              </div>

              {/* <button
                type="submit"
                className="bg-primaryVar rounded-md text-white py-2"
              >
                Get Started
              </button> */}
              <MainButton button_text="Get Started" />

              <p className="text-black text-[14px] mt-4">
                Don't have an account? Register{" "}
                <Link
                  to="/students/signup"
                  className="text-primaryVar cursor-pointer font-medium"
                >
                  here
                </Link>
              </p>
            </form>
          </div>
        </div>

        <Footer className="text-white" />
      </div>
    </>
  );
}

export default LandingPage;
