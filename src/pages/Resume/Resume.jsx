import "./Resume.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ResumeBuilder from "../../components/resume_builder/ResumeBuilder";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import SectorEditor from "../../components/sector_editor/SectorEditor";
import axios from "axios";

var samplesectors = [
      {
          sectorID: 1,
          name: "Experience",
          linkedEmail: "mc@ae.com",
          fileType: "txt",
          division: "Water",
          imageLoc: "blah/blah",
          description: "I'm the best so I don't need to have any experience"
      },
      {
          sectorID: 2,
          name: "Projects",
          linkedEmail: "mc@ae.com",
          fileType: "txt",
          division: "Air",
          imageLoc: null,
          description: "I'm the best so I don't need to have any projects"
      }
  ]


var sampleuser = {
	"applicationUserId": 1,
    "firstName": "Michael",
    "lastName": "Chung",
    "emailAddress": "mc@ae.com",
}

var curruser = {};

var resume = []; 

var index = 3;

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = { currsector: undefined, sectors: resume, user: curruser };
  }

  componentDidMount() {
    // resume = samplesectors
    const url = "/api/user/" + this.state.user.applicationUserId + "/resume"
    axios.get(url)
      .then((res) => {
        resume = res.data;
        curruser = sampleuser;
        this.setState({sectors: resume, user: curruser});
      })
  }

  componentDidUpdate() {
    // resume = samplesectors
    const url = "/api/user/" + this.state.user.applicationUserId + "/resume"
    axios.get(url)
      .then((res) => {
        resume = res.data;
        this.setState({sectors: resume});
      })
  }

  selectSector(newID) {
    this.setState({ currsector: resume.find((e) => e.sectorID === newID) });
  }
  addSector(sectorname, sectordivision, filetype, imageloc, sectordescription) {
    var newsector = {          
      sectorID: index,
      name: sectorname,
      linkedEmail: this.state.user.emailAddress,
      fileType: filetype,
      division: sectordivision,
      imageLoc: imageloc,
      description: sectordescription,
    }
    const url = "/api/user/" + this.state.user.applicationUserId + "/resume/sector"
    index++;
    //resume.push(newsector);
    axios.post(url, newsector).then((res) => {
      this.forceUpdate()
    })
    //this.setState({ sectors: resume });
    console.log("Added " + newsector.name);
  }
  deleteSector(sector) {
    const url = "/api/user/" + this.state.user.applicationUserId + "/resume/sector/" + sector.sectorID
    axios.delete(url).then((res) => {
      this.forceUpdate()
    })
    //resume.splice(resume.findIndex((e) => e.sectorID === sector.sectorID),1);
    //this.setState({ sectors: resume });
    console.log("Deleted " + sector.name);
  }
  saveSector(sectorid, sectorname, sectorcontent) {
    const url = "/api/sector/" + sector.sectorID
    var oldsector = resume[resume.findIndex(e => e.sectorID === sectorid)]
    oldsector.name = sectorname;
    oldsector.description = sectorcontent;
    axios.put(url, oldsector).then((res) => {
      this.forceUpdate()
    })
    //resume.splice(resume.findIndex(e => e.sectorID === sectorid), 1, oldsector);
    //this.setState({sectors: resume});
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
            addSector = {(sectorname, sectordivision, filetype, imageloc, sectordescription) => 
              {this.addSector(sectorname, sectordivision, filetype, imageloc, sectordescription)}}
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
