import React, { useCallback, useState, useRef } from "react";

// Components
import UsernameField from "./UsernameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

export default function Form() {
  // States
  const [usernameStatus, setUsernameStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState({});
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState("");

  const isFormValid = useRef(true);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    isFormValid.current = true;

    if (usernameStatus !== "valid") {
      isFormValid.current = false;
      setUsernameStatus("invalid");
    }

    if (emailStatus !== "valid") {
      isFormValid.current = false;
      setEmailStatus("invalid");
    }

    if (confirmPasswordStatus !== "valid") {
      isFormValid.current = false;
      setConfirmPasswordStatus("invalid");
    }

    setPasswordStatus((prev) => {
      return {
        charCheck: prev.charCheck === "valid" ? "valid" : "invalid",
        numCheck: prev.numCheck === "valid" ? "valid" : "invalid",
        symCheck: prev.symCheck === "valid" ? "valid" : "invalid",
        spaceCheck: prev.spaceCheck === "valid" ? "valid" : "invalid",
        lenCheck: prev.lenCheck === "valid" ? "valid" : "invalid",
      };
    });

    for (const value in Object.values(passwordStatus)) {
      if (value === "invalid") {
        isFormValid.current = false;
        break;
      }
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__header">
        <h2>Sign Up</h2>
      </div>
      <div className="form__body">
        <UsernameField status={usernameStatus} setStatus={setUsernameStatus} />
        <EmailField status={emailStatus} setStatus={setEmailStatus} />
        <PasswordField
          status={passwordStatus}
          setStatus={setPasswordStatus}
          confirmStatus={confirmPasswordStatus}
          setConfirmStatus={setConfirmPasswordStatus}
        />
      </div>
      <div>
        <button className="btn">Submit</button>
      </div>
    </form>
  );
}
