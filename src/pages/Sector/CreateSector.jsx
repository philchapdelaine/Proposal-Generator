import React, { useState } from "react";
import "./CreateSector.css";
import TextField from "@material-ui/core/TextField";
import { Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import NavigatorBar from "../../components/navigator_bar/NavigatorBar"
import ConfirmSectorModal from "../../components/confirm_sector_modal/ConfirmSectorModal";


function CreateSector() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [proposalNum, setProposalNum] = useState("");
  const [email, setEmail] = useState("");
  const [imgLocation, setImgLocation] = useState("");
  const [division, setDivision] = useState("");

  const [open, setOpen] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  let hasRequiredInfo = false;

  function openModal() {
    const hasType = type !== ""; // add other required fields here
    hasRequiredInfo = hasType;
    setSubmitAttempted(true);

    if (hasRequiredInfo) {
      setOpen(true);
      setSubmitAttempted(false);
    } 
  }
  
  
  return (
    
    <div className="create-sector-page">
      <div id="app-modal"></div>
      <NavigatorBar/>
      <div className="cs-main"> 
        <div className="title"> Create New Sector </div>
        <div className="cs-input-fields"> 
  
            <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
              <Select
                className="cs-input"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <MenuItem value="Role">Role</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Experience">Experience</MenuItem>  
                <MenuItem value="Summary">Summary</MenuItem>
                <MenuItem value="Justification">Justification</MenuItem>
                <MenuItem value="Publications">Publications</MenuItem> 
              </Select>
            </FormControl>
            <TextField
              label="Proposal Number"
              className="cs-input"
              fullWidth={true}
              style={{marginBottom: '15px'}}
              variant="outlined"
              value={proposalNum}
              onChange={(event) => setProposalNum(event.target.value)}
            />
            <br/>
            <TextField
              label="Employee Email"
              className="cs-input"
              fullWidth={true}
              style={{marginBottom: '15px'}}
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Image Location"
              className="cs-input"
              fullWidth={true}
              style={{marginBottom: '15px'}}
              variant="outlined"
              value={imgLocation}
              onChange={(event) => setImgLocation(event.target.value)}
            />
            <FormControl fullWidth>
            <InputLabel>Divison</InputLabel>
              <Select
                className="cs-input"
                value={division}
                onChange={(event) => setDivision(event.target.value)}
              >
                <MenuItem value="Water">Water</MenuItem>
                <MenuItem value="Bridge">Bridge</MenuItem>
                <MenuItem value="Electrical">Electrical</MenuItem>  
                <MenuItem value="Environmental">Environmental</MenuItem>
                <MenuItem value="Civil">Civil</MenuItem>
              </Select>
            </FormControl>

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
        </div>
        {!hasRequiredInfo && submitAttempted && (
          <div className="cs-warning"> Sector type is required. </div>
        )}
        <button 
          className="cs-button"
          onClick={() => openModal()}>  
            Save Sector 
        </button>

        {open && (
        <ConfirmSectorModal
          state={{openData: [open, setOpen]}}
          description={description}
          type={type}
          proposalNum={proposalNum}
          email={email}
          imgLocation={imgLocation}
          divison={division}
        />
        )}
        

      </div>      
    </div>
  );
}



export default CreateSector;
