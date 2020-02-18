import React from "react";
import csv from 'csv';

// import { helloWorld } from "../client/actions/api";
import FileUploader from "../client/components/file_uploader";

class CSVUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: false
    };

    this.handleUpload = this.handleUpload.bind(this); 
    // do this if upload function is going to change the state
  }

  handleUpload() {
    this.uploadedFile = true;
    //TODO: 
    csv.parse()
    
  }

  render() {
    const { uploadedFile } = this.state;

    return (
      <>
        <div className="container">
          <div>
            <div>
              <bold className="label">Title:</bold>
              <input className="text-field" placeholder="Type here" />
            </div>
            {uploadedFile && (
              <div>
                <bold className="label">Upload:</bold>
                <FileUploader onChange={this.handleUpload} />
              </div>
            )}
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
  }
}

export default CSVUpload;
