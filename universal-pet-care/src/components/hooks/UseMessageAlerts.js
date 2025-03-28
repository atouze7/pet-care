import { useState } from "react";
import { useAlertWithTimeout } from "../uitls/utilities";

const UseMessageAlerts = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useAlertWithTimeout();
  const [showSuccessAlert, setShowSuccessAlert] = useAlertWithTimeout();
  return {
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  };
};

export default UseMessageAlerts;
