import React from "react";
import Logo from "../logo/logo";

import Button from "@material-ui/core/Button";

function confirmModalPrototype(props) {
  <div>
    <Button variant="contained" color="primary">
      Confirm
    </Button>
    <Button variant="outlined">Cancel</Button>
  </div>;
}

// src: // https://gist.github.com/primaryobjects/aacf6fa49823afb2f6ff065790a5b402
function confirmModal(props) {
  return (
    <div
      className="confirm-modal"
      onClick={() => {
        if (window.confirm(props.confirmMsg)) this.onCancel(item);
      }}
    ></div>
  );
}

export default confirmModal;
