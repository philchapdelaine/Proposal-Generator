
import "./Resume.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ResumeBuilder from "../../components/resume_builder/ResumeBuilder";
import SectorEditor from "../../components/sector-editor/SectorEditor";

var samplesectors = [
  {id: '0', name: 'Sample0', type: 'Type0', content: 'something0'}, 
  {id: '1', name: 'Sample', type: 'Type1', content: 'something'}, 
  {id: '2', name: 'New Sector', type: 'Experience', content: 'abdgbsbshd asdkbkdsb'},
  {id: '3', name: 'New Sector1', type: 'Experience2', content: 'content1'}
];

var index = 4;

class Resume extends Component {
  
  constructor(props) {
    super(props);
    this.state = {currsector: undefined, sectors: samplesectors}
  }

  selectSector(sectorid) {
    this.setState({currsector: samplesectors.find(e => e.id === sectorid)});
  }
  addSector(sector) {
    sector.id = index;
    index++;
    samplesectors.push(sector);
    this.setState({sectors: samplesectors});
    console.log("Added " + sector.name);
  }
  deleteSector(sector) {
    samplesectors.splice(samplesectors.findIndex(e => e.id === sector.id), 1);
    this.setState({sectors: samplesectors});
    console.log("Deleted " + sector.name);
  }
  saveSector() {
    console.log("Saved");
  }
  
  setSector(sector) {
    
  }

  render() {
    return (
      <div className = "resume-page">
        <div className = "resume-builder">
          <ResumeBuilder sectors = {this.state.sectors}
          addSector = {(sector) => {this.addSector(sector)}}
          deleteSector = {(sector) => {this.deleteSector(sector)}}
          selectSector = {(sectorid) => {this.selectSector(sectorid)}}></ResumeBuilder>
        </div>
        <div className = "sector-editor">
          {this.state.currsector &&           
          <SectorEditor sector = {this.state.currsector} 
          saveSector = {() => {this.saveSector}}
          setSector = {() => {setSector}}></SectorEditor>
          }
        </div>
      </div>
    );
  }
}

Resume.propTypes = {

};

export default Resume;
