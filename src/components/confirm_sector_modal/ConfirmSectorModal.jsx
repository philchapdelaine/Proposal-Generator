import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./ConfirmSectorModal.css";

function ConfirmSectorModal(props) {
    // src: https://fragmentoid.com/?p=54, https://react.school/ui/modal
    const {
        openData: [open, setOpen],
      } = {
        openData: useState({}),
        ...(props.state || {}),
      };
    
    function submit() {
        setOpen(false);
        // todo: redirect to admin page?
        // todo: send data to backend
    }

    return ReactDOM.createPortal(
        <>
          <div className="modal-shadow" onClick={() => setOpen(false)} ></div>
          <div className="modal">
            <div className="modal-banner"> Confirm New Sector </div>
            <div className="modal-content">
                <div className="csm-message"> Sectors can be edited later using the proposals page.</div>
                <div className="csm-header"> Name:</div> <div className="csm-info"> {props.name}</div> 
                <div className="csm-header">Type:</div> <div className="csm-info"> {props.type} </div>
                <div className="csm-header"> Description:</div> <div className="csm-info">{props.description} </div>
            </div>
            <div className="modal-footer">
              <button className="csm-button" onClick={() => submit()}> Submit </button>
            </div>
          </div>
        </>,
        document.getElementById('app-modal'),
      );
}

export default ConfirmSectorModal;
