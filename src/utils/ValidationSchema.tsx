import * as yup from "yup";
export const studentSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  faculty: yup.string().required("Faculty is required"),
  department: yup.string().required("Department is required"),
});
