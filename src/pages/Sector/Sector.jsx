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
      <TextField
        required
        label="Sector Name"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <br />
      <TextField
        required
        label="Sector Type"
        variant="outlined"
        value={type}
        onChange={(event) => setType(event.target.value)}
      />
      <br />
      <TextField
        required
        label="Description"
        variant="outlined"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <br />
      <TextField
        label="Other Info 1"
        variant="outlined"
        // value={description}
        // onChange={(event) => setDescription(event.target.value)}
      />
      <br />
      <TextField
        label="Other Info 2"
        variant="outlined"
        // value={description}
        // onChange={(event) => setDescription(event.target.value)}
      />
      <br />
      <Button color="primary" variant="contained">
        Save Sector
      </Button>
    </div>
  );
}

export default Sector;
