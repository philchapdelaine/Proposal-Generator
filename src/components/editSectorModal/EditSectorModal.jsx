import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentSector } from "../../redux/actions/proposal-actions";
import isEmail from "validator/lib/isEmail";

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

function EditSectorModal(props) {
  const { sectorID, name, description, division, imageLoc, linkedEmail } = props.sector;

  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newDivision, setNewDivision] = useState(division);
  const [newImageLoc, setNewImageLoc] = useState(imageLoc);
  const [newLinkedEmail, setNewLinkedEmail] = useState(linkedEmail);

  const dispatch = useDispatch();

  const handleSave = async () => {
    if (validateEmail()) {
      const updatedSector = {
        sectorID: sectorID,
        name: newName,
        description: newDescription,
        division: newDivision,
        imageLoc: newImageLoc,
        linkedEmail: newLinkedEmail,
      }
      // sets current sector to the updated sector. DOES NOT update anything in db, nor does it affect the original sector
      dispatch(setCurrentSector(updatedSector));
      props.onClose();
    }
  };

  const onTextChange = (e, label) => {
    switch (label) {
      case "Name":
        setNewName(e.target.value);
        break;
      case "Description":
        setNewDescription(e.target.value);
        break;
      case "Division":
        setNewDivision(e.target.value);
        break;
      case "ImageLoc":
        setNewImageLoc(e.target.value);
        break;
      case "LinkedEmail":
        setNewLinkedEmail(e.target.value);
        break;
    }
  };

  const validateEmail = () => {
    if (!newLinkedEmail) {
      return false;
    } else if (!isEmail(newLinkedEmail)) {
      return false;
    } else return true;
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
            <TextField label="Name" size="small" defaultValue={name} onChange={(e) => onTextChange(e, "Name")} style={{marginBottom: 10}}/>
            <TextField label="Division" size="small" defaultValue={division} onChange={(e) => onTextChange(e, "Division")} style={{marginBottom: 10}}/>
            <TextField 
              label="Employee email" size="small"
              defaultValue={linkedEmail}  
              onChange={(e) => onTextChange(e, "LinkedEmail")} 
              error={!validateEmail()} 
              helperText={"Employee email must be a valid email format"} 
              style={{marginBottom: 10}}
            />
            <TextField label="Image location" size="small" defaultValue={imageLoc} onChange={(e) => onTextChange(e, "ImageLoc")} style={{marginBottom: 10}}/>
            <TextField label="Description" size="small" defaultValue={description} onChange={(e) => onTextChange(e, "Description")} multiline maxRows={4}/>
          </Box>
          <Box display="flex" justifyContent="center" style={{marginTop: 10}}>
            <Button style={buttonStyle} variant="outlined" onClick={props.onClose}>Cancel</Button>
            <Button style={buttonStyle} variant="contained" onClick={handleSave}>Save</Button>
          </Box>
        </Box>
    </Modal>
  );
}

export default EditSectorModal;
