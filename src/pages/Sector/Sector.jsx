import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Logo from "../../components/logo/logo";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

function Sector() {
  return (
    <div>
      Sector
      <CreateSector />
    </div>
  );
}

function CreateSector() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div>
      Create New Sector <br />
      Sector Name <br />
      Sector Type <br />
      Description <br />
      Other Info 1: <br />
      Other Info 2: <br />
      Save Sector <br />
    </div>
  );
}

export default Sector;
