import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SectorEditor.css";

class SectorEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.sector.name, content: this.props.sector.content, id: this.props.sector.id};
  }

  handleChange = (event) => {
    this.setState({content: event.target.value});
  };

  handleChangeName = (event) => {
    this.setState({name: event.target.value});
  };

  saveSector() {
    this.props.saveSector();
  }

  componentDidUpdate() {
    if (this.state.id != this.props.sector.id) {
      this.setState({id: this.props.sector.id, content: this.props.sector.content, name: this.props.sector.name})
    }
  }

  render() {
    return (
      <div className = 'editor'>
        <div className="header">
            <TextField
            value={this.state.name}
            onChange={this.handleChangeName} fullWidth id="fullWidth" />
        </div>
        <div className = 'sector-editor-field'>
            <TextField multiline minRows = {10} maxRows = {40} 
            value={this.state.content}
            onChange={this.handleChange} fullWidth id="fullWidth" />
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
  setSector: PropTypes.func
};

export default SectorEditor;