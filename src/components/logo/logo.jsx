import React from "react";
import logo from "../../assets/ae-300x132.jpg";
import "./logo.css";

function Logo() {
  return (
    <a href="https://www.ae.ca/" target="_blank" rel="noopener noreferrer">
      <img src={logo} className="logo" />
    </a>
  );
}

export default Logo;
