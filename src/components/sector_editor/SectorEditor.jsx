import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import "./SectorEditor.css";

var isValid = require('is-valid-path');

class SectorEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.sector.name, content: this.props.sector.description, id: this.props.sector.sectorID,
      division: this.props.sector.division, imageLoc: this.props.sector.imageLoc, proposalNum: this.props.sector.proposalNumber,
      modifiedDate: this.props.sector.modifiedDate,
      wrongImageLocAlert: false
    };
  }

  handleChange = (event) => {
    this.setState({ content: event.target.value });
  };

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleChangeDivision = (event) => {
    this.setState({ division: event.target.value });
  };

  handleChangeimageLoc = (event) => {
    this.setState({ imageLoc: event.target.value });
  };
  handleChangeProposalNum = (event) => {
    this.setState({ proposalNum: event.target.value });
  };

  handleChangeDate = (event) => {
    this.setState({ modifiedDate: event.target.value });
  };


  saveSector() {
    if (this.state.imageLoc === "" || (isValid(this.state.imageLoc) && (this.state.imageLoc.endsWith(".jpeg") || this.state.imageLoc.endsWith(".jpg") || this.state.imageLoc.endsWith(".png")))) {
      this.props.saveSector(this.state.id, this.state.name, this.state.content, this.state.division, this.state.imageLoc, this.state.proposalNum);
      this.setState({ modifiedDate: this.props.sector.modifiedDate });
    }
    else {
      this.setState({wrongImageLocAlert: true})
    }
  }

  componentDidUpdate() {
    if (this.state.id != this.props.sector.sectorID) {
      this.setState({
        id: this.props.sector.sectorID, content: this.props.sector.description, name: this.props.sector.name,
        division: this.props.sector.division, imageLoc: this.props.sector.imageLoc, proposalNum: this.props.sector.proposalNum
      })
    }
  }

  render() {
    return (
      <div className='editor'>
        <div>
          <div className="type-header">
            Type:
          </div>
          <div className="type-text">
            {this.state.name}
          </div>
        </div>

        {/* <FormControl fullWidth>
            <InputLabel htmlFor="uncontrolled-native">Type</InputLabel>
             <Select
              disabled
              label="Type"
              defaultValue={this.state.name}
              className="name-editor"
              onChange={this.handleChangeName}
              sx={{ marginBottom: "10px" }}
              variant="filled"
            >
              <MenuItem className="cs-menuitem" value="Role">Role</MenuItem>
              <MenuItem className="cs-menuitem" value="Education">Education</MenuItem>
              <MenuItem className="cs-menuitem" value="Experience">Experience</MenuItem>
              <MenuItem className="cs-menuitem" value="Summary">Summary</MenuItem>
              <MenuItem className="cs-menuitem" value="Justification">Justification</MenuItem>
              <MenuItem className="cs-menuitem" value="Publications">Publications</MenuItem>
            </Select>
          </FormControl> */}
        <div>
          <div className="proposal-num-editor">
            Proposal #:
          </div>
          <div className="propnum-text">
            {this.state.proposalNum}
          </div>
        </div>

        {/* <TextField
            disabled
            value={this.state.proposalNum}
            // onChange={this.handleChangeProposalNum}
            fullWidth id="fullWidth"
            label="Proposal Number"
            variant="filled"
            /> */}
        <div>
          <div className="division-header">
            Division:
          </div>
          <div className="division-text">
            {this.state.division}
          </div>
        </div>
        {/* <FormControl fullWidth>
            <InputLabel htmlFor="uncontrolled-native">Division</InputLabel>
            <Select
              disabled
              label="Division"
              defaultValue={this.state.division}
              className="division-editor"
              onChange={this.handleChangeDivision}
              sx={{ marginBottom: "10px", marginTop: "10px" }}
              margin='normal'
              variant="filled"
            >
              <MenuItem className="cs-menuitem" value="Water">Water</MenuItem>
              <MenuItem className="cs-menuitem" value="Bridge">Bridge</MenuItem>
              <MenuItem className="cs-menuitem" value="Electrical">Electrical</MenuItem>
              <MenuItem className="cs-menuitem" value="Environmental">Environmental</MenuItem>
              <MenuItem className="cs-menuitem" value="Civil">Civil</MenuItem>
              <MenuItem className="cs-menuitem" value="NONE">NONE</MenuItem>
            </Select>
          </FormControl> */}
        <div>
          <div className="date-header">
            Last Modified:
          </div>
          <div className="date-text">
            {this.state.modifiedDate}
          </div>
        </div>
        <div className='sector-editor-field'>
          <TextField multiline minRows={10} maxRows={10}
            value={this.state.content}
            onChange={this.handleChange} fullWidth id="fullWidth"
            label="Description"
          />
        </div>
        <div className="imageloc-editor">
          <TextField
            value={this.state.imageLoc}
            onChange={this.handleChangeimageLoc} fullWidth id="fullWidth"
            label="Image URL"
          />
        </div>
        <div className='save-button'>
          <Button variant="contained" onClick={() => { this.saveSector() }}>Save</Button>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.wrongImageLocAlert}
          onClose={() => this.setState({wrongImageLocAlert: false} ) }
          // key={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
        >
          <MuiAlert onClose={() => this.setState({wrongImageLocAlert: false} )} severity="error" sx={{ width: '100%' }} variant="filled">
            Incorrect Image Location. Only .png , .jpeg, .jpg
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

SectorEditor.propTypes = {
  sector: PropTypes.any,
  saveSector: PropTypes.func,
};

export default SectorEditor;
