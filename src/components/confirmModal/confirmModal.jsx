import React, { useState } from "react";
import Logo from "../logo/logo";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

// https://mui.com/components/dialogs/

// mui modal: https://mui.com/components/modal/

// TODO: implement buttons
function ConfirmModal(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="confirmModal">
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.confirmTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.confirmMsg}
          </Typography>
          {props.handleProceed}{" "}
          <Button
            color="secondary"
            variant="outlined"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmModal;
