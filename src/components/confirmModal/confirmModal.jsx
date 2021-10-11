import React from "react";
import Logo from "../logo/logo";

import Button from "@material-ui/core/Button";

function confirmModal(props) {
  return (
    <div>
      <Button variant="contained" color="primary">
        Confirm
      </Button>
      <Button variant="outlined">Cancel</Button>
    </div>
  );
}

export default confirmModal;
