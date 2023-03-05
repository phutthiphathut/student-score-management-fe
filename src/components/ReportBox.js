import React, { useEffect, useState } from 'react';

import NormalButton from './NormalButton';

import '../App.css';
import '../Component.css';

export default function ReportBox({
  title,
  value,
  placeholder,
  onValueChange,
  onSubmit
}) {
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;

    setInputValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div className="report-box-container column-container">
      <div className="report-title-container row-container">
        <h1>{title}</h1>
      </div>
      <textarea
        className="base-component text-area-box"
        rows="10"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      <div className="row-container right">
        <NormalButton label="Submit" onClick={onSubmit}></NormalButton>
      </div>
    </div>
  );
}
