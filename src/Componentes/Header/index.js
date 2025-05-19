import React from "react";
import logo from "../../assets/logo.png.png";
import { Titulo } from "../ComponentesIcones";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo ColabTask" className="logo" />
        <Titulo text="ColabTask" className="titulo"/>
      </div>
    </div>
  );
}
