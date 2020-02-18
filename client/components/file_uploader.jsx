import React from "react";

const FileUploader = () => (
  <div className="upload-container">
    <label htmlFor="file-upload" className="file-upload">
      <i className="fa fa-plus" />
      Click to upload CSV
      <input id="file-upload" type="file" accept="csv" />
    </label>
  </div>
);

export default FileUploader;
