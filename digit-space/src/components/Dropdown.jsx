import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const Dropdown = ({
  label,
  name,
  required,
  options,
  defaultValue = "",
  readonly,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const optionsSelect = [["", "Seleccione", true], ...Object.entries(options)];

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <label htmlFor={name} className="flex flex-col my-3">
      <span>{label}</span>
      <select
        required={required}
        name={name}
        className="input"
        value={selectedValue}
        readonly={readonly}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {optionsSelect.map((o) => {
          return (
            <option key={nanoid()} value={o[0]} disabled={o[2] ?? false}>
              {o[1]}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default Dropdown;
