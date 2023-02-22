import React, { useState } from 'react';

import '../App.css';
import '../Component.css';

export default function InputBox({ label = 'Title', value }) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="input-container">
      <label className="input-title" htmlFor="input-box">
        {label}
      </label>
      <input
        className="base-component input-box"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
