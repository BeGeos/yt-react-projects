import React, { useRef } from "react";

// Utility functions
import { getClassName, getIcon } from "../utils/utils.form";

const checkUsername = (username) => {
  return username.trim().length >= 6 && !username.match(/\s+/);
};

export default function UsernameField({ status, setStatus }) {
  let username = useRef("");
  return (
    <div className="form__input">
      <label htmlFor="username" className="small">
        Username
      </label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => {
          username.current = e.target.value;
          if (checkUsername(username.current)) {
            return setStatus("valid");
          }
          return setStatus("");
        }}
      />
      <div className={getClassName(status)}>
        {getIcon(status)}
        <span>At least 6 characters</span>
      </div>
    </div>
  );
}
