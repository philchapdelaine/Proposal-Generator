import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SectorEditor.css";

class SectorEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.sector.name, content: this.props.sector.description, id: this.props.sector.sectorID,
                  division: this.props.sector.division, imageLoc: this.props.sector.imageLoc};
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

  saveSector() {
    this.props.saveSector(this.state.id, this.state.name, this.state.content, this.state.division, this.state.imageLoc);
  }

  componentDidUpdate() {
    if (this.state.id != this.props.sector.sectorID) {
      this.setState({id: this.props.sector.sectorID, content: this.props.sector.description, name: this.props.sector.name,
                      division: this.props.sector.division, imageLoc: this.props.sector.imageLoc})
    }
  }

  render() {
    return (
      <div className = 'editor'>
        <div className="name-editor">
            <TextField
            value={this.state.name}
            onChange={this.handleChangeName} fullWidth id="fullWidth" />
        </div>
        <div className="division-editor">
            <TextField
            value={this.state.division}
            onChange={this.handleChangeDivision} fullWidth id="fullWidth" />
        </div>
        <div className = 'sector-editor-field'>
            <TextField multiline minRows = {10} maxRows = {40} 
            value={this.state.content}
            onChange={this.handleChange} fullWidth id="fullWidth" />
        </div>
        <div className="imageloc-editor">
            <TextField
            value={this.state.imageLoc}
            onChange={this.handleChangeimageLoc} fullWidth id="fullWidth" />
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