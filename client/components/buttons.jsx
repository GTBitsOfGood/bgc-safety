import React from "react";

export const UploadButton = (props) => (
  <button className={`btn btn-success ${props.className}`}>{props.children}</button>
);

export const CancelButton = (props) => (
  <button className={`btn btn-danger ${props.className}`}>{props.children}</button>
);
