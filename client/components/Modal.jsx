import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = props => {
  const { setShow } = props;
  // React.useEffect(() => {
  //   setShow(show);
  // }, [show]);

  return (
    <div id="myModal" className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close}>&times;</span>
        <div className={styles.inputFields}>
          <h1>Manual Add Entry</h1>
          <input className="text-field" placeholder="First Name" />
          <input className="text-field" placeholder="Last Name" />
          <input className="text-field" placeholder="School/Pickup Location" />
          {console.log(props.setShow)}
          <button
            type="button"
            className="btn btn-success"
            onClick={console.log("hi")}
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
