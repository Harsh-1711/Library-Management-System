import React from "react";

function Button({ type, label, onClick, className }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
