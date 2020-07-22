import React from "react";
import "./App.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="footer-middle"></div>
      <div className="container"></div>
      <div className="row"></div>
      <h4 id="text">
        {new Date().getFullYear()} Alexander Keeley - All Rights Reserved
      </h4>
    </div>
  );
}

export default Footer;
