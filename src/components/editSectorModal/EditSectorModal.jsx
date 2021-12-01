import { Button, Modal, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSector } from "../../redux/actions/proposal-actions";
import isEmail from "validator/lib/isEmail";

var isValid = require('is-valid-path');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '33%',
  bgcolor: '#fff',
  border: '2px solid #00569c',
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  width: '100px',
  margin: '5px'
}

function EditSectorModal(props = {}) {
  const { sectorID, name, description, division, imageLoc, linkedEmail, edited } = props.sector;

  const [newSector, setNewSector] = useState(props.sector);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  const handleSave = async () => {
    if (validateEmail(newSector.linkedEmail) && validateImageLocation(newSector.imageLoc) ) {
      // sets current sector to the updated sector. DOES NOT update anything in db, nor does it affect the original sector
      newSector.edited = true;
      console.log(newSector);
      dispatch(setCurrentSector(newSector));
      props.onClose();
      }
  };
  useEffect( () => {
    setSaveButtonDisabled(true);
    setNewSector(props.sector);
  }, [props.sector])

  const onTextChange = e => {
    setNewSector({ ...newSector, [e.target.name]: e.target.value });
    setSaveButtonDisabled(false);

    var isCurrEmailValid = validateEmail(newSector.linkedEmail);
    var isCurrImgLocValid = validateImageLocation(newSector.imageLoc);

    if (e.target.name == "linkedEmail") {
      isCurrEmailValid = validateEmail(e.target.value);
    }
    if (e.target.name == "imageLoc") {
      isCurrImgLocValid = validateImageLocation(e.target.value);
    }

    setSaveButtonDisabled(!isCurrEmailValid || !isCurrImgLocValid);
  };

  const validateImageLocation = (currImageLoc) => {
    return (currImageLoc === null || currImageLoc === "" || (isValid(currImageLoc) && (currImageLoc.endsWith(".jpeg") || currImageLoc.endsWith(".jpg") || currImageLoc.endsWith(".png"))))
  }

  const validateEmail = (currEmail) => {
    if (currEmail) {
      return isEmail(currEmail);
    } else return false;
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" style={{marginBottom: 10}}>
            Edit sector
          </Typography>
          <Box display="flex" flexDirection="column">
            <FormControl fullWidth>
              <InputLabel htmlFor="uncontrolled-native">Type</InputLabel>
              <Select
                label="Type"
                name="name"
                defaultValue={name}
                onChange={onTextChange}
                sx={{ marginBottom: "10px" }}
              >
                <MenuItem className="cs-menuitem" value="Role">Role</MenuItem>
                <MenuItem className="cs-menuitem" value="Education">Education</MenuItem>
                <MenuItem className="cs-menuitem" value="Experience">Experience</MenuItem>
                <MenuItem className="cs-menuitem" value="Summary">Summary</MenuItem>
                <MenuItem className="cs-menuitem" value="Justification">Justification</MenuItem>
                <MenuItem className="cs-menuitem" value="Publications">Publications</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField label="Division" name="division" size="small" defaultValue={division} onChange={(e) => onTextChange(e)} style={{marginBottom: 10}}/> */}
            <FormControl fullWidth>
              <InputLabel htmlFor="uncontrolled-native">Division</InputLabel>
              <Select
                label="Division"
                name="division"
                defaultValue={division}
                onChange={onTextChange}
                sx={{ marginBottom: "10px" }}
              >
                <MenuItem className="cs-menuitem" value="Water">Water</MenuItem>
                <MenuItem className="cs-menuitem" value="Bridge">Bridge</MenuItem>
                <MenuItem className="cs-menuitem" value="Electrical">Electrical</MenuItem>
                <MenuItem className="cs-menuitem" value="Environmental">Environmental</MenuItem>
                <MenuItem className="cs-menuitem" value="Civil">Civil</MenuItem>
                <MenuItem className="cs-menuitem" value="NONE">NONE</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Employee email" size="small" name="linkedEmail"
              defaultValue={linkedEmail}
              onChange={onTextChange}
              error={!validateEmail(newSector.linkedEmail)}
              helperText={validateEmail(newSector.linkedEmail) ? "" : "Employee email must be a valid email format"}
              style={{marginBottom: 10}}
            />
            <TextField helperText={validateImageLocation(newSector.imageLoc)? "" : "Invalid Directory. Only .png .jpeg .jpg"} error={!validateImageLocation(newSector.imageLoc)} label="Image location" name="imageLoc" size="small" defaultValue={imageLoc} onChange={onTextChange} style={{marginBottom: 10}}/>
            <TextField label="Description" name="description" size="small" defaultValue={description} onChange={onTextChange} multiline maxRows={4}/>
          </Box>
          <Box display="flex" justifyContent="center" style={{marginTop: 10}}>
            <Button style={buttonStyle} variant="outlined" onClick={props.onClose}>Cancel</Button>
            <Button disabled={saveButtonDisabled} style={buttonStyle} variant="contained" onClick={handleSave}>Save</Button>
          </Box>
        </Box>
    </Modal>
  );
}

export default EditSectorModal;

