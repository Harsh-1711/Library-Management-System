// src/components/InputField.jsx
import React from 'react';

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
