import React from "react";
import axios from "axios";
import Cookie from "js-cookie";

import FileUploader from "../client/components/file_uploader";
import { getAuth } from "../server/mongodb/actions/User";
import Unauthorized from "./unauthorized";

class CSVUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: false,
      selectedFile: "", 
      sentFile: false
    };

    //this.handleUpload = this.handleUpload.bind(this);
    // do this if upload function is going to change the state
  }

  handleUpload = (files) => {
    this.setState({selectedFile: files[0]})
    this.setState({ uploadedFile: true })
  }

  sendCsv = () => {
    console.log("Uploading...")
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    console.log(data)
    var self = this;
    axios
      .post("http://localhost:3000/api/upload_csv", data)
      .then(function(response) {
        console.log("Uploaded file!! ... ")
        self.setState({ uploadedFile: false })
        self.setState({ sentFile: true })
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  clearFile = () => {
    console.log("Clearing file");
    this.setState({selectedFile: undefined})
    this.setState({ uploadedFile: false })
  }

  render() {
    const token = Cookie.get("token");

    getAuth("CSV_Upload", token)
    .then(() => {
      const { uploadedFile } = this.state;
      const { sentFile } = this.state;

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
                {!(uploadedFile || sentFile) && (
                  <FileUploader onChange={files => this.handleUpload(files)} />
                )}
                {uploadedFile && (
                  <div className="uploaded-container">
                    <div className="file-upload">
                      <i className="fa fa-check" />
                      Received File! Click "Upload" to submit
                    </div>
                  </div>
                )}
                {sentFile && (
                  <div className="uploaded-container">
                    <div className="file-upload">
                      <i className="fa fa-check" />
                      File Uploaded!
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="button-container">
              <button type="button" className="btn btn-danger" onClick={this.clearFile}>
                Cancel
              </button>
              <button type="button" className="btn btn-success" onClick={this.sendCsv}>
                Upload
              </button>
            </div>
          </div>
        </>
      );
    }).catch(error => {
      return Unauthorized;
    })
  }
}

export default CSVUpload;
