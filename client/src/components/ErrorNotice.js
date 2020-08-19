import React from "react";

export default function ErrorNotice(props) {
  return (
    <div className="error-notice">
      <span>{props.message}</span>
      <span className="close" onClick={props.clearError}>X</span>
    </div>
  );
}