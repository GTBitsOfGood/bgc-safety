import React from "react";

const UploadContainer = (props) => (
  <div className="upload-container">
    {props.children}
  </div>
);

export const FileUploader = (props) => (
  <UploadContainer>
    <input type="file" accept="csv" />
  </UploadContainer>
);
