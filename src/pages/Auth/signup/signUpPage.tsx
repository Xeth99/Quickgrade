import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../footer/footer";
import MainButton from "../../../components/buttons/mainButton";
import { Form, Formik } from "formik";
import { studentSchema } from "../../../utils/ValidationSchema";
import pagepic from "../../../assets/loginBackground.png";
import axiosInstance from "../../../utils/axiosInstance";
import ToastComponent from "../../../components/notifications/Notifications";
import LightAuthInput from "../../../components/LightAuthInput";
import SelectInputWithLabel from "../../../components/SelectInput";
import { useState } from "react";

function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (
    values: any,
    {
      setFieldValue,
    }: {
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
      ) => void;
    }
  ) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      faculty: values.faculty,
      department: values.department,
    };
    try {
      const res = await axiosInstance.post("/student/signup", payload);
      ToastComponent.success(res.data.message);
      navigate("/verify-email");
      if (payload.email === "student") {
        navigate("/students/confirm-email");
      }
    } catch (error: any) {
      ToastComponent.error(error.response.data.message);
      setFieldValue("password", "");
    } finally {

    }
  };
  return (
    <>
      <div className="min-h-screen w-full flex flex-col">
        <div className="flex flex-col md:flex-row flex-1 md:mb-5">
          <div className="w-[50%] hidden md:flex justify-center relative">
            <img
              src={pagepic}
              alt="Signup Page Photo"
              className="h-full w-full object-cover"
            />
            <div className="absolute top-8 left-8">
              <h4 className="text-[2rem] text-secondary text-left">
                Camouflage University
              </h4>
              <h2 className="text-textcolor text-[1rem]">
                Inspiring greatness through education.
              </h2>
            </div>
          </div>

          <div className="w-full md:w-[50%] h-full flex justify-center px-[5%]">
            <div className="w-full max-w-[500px] py-5">
              <Link to="/" className="text-primaryVar">
                <i className="fa-solid fa-house home-btn "></i>
              </Link>
              <div className="text-[1.5rem] mb-4 md:text-[2rem]">
                Create QuickGrade Account
              </div>

              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                }}
                validationSchema={studentSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, dirty }) => (
                  <Form className="flex flex-col gap-4 mt-4">
                    <LightAuthInput
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                    <LightAuthInput
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                    <LightAuthInput
                      label="Email"
                      name="email"
                      type="text"
                      placeholder="Email"
                    />
                    <SelectInputWithLabel
                      name="faculty"
                      options={[
                        {
                          value: "Faculty of Science",
                          label: "Faculty of Science",
                        },
                        {
                          value: "Faculty of Engineering",
                          label: "Faculty of Engineering",
                        },
                      ]}
                      label="Faculty"
                      placeholder="Select Faculty"
                    />
                    <SelectInputWithLabel
                      name="department"
                      options={[
                        {
                          value: "Department of Science",
                          label: "Department of Science",
                        },
                        {
                          value: "Department of Engineering",
                          label: "Department of Engineering",
                        },
                      ]}
                      label="Department"
                      placeholder="Select Department"
                    />
                    <LightAuthInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="password"
                    />
                    <MainButton
                      disabled={!isValid || !dirty}
                      button_text="Sign up"
                      className="w-full"
                    />
                  </Form>
                )}
              </Formik>
              <div className="text-textcolor mt-4">
                Already have an account? Sign in {" "}
                <Link to="/login" className="text-primaryVar underline">
                  {" "}
                  here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUpPage;
