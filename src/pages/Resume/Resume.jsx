import "./Resume.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ResumeBuilder from "../../components/resume_builder/ResumeBuilder";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import SectorEditor from "../../components/sector_editor/SectorEditor";

var samplesectors = [
  { id: "0", name: "Education", type: "Resume Sector", content: "something0" },
  { id: "1", name: "Projects", type: "Resume Sector", content: "something" },
  {
    id: "2",
    name: "Experience",
    type: "Resume Sector",
    content: "abdgbsbshd asdkbkdsb",
  },
  { id: "3", name: "Role", type: "Resume Sector", content: "content1" },
];

var index = 4;

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = { currsector: undefined, sectors: samplesectors };
  }

  selectSector(sectorid) {
    this.setState({ currsector: samplesectors.find((e) => e.id === sectorid) });
  }
  addSector(sector) {
    sector.id = index;
    index++;
    samplesectors.push(sector);
    this.setState({ sectors: samplesectors });
    console.log("Added " + sector.name);
  }
  deleteSector(sector) {
    samplesectors.splice(
      samplesectors.findIndex((e) => e.id === sector.id),
      1
    );
    this.setState({ sectors: samplesectors });
    console.log("Deleted " + sector.name);
  }
  saveSector(sectorid, sectorname, sectorcontent) {
    var oldsector = samplesectors[samplesectors.findIndex(e => e.id === sectorid)]
    oldsector.name = sectorname;
    oldsector.content = sectorcontent;
    samplesectors.splice(samplesectors.findIndex(e => e.id === sectorid), 1, oldsector);
    this.setState({sectors: samplesectors});
    console.log("Saved" + sectorid);
  }

  render() {
    return (
      <div className = "page">
        <div className = "nav-bar">
          <NavigatorBar></NavigatorBar>
        </div>
        <div className = "resume-page">
          <div className = "resume-builder">
            <ResumeBuilder sectors = {this.state.sectors}
            addSector = {(sector) => {this.addSector(sector)}}
            deleteSector = {(sector) => {this.deleteSector(sector)}}
            selectSector = {(sectorid) => {this.selectSector(sectorid)}}></ResumeBuilder>
          </div>
          <div className = "sector-editor">
            <div>
            {this.state.currsector &&           
            <SectorEditor sector = {this.state.currsector} 
            saveSector = {(sectorid, sectorname, sectorcontent) => {this.saveSector(sectorid, sectorname, sectorcontent)}}></SectorEditor>
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Resume.propTypes = {};

export default Resume;
