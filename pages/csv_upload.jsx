import React from "react";
import PropTypes from "prop-types";
import { Box, } from "@material-ui/core";

import { helloWorld } from "../client/actions/api";
import { UploadButton, CancelButton } from "../client/components/buttons";
import { TextField } from "../client/components/text_field";
import { FileUploader } from "../client/components/file_uploader";
import Label from "../client/components/label";

const CSVUpload = ({message, errorMessage}) => {
  return (
    <>
      <div className="container">
        <Box>
          <Label label="Title:" />
          <TextField placeholder="Type here" />
        </Box>
        <Box>
          <bold className="label">Upload:</bold>
          <FileUploader />
        </Box>
        <span>
          <UploadButton>Upload</UploadButton>
          <CancelButton>Cancel</CancelButton>
        </span>
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

CSVUpload.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string
};

CSVUpload.defaultProps = {
  message: null,
  errorMessage: null
};

export default CSVUpload;
