import React, { useRef } from "react";
import { getIcon, getClassName } from "../utils/utils.form";

const checkPasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

const checkPassword = (password) => {
  let charRegexp = new RegExp(/[a-z]+/, "i");
  let numRegexp = new RegExp(/\d+/);
  let symRegexp = new RegExp(/\W+/);
  let spaceRegexp = new RegExp(/\s+/);

  let output = {
    validChar: password.match(charRegexp),
    validNum: password.match(numRegexp),
    validSym: password.match(symRegexp),
    validSpace: !password.match(spaceRegexp),
    validLen: password.trim().length >= 8,
  };

  return output;
};

export default function PasswordField({
  status,
  setStatus,
  confirmStatus,
  setConfirmStatus,
}) {
  const password = useRef("");
  const confirmPassword = useRef("");

  return (
    <>
      <div className="form__input">
        <label htmlFor="password" className="small">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            password.current = e.target.value;
            let check = checkPassword(password.current);
            let _status = {
              charCheck: check.validChar ? "valid" : "",
              numCheck: check.validNum ? "valid" : "",
              symCheck: check.validSym ? "valid" : "",
              spaceCheck: check.validSpace ? "valid" : "",
              lenCheck: check.validLen ? "valid" : "",
            };

            if (!_status.spaceCheck) return;

            setStatus(_status);

            if (
              confirmPassword.current !== "" &&
              !checkPasswordMatch(password.current, confirmPassword.current)
            ) {
              setConfirmStatus("");
            } else if (
              confirmPassword.current !== "" &&
              checkPasswordMatch(password.current, confirmPassword.current)
            ) {
              setConfirmStatus("valid");
            }
          }}
        />
        <div className={getClassName(status.lenCheck)}>
          {getIcon(status.lenCheck)}
          <span>At least 8 characters</span>
        </div>
        <div className={getClassName(status.charCheck)}>
          {getIcon(status.charCheck)}
          <span>Must containe letters</span>
        </div>
        <div className={getClassName(status.numCheck)}>
          {getIcon(status.numCheck)}
          <span>Must contain numbers</span>
        </div>
        <div className={getClassName(status.symCheck)}>
          {getIcon(status.symCheck)}
          <span>Must contain symbols</span>
        </div>
      </div>

      <div className="form__input">
        <label htmlFor="confirm-password" className="small">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          onChange={(e) => {
            confirmPassword.current = e.target.value;
            if (checkPasswordMatch(password.current, confirmPassword.current)) {
              return setConfirmStatus("valid");
            }
            return setConfirmStatus("");
          }}
        />
        <div className={getClassName(confirmStatus)}>
          {getIcon(confirmStatus)}
          <span>Passwords match</span>
        </div>
      </div>
    </>
  );
}
