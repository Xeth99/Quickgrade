import axiosInstance from "../../../utils/axiosInstance";
import { LeftImageWrapper } from "./Login_background";
import Footer from "../../footer/footer";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import MainButton from "../../../components/buttons/mainButton";
import { BiHide, BiShow } from "react-icons/bi";
interface Props {
  id_or_email: string;
  placeholder: string;
  form_title: string;
  backgroundimage: string;
  userType: string;
}

export function LoginPage(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const currentRoute = location.pathname;

  const handleUserID = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId((event.currentTarget as HTMLInputElement).value);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword((event.currentTarget as HTMLInputElement).value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!userId || !password) {
      setError("All fields are required, try again");
      return;
    }

    try {
      const baseURL = currentRoute.startsWith("/students")
        ? "/students"
        : currentRoute.startsWith("/lecturers")
        ? "/lecturers"
        : "";
      const res = currentRoute.startsWith("/students")
        ? await axiosInstance.post("/students/login", {
            matricNo: userId,
            password: password,
          })
        : currentRoute.startsWith("/lecturers")
        ? await axiosInstance.post("/lecturers/login", {
            employeeID: userId,
            password: password,
          })
        : null;
      if (res && res.status === 200) {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate(`${baseURL}/dashboard`);
        } else if (res.data.inValidPassword) {
          setError("Invalid password");
          setUserId("");
          setPassword("");
        } else if (res.data.studentNotFoundError) {
          setError("Student not found, invalid registration number");
          setUserId("");
          setPassword("");
        } else if (res.data.lecturerNotFoundError) {
          setError("Lecturer not found, invalid employee id");
          setUserId("");
          setPassword("");
        }
      } else {
        setError("Internal Server Error");
      }
    } catch (error) {
      setError("Internal Server Error");
    }

    // redirect to a different page based on user type
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="h-screen flex-col overflow-y-hidden items-center">
      <div className="h-[90%] flex">
        <LeftImageWrapper
          backgroundpic={props.backgroundimage}
          className="hidden md:flex"
        >
          <div>
            <h1 className="text-[2rem] text-secondary">
              Camouflage University
            </h1>
            <p className="text-white text-[1rem]">
              Inspiring greatness through education
            </p>
          </div>
        </LeftImageWrapper>

        <div className="h-full w-full md:w-[50%] relative">
          <form
            className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 h-[80%] w-[70%] bg-[#f9fafb] align-left"
            onSubmit={handleSubmit}
          >
            <Link to="/">
              <i className="fa-solid fa-house home-btn text-primaryVar"></i>
            </Link>
            <h1 className="text-[1.5rem] mb-4 md:text-[2rem]">
              Sign in to Quickgrade
            </h1>

            <div className="mb-4">
              <label className="block mt-[0.7rem] mb-[0.5rem] text-[1rem]">
                {props.id_or_email}
              </label>
              <input
                className="border-[1px] border-[#bdbdbd] w-[100%] h-[3rem] rounded p-[1rem]"
                type="text"
                value={userId}
                onChange={handleUserID}
                placeholder={props.placeholder}
              />
              {error && (
                <div className="text-[0.5rem] text-error"> {error} </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block mt-[0.7rem] mb-[0.5rem] text-[1rem]">
                Password
              </label>
              <div className="flex h-[3rem] border-[1px] border-[#bdbdbd] rounded p-[1rem] w-[100%]">
                <input
                  className="flex-1 outline-none"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={handlePassword}
                  placeholder="Enter password"
                />
                {showPass ? (
                  <BiShow
                    size={20}
                    onClick={handleShowPass}
                    className="text-primaryVar cursor-pointer"
                  />
                ) : (
                  <BiHide
                    size={20}
                    onClick={handleShowPass}
                    className="text-primaryVar cursor-pointer"
                  />
                )}
              </div>
              {error && (
                <div className="text-[0.5rem] text-error"> {error} </div>
              )}
              <Link
                className="text-primaryVar text-[0.8rem]"
                to={props.userType}
              >
                {" "}
                Forgot password?
              </Link>
            </div>
            <MainButton button_text="Sign in" className="w-full" />
            <div className="text-[12px]  mt-[1rem]">
              Don't have an account?{" "}
              <Link
                to={
                  currentRoute === "/lecturers"
                    ? "/lecturers/signup"
                    : "/students/signup"
                }
                className="text-primaryVar underline"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
