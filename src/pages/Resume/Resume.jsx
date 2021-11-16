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
	applicationUserId: 1,
    firstName: "Michael",
    lastName: "Chung",
    emailAddress: "mc@ae.com",
}

var curruser = {};

var resume = []; 

var index = 3;

const client = axios.create({
  baseURL: "localhost:5000/api/"
});

var noAPI = false;

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = { currsector: undefined, sectors: resume, user: sampleuser };
  }

  componentDidMount() {
    if (noAPI) {
      resume = samplesectors
      curruser = sampleuser
    } else {
      //curruser = sampleuser;
      this.setState({user: curruser})
      const url = `/api/user/${sampleuser.applicationUserId}/resume`
      axios.get(url)
        .then((res) => {
          resume = res.data.sectors;
          this.setState({sectors: resume})
          console.log(this.state.sectors, this.state.user);
        })
    }
  }

  handleUpdate() {
    if (noAPI) {
      this.setState({sectors: resume});
    } else {
      const url = `/api/user/${sampleuser.applicationUserId}/resume`
      axios.get(url)
        .then((res) => {
          resume = res.data.sectors;
          this.setState({sectors: resume});
        })
    }
  }

  selectSector(newID) {
    this.setState({ currsector: resume.find((e) => e.sectorID === newID) });
  }

  addSector(sectorname, sectordivision, filetype, imageloc, sectordescription) {
    var newsector = {          
      name: sectorname,
      linkedEmail: sampleuser.emailAddress,
      fileType: filetype,
      division: sectordivision,
      imageLoc: imageloc,
      description: sectordescription,
    }

    if (noAPI) {
      resume.push(newsector);
      this.setState({sectors: resume});
    } else {
      const url = `/api/user/${sampleuser.applicationUserId}/resume/sector`
      axios.post(url, newsector).then((res) => {
        this.handleUpdate()
      })
    }
    console.log("Added " + newsector.name);
  }

  deleteSector(sector) {
    if (noAPI) {
      resume.splice(resume.findIndex((e) => e.sectorID === sector.sectorID),1);
      this.setState({sectors: resume});
    } else {
      const url = `/api/user/${sampleuser.applicationUserId}/resume/sector/${sector.sectorID}`
      axios.delete(url).then((res) => {
        this.handleUpdate()
      })
    }
    console.log("Deleted " + sector.name);
  }

  saveSector(sectorid, sectorname, sectorcontent) {
    var oldsector = resume[resume.findIndex(e => e.sectorID === sectorid)]
    oldsector.name = sectorname;
    oldsector.description = sectorcontent;
    if (noAPI) {
      resume.splice(resume.findIndex(e => e.sectorID === sectorid), 1, oldsector);
      this.setState({sectors: resume});
    } else {
      const url = `/api/sector/${oldsector.sectorID}`
      axios.put(url, oldsector).then((res) => {
        this.handleUpdate()
      })
    }
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
         { console.log(this.state.sectors)}
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
