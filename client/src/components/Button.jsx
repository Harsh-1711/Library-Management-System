// src/components/Button.jsx
import React from 'react';

const Button = ({ onClick, type, text, className }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
