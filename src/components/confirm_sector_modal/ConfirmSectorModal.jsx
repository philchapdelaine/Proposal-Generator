import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./ConfirmSectorModal.css";
import Axios from 'axios';
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
        const newSector = {
          type: props.type,
          proposalNum: props.proposalNum,
          email: props.email,
          imgLocation: props.imgLocation,
          divison: props.divison,
          description: props.description
        };
        // todo: send data to backend
        const data = await Axios.post('', newSector);
        console.log(data);

    }

    return ReactDOM.createPortal(
        <>
          <div className="modal-shadow" onClick={() => setOpen(false)} ></div>
          <div className="modal">
            <div className="modal-banner"> Confirm New Sector </div>
            <div className="modal-content">
                <div className="csm-message"> Sectors can be edited later using the proposals page.</div>
                <div><span className="csm-header"> Type: </span> <span className="csm-info"> {props.type}</span></div>
                <div><span className="csm-header"> Proposal Number: </span> <span className="csm-info"> {props.proposalNum}</span></div>
                <div><span className="csm-header"> Employee Email: </span> <span className="csm-info"> {props.email}</span></div>
                <div><span className="csm-header"> Image Location: </span> <span className="csm-info"> {props.imgLocation}</span></div>
                <div><span className="csm-header"> Division: </span> <span className="csm-info"> {props.divison}</span></div>
                <div className="csm-header"> Description:</div> <div className="csm-info">{props.description} </div>
            </div>
            <div className="modal-footer">
              <button className="csm-button" onClick={() => setOpen(false)}> Edit </button>
              <Link to='/admin'>
                <button className="csm-button" onClick={() => submit()}> Submit </button>
              </Link>
            </div>
          </div>
        </>,
        document.getElementById('app-modal'),
      );
}

export default ConfirmSectorModal;
