import { ToastOptions, toast } from "react-toastify";

export const notify = (message: string, type?: "success" | "error" | null) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  if (type === "success") {
    return toast.success(message, options);
  }

  if (type === "error") {
    return toast.error(message, options);
  }
  return toast(message, options)
};