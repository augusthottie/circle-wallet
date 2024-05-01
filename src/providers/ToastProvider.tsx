import { ToastContainer, ToastOptions } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  return (
    <>
      <ToastContainer
        position={toastOptions.position}
        autoClose={toastOptions.autoClose}
        hideProgressBar={toastOptions.hideProgressBar}
        closeOnClick={toastOptions.closeOnClick}
        rtl={toastOptions.rtl}
        pauseOnFocusLoss={toastOptions.pauseOnFocusLoss}
        draggable={toastOptions.draggable}
        pauseOnHover={toastOptions.pauseOnHover}
      />
      {children}
    </>
  );
};
