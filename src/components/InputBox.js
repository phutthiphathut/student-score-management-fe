import React, { useState } from 'react';

import '../App.css';
import '../Component.css';

export default function InputBox({
  label,
  value,
  placeholder,
  name,
  onValueChange,
  type = 'text',
  error = false,
  errMessage = 'Invalid'
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;

    setInputValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div className="input-container">
      <label className="input-title" htmlFor="input-box">
        {label}
      </label>
      <input
        className="base-component input-box"
        name={name}
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      {error && <h3 className="input-error-msg">{errMessage}</h3>}
    </div>
  );
}
