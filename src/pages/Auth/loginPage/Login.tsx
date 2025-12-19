import axiosInstance from "../../../utils/axiosInstance";
import Footer from "../../footer/footer";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import ToastContainerComponent from "../../../components/notifications/Notifications";
import LightAuthInput from "../../../components/LightAuthInput";
import PasswordInput from "../../../components/PasswordInput";
import AuthButton from "../../../components/AuthButton";
import lecturerImg from "../../../assets/lecturers.jpg";
import studentImg from "../../../assets/loginBackground.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentRoute = location.pathname;

  const isStudentRoute = currentRoute.startsWith("/students");
  const isLecturerRoute = currentRoute.startsWith("/lecturers");

  const baseUrl = isStudentRoute ? "/students" : "/lecturers";

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="h-screen flex-col overflow-y-hidden items-center">
      <div className="h-[90%] flex">
        <div className="hidden md:flex relative w-[50%]">
          <img
            src={isLecturerRoute ? lecturerImg : studentImg}
            alt="login background"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2">
            <h1 className="text-[2rem] text-secondary">
              Camouflage University
            </h1>
            <p className="text-white text-[1rem]">
              Inspiring greatness through education
            </p>
          </div>
        </div>

        <div className="h-full w-full md:w-[50%] relative">
          <Formik
            initialValues={{
              userId: "",
              password: "",
            }}
            onSubmit={async (values, { setErrors, resetForm }) => {
              setLoading(true);
              try {
                const endpoint = isStudentRoute
                  ? "/students/login"
                  : "/lecturers/login";
                const payload = isStudentRoute
                  ? { matricNo: values.userId, password: values.password }
                  : { employeeID: values.userId, password: values.password };

                const res = await axiosInstance.post(endpoint, payload);

                if (res.data.token) {
                  localStorage.setItem("token", res.data.token);
                  navigate(`${baseUrl}/dashboard`);
                } else if (res.data.inValidPassword) {
                  ToastContainerComponent.error(res.data.inValidPassword);
                } else if (res.data.studentNotFoundError) {
                  ToastContainerComponent.error(res.data.studentNotFoundError);
                  setErrors({
                    userId: "Student not found, invalid registration number",
                  });
                } else if (res.data.lecturerNotFoundError) {
                  ToastContainerComponent.error(res.data.lecturerNotFoundError);
                  setErrors({
                    userId: "Lecturer not found, invalid employee id",
                  });
                }
              } catch (error) {
                ToastContainerComponent.error("Internal Server Error");
                setErrors({ userId: "Internal Server Error" });
                resetForm();
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ isValid, dirty }) => (
              <Form className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 h-[80%] w-[70%] bg-[#f9fafb] align-left">
                <Link to="/">
                  <i className="fa-solid fa-house home-btn text-primaryVar"></i>
                </Link>
                <h1 className="text-[1.5rem] mb-4 md:text-[2rem]">
                  Sign in to EloQuence
                </h1>
                <LightAuthInput
                  label="Employee ID"
                  name="userId"
                  type="text"
                  placeholder="Enter employee ID"
                  className="mb-4"
                />
                <PasswordInput
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  show={showPass}
                  toggleShow={handleShowPass}
                  className="mb-4"
                />
                <AuthButton isLoading={loading} disabled={!isValid || !dirty}>
                  Sign in
                </AuthButton>
                <div className="text-[12px]  mt-[1rem]">
                  Don't have an account?{" "}
                  <Link
                    to={
                      isLecturerRoute ? "/lecturers/signup" : "/students/signup"
                    }
                    className="text-primaryVar text-[14px]"
                  >
                    Sign up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
