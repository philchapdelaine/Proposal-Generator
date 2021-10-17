import React, { useState } from "react";
import "./CreateSector.css";
import TextField from "@material-ui/core/TextField";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar"
import ConfirmSectorModal from "../../components/confirm_sector_modal/confirmSectorModal";


function CreateSector() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  
  
  return (
    
    <div className="create-sector-page">
      <div id="app-modal"></div>
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

        <button 
          className="cs-button"
          onClick={() => setOpen(true)}>  
            Save Sector 
        </button>

        {open && (
        <ConfirmSectorModal
          state={{openData: [open, setOpen]}}
          name={name}
          description={description}
          type={type}
        />
        )}
        

      </div>      
    </div>
  );
}


export default CreateSector;
