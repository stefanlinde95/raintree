import { useEffect } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

const ToastWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage);

      window.history.replaceState({}, document.title);
    }

    if (location.state?.errorMessage) {
      toast.error(location.state.errorMessage);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return <>{children}</>;
};

export default ToastWrapper;
