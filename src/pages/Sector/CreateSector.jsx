import React, { useState } from "react";
import "./CreateSector.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar"
import Logo from "../../components/logo/logo";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

function CreateSector() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="create-sector-page">
      <NavigatorBar/>
      <div className="cs-main"> 
        <div className="title"> Create New Sector </div>
        <div className="cs-input-fields"> 
          <TextField
              required
              label="Sector Name"
              className="cs-input"
              fullWidth={true}
              margin="dense"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <br />
            <TextField
              required
              label="Sector Type"
              className="cs-input"
              fullWidth={true}
              margin="dense"
              variant="outlined"
              value={type}
              onChange={(event) => setType(event.target.value)}
            />
            <br />
            <TextField
              label="Description"
              className="cs-input"
              fullWidth={true}
              variant="outlined"
              multiline={true}
              minRows="8"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <br />
            <TextField
              label="Other info 1"
              className="cs-input"
              fullWidth={true}
              margin="dense"
              variant="outlined"
              // value={description}
              // onChange={(event) => setDescription(event.target.value)}
            />
            <br />
            <TextField
              label="Other info 2"
              className="cs-input"
              fullWidth={true}
              margin="dense"
              variant="outlined"
              // value={description}
              // onChange={(event) => setDescription(event.target.value)}
            />
        </div>

        <button className="cs-button" variant="contained"> Save Sector </button>
      </div>      
    </div>
  );
}

export default CreateSector;
