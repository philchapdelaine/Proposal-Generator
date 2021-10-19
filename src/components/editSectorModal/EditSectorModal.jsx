import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

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

  // TODO-JC: destructure section object so many props aren't needed?

  const handleSave = async () => {
    // await props.saveSector(
    //   // TODO-JC: figure out what args are needed for this function
    // );
    props.onClose();
  }

  return (
    <Modal 
      open={props.open}
      onClose={props.onClose}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" style={{marginBottom: 10}}>
            Edit {props.sectorName}
          </Typography>
          <Box display="flex" flexDirection="column">
            <TextField label="Type" size="small" defaultValue={props.sectorType} style={{marginBottom: 10}}/>
            <TextField label="Employee email" size="small" defaultValue={props.email} style={{marginBottom: 10}}/>
            <TextField label="Image location" size="small" defaultValue={props.imageLocation} style={{marginBottom: 10}}/>
            <TextField label="Text" size="small" defaultValue={props.sectorText} multiline maxRows={4}/>
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
