import React, { useState } from "react";
import "./CreateSector.css";
import TextField from "@material-ui/core/TextField";
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import ConfirmSectorModal from "../../components/confirm_sector_modal/ConfirmSectorModal";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

function CreateSector() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [proposalNum, setProposalNum] = useState("");
  const [email, setEmail] = useState("");
  const [imgLocation, setImgLocation] = useState("");
  const [division, setDivision] = useState("");

  const [open, setOpen] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [sectorCreated, setSectorCreated] = useState(false);

  let hasRequiredInfo = false;

  function openModal() {
    const hasType = type !== ""; // add other required fields here
    const hasDivision = division !== "";
    hasRequiredInfo = hasType && hasDivision;
    setSubmitAttempted(true);
    setSectorCreated(false);

    if (hasRequiredInfo) {
      setOpen(true);
      setSubmitAttempted(false);
    }
  }

  function handleSectorCreated() {
    setSectorCreated(true);
    // reset fields
    setType("");
    setProposalNum("");
    setDivision("");
  }

  return (

    <div className="create-sector-page">
      <div id="app-modal"></div>
      <NavigatorBar />
      <div className="cs-main">
        <div className="title"> Create New Sector Template </div>
        <div className="subtitle"> 
          Employees can fill out additional information (description, etc.) when they add a sector to their resume.
        </div>
        <div className="cs-input-fields">

          <FormControl fullWidth>
            <InputLabel >Type</InputLabel>
            <Select
              label="Type"
              className="cs-input"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem className="cs-menuitem" value="Role">Role</MenuItem>
              <MenuItem className="cs-menuitem" value="Education">Education</MenuItem>
              <MenuItem className="cs-menuitem" value="Experience">Experience</MenuItem>
              <MenuItem className="cs-menuitem" value="Summary">Summary</MenuItem>
              <MenuItem className="cs-menuitem" value="Justification">Justification</MenuItem>
              <MenuItem className="cs-menuitem" value="Publications">Publications</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Proposal Number"
            className="cs-input"
            fullWidth={true}
            style={{ marginBottom: '15px' }}
            variant="outlined"
            value={proposalNum}
            onChange={(event) => setProposalNum(event.target.value)}
          />
          <br />
          {/* <TextField
            label="Employee Email"
            className="cs-input"
            fullWidth={true}
            style={{ marginBottom: '15px' }}
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          /> */}
          {/* <TextField
            label="Image Location"
            className="cs-input"
            fullWidth={true}
            style={{ marginBottom: '15px' }}
            variant="outlined"
            value={imgLocation}
            onChange={(event) => setImgLocation(event.target.value)}
          /> */}
          <FormControl fullWidth>
            <InputLabel>Division</InputLabel>
            <Select
              label="Division"
              className="cs-input"
              value={division}
              onChange={(event) => setDivision(event.target.value)}
            >
              <MenuItem className="cs-menuitem" value="Water">Water</MenuItem>
              <MenuItem className="cs-menuitem" value="Bridge">Bridge</MenuItem>
              <MenuItem className="cs-menuitem" value="Electrical">Electrical</MenuItem>
              <MenuItem className="cs-menuitem" value="Environmental">Environmental</MenuItem>
              <MenuItem className="cs-menuitem" value="Civil">Civil</MenuItem>
              <MenuItem className="cs-menuitem" value="NONE">NONE</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField
            label="Description"
            className="cs-input"
            fullWidth={true}
            variant="outlined"
            multiline={true}
            minRows="8"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          /> */}
        </div>
        {!hasRequiredInfo && submitAttempted && (
          <div className="cs-warning"> Sector type and division are required fields. </div>
        )}
        { sectorCreated ?  <div className="cs-success-message"> Sector created successfully. Employees may now use this sector via the Resume page.</div> : null }
        <Link to="/admin">
          <button className="cs-button"> Back </button>
        </Link>
        <button
          className="cs-button"
          onClick={() => openModal()}>
          Save Sector
        </button>

        {open && (
          <ConfirmSectorModal
            state={{ openData: [open, setOpen] }}
            onSuccessfulCreate={handleSectorCreated}
            description={description}
            type={type}
            proposalNum={proposalNum}
            email={email}
            imgLocation={imgLocation}
            division={division}
          />
        )}


      </div>
    </div>
  );
}



export default CreateSector;
