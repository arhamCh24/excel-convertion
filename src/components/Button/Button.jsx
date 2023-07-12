import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="text-white px-5 mr-3 bg-blue-500 hover:bg-blue-700 text-lg rounded-lg"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
