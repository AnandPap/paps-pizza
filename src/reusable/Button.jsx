import React from "react";
import "./Buttons.css";

const Button = ({ className, onClick, title, type, text }) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      title={title}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
