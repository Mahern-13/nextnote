import React, { useState } from "react";
import "./TextInput.scss";

const TextInput = props => {
  const [active, setActive] = useState(false);
  const { id, label, value, onChange, name, disabled } = props;
  const fieldClassName = `field ${(active || value) && "active"}`;
  return (
    <div data-testid="text-input" className={fieldClassName}>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={label}
        disabled={disabled}
        onChange={onChange}
        name={name}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
export default TextInput;
