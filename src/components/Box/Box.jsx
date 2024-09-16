import React from "react";
import "./Box.css";

export default function Box({ title, description }) {
  return (
    <div className="box">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
