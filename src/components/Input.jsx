import React from "react";

const Input = ({ label, name, defaultValue, type, required, readonly }) => {
  return (
    <label htmlFor={name} className="flex flex-col my-3">
      <span>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        className="input"
        defaultValue={defaultValue}
        readonly={readonly}
      />
    </label>
  );
};

export default Input;
