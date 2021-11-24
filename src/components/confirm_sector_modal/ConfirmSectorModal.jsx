import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./ConfirmSectorModal.css";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

function ConfirmSectorModal(props) {
    // src: https://fragmentoid.com/?p=54, https://react.school/ui/modal
    const {
        openData: [open, setOpen],
      } = {
        openData: useState({}),
        ...(props.state || {}),
      };
    
    async function submit() {
      setOpen(false);
      axios.post('/api/sector', {
          "name": props.type,
          "division": props.division,
          "ProposalNumber": props.proposalNum,
          // These properties are not required for sector templates. Submit empty string for data validation
          "imageLoc": "",
          "description": "",
          "linkedEmail": "",
        })
        .then((response) => {
          console.log(response);
          props.onSuccessfulCreate();
        })
        .catch((err) => {
          console.log(err);
        })
    }

    return ReactDOM.createPortal(
      <>
        <div className="modal-shadow" onClick={() => setOpen(false)} ></div>
        <div className="modal">
          <div className="modal-banner"> Confirm New Sector </div>
          <div className="modal-content">
              <div className="csm-message"> Sectors can be edited later using the Resume page.</div>
              <div><span className="csm-header"> Type: </span> <span className="csm-info"> {props.type}</span></div>
              <div><span className="csm-header"> Proposal Number: </span> <span className="csm-info"> {props.proposalNum}</span></div>
              {/* <div><span className="csm-header"> Employee Email: </span> <span className="csm-info"> {props.email}</span></div>
              <div><span className="csm-header"> Image Location: </span> <span className="csm-info"> {props.imgLocation}</span></div> */}
              <div><span className="csm-header"> Division: </span> <span className="csm-info"> {props.division}</span></div>
              {/* <div className="csm-header"> Description:</div> <div className="csm-info">{props.description} </div> */}
          </div>
          <div className="modal-footer">
            <button className="csm-button" onClick={() => setOpen(false)}> Edit </button>
            <button className="csm-button" onClick={() => submit()}> Submit </button>
          </div>
        </div>
      </>,
      document.getElementById('app-modal'),
    );
}

export default ConfirmSectorModal;
