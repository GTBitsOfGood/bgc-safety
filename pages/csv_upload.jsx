import React from "react";

import { helloWorld } from "../client/actions/api";
import FileUploader from "../client/components/file_uploader";

const CSVUpload = () => {
  return (
    <>
      <div className="container">
        <div>
          <div>
            <bold className="label">Title:</bold>
            <input className="text-field" placeholder="Type here" />
          </div>
          <div>
            <bold className="label">Upload:</bold>
            <FileUploader />
          </div>
        </div>
        <div className="button-container">
          <button type="button" className="btn btn-danger">
            Cancel
          </button>
          <button type="button" className="btn btn-success">
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

CSVUpload.getInitialProps = async () => {
  return helloWorld()
    .then(payload => {
      return {
        message: payload
      };
    })
    .catch(error => ({
      errorMessage: error.message
    }));
};

export default CSVUpload;
