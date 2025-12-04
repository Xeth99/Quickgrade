import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerComponent = {
  success: (message: string) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    }),
  error: (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    }),
  warning: (message: string) =>
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    }),
  info: (message: string) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    }),
};

export default ToastContainerComponent;
