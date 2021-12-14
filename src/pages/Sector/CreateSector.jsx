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

  let ConfigData = require('../../config/MenuItemsConfig.json');
  const typeMenuOptions = ConfigData.SECTOR_TYPES;
  const divisionMenuOptions = ConfigData.DIVISIONS;

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
              {typeMenuOptions.map((value, index) => {
                return <MenuItem key={index} className="cs-menuitem" value={value}>{value}</MenuItem>
              })}
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
          <FormControl fullWidth>
            <InputLabel>Division</InputLabel>
            <Select
              label="Division"
              className="cs-input"
              value={division}
              onChange={(event) => setDivision(event.target.value)}
            >
              {divisionMenuOptions.map((value, index) => {
                return <MenuItem key={index} className="cs-menuitem" value={value}>{value}</MenuItem>
              })}
            </Select>
          </FormControl>
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
