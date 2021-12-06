import React from "react";

const Input = ({ label, name, defaultValue, type, required, readonly }) => {
  return (
    <label htmlFor={name} className="flex flex-col my-3">
      <span> {label} </span>
      <input
        required={required}
        type={type}
        name={name}
        className="input"
        defaultValue={defaultValue}
        className="bg-gray-50 rounded-full py-1 px-4 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        readonly={readonly}
      />
    </label>
  );
};

const Textarea = ({ label, name, defaultValue, type, required }) => {
  return (
    <label htmlFor={name} className="flex flex-col my-3">
      <span> {label} </span>
      <textarea
        required={required}
        type={type}
        name={name}
        className="textarea"
        defaultValue={defaultValue}
        className="bg-gray-50 rounded-b-lg px-10 py-2 border-2 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
      />
    </label>
  );
};

export { Input, Textarea };
