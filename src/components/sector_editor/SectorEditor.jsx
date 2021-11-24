import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import "./SectorEditor.css";

class SectorEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.sector.name, content: this.props.sector.description, id: this.props.sector.sectorID,
                  division: this.props.sector.division, imageLoc: this.props.sector.imageLoc, proposalNum: this.props.sector.proposalNumber};
  }

  handleChange = (event) => {
    this.setState({content: event.target.value});
  };

  handleChangeName = (event) => {
    this.setState({name: event.target.value});
  };

  handleChangeDivision = (event) => {
    this.setState({division: event.target.value});
  };

  handleChangeimageLoc = (event) => {
    this.setState({imageLoc: event.target.value});
  };
  handleChangeProposalNum = (event) => {
    this.setState({proposalNum: event.target.value});
  };

  saveSector() {
    this.props.saveSector(this.state.id, this.state.name, this.state.content, this.state.division, this.state.imageLoc, this.state.proposalNum);
  }

  componentDidUpdate() {
    if (this.state.id != this.props.sector.sectorID) {
      this.setState({id: this.props.sector.sectorID, content: this.props.sector.description, name: this.props.sector.name,
                      division: this.props.sector.division, imageLoc: this.props.sector.imageLoc, proposalNum: this.props.sector.proposalNum})
    }
  }

  render() {
    return (
      <div className = 'editor'>
        <div> 
          <FormControl fullWidth>
            <InputLabel htmlFor="uncontrolled-native">Type</InputLabel>
            <Select
              label="Type"
              defaultValue={this.state.name}
              className="name-editor"
              onChange={this.handleChangeName}
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
        </div>
        <div className="proposal-num-editor">
            <TextField
            value={this.state.proposalNum}
            onChange={this.handleChangeProposalNum} fullWidth id="fullWidth" 
            label="Proposal Number"
            />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel htmlFor="uncontrolled-native">Division</InputLabel>
            <Select
              label="Division"
              defaultValue={this.state.division}
              className="division-editor"
              onChange={this.handleChangeDivision}
              sx={{ marginBottom: "10px", marginTop: "10px" }}
              margin='normal'
            >
              <MenuItem className="cs-menuitem" value="Water">Water</MenuItem>
              <MenuItem className="cs-menuitem" value="Bridge">Bridge</MenuItem>
              <MenuItem className="cs-menuitem" value="Electrical">Electrical</MenuItem>
              <MenuItem className="cs-menuitem" value="Environmental">Environmental</MenuItem>
              <MenuItem className="cs-menuitem" value="Civil">Civil</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className = 'sector-editor-field'>
            <TextField multiline minRows = {10} maxRows = {40} 
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
        <div className = 'save-button'>
            <Button variant="contained" onClick={() => {this.saveSector()}}>Save</Button>
          </div>
      </div>
    );
  }
}

SectorEditor.propTypes = {
  sector: PropTypes.any,
  saveSector: PropTypes.func,
};

export default SectorEditor;