import "./Resume.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ResumeBuilder from "../../components/resume_builder/ResumeBuilder";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import SectorEditor from "../../components/sector_editor/SectorEditor";
import axios from "axios";
import { connect } from "react-redux"; // redux

var samplesectors = [
  {
    sectorID: 1,
    name: "Experience",
    linkedEmail: "mc@ae.com",
    fileType: "txt",
    division: "Water",
    imageLoc: "blah/blah",
    description: "I'm the best so I don't need to have any experience",
  },
  {
    sectorID: 2,
    name: "Projects",
    linkedEmail: "mc@ae.com",
    fileType: "txt",
    division: "Air",
    imageLoc: null,
    description: "I'm the best so I don't need to have any projects",
  },
];

var sampleuser = {
  applicationUserId: 1,
  firstName: "Michael",
  lastName: "Chung",
  emailAddress: "mc@ae.com",
};

// var curruser = {};

var resume = [];

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currsector: undefined,
      sectors: resume,
      // user: sampleuser
      user: {},
    };
  }

  componentDidMount() {
    const curruser = axios.get(`/api/user/${this.props.userID}/`);
    this.setState({ user: curruser });
    axios
      .get(`/api/user/${this.props.userID}/resume`)
      .then((res) => {
        resume = res.data.sectors;
        this.setState({ sectors: resume });
      })
      .catch((err) => console.log(err));
  }

  handleUpdate() {
    axios
      .get(`/api/user/${this.props.userID}/resume`)
      .then((res) => {
        resume = res.data.sectors;
        this.setState({ sectors: resume });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    console.log(this.state.sectors);
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
    };

    axios
      .post(`/api/user/${this.props.userID}/resume/sector`, newsector)
      .then((res) => {
        this.handleUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Added " + newsector.name);
  }

  deleteSector(sector) {
    const url = `/api/user/${this.props.userID}/resume/sector/${sector.sectorID}`;
    axios.delete(url).then((res) => {
      this.handleUpdate();
    });
    console.log("Deleted " + sector.name);
  }

  saveSector(sectorid, sectorname, sectorcontent) {
    var oldsector = resume[resume.findIndex((e) => e.sectorID === sectorid)];
    oldsector.name = sectorname;
    oldsector.description = sectorcontent;
    const url = `/api/sector/${oldsector.sectorID}`;
    axios
      .put(url, oldsector)
      .then((res) => {
        this.handleUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Saved" + sectorid);
  }

  render() {
    return (
      <div className="page">
        <div className="nav-bar">
          <NavigatorBar></NavigatorBar>
        </div>
        <div className="resume-page">
          <div className="resume-builder">
            <ResumeBuilder
              sectors={this.state.sectors}
              addSector={(
                sectorname,
                sectordivision,
                filetype,
                imageloc,
                sectordescription
              ) => {
                this.addSector(
                  sectorname,
                  sectordivision,
                  filetype,
                  imageloc,
                  sectordescription
                );
              }}
              deleteSector={(sector) => {
                this.deleteSector(sector);
              }}
              selectSector={(sectorid) => {
                this.selectSector(sectorid);
              }}
            ></ResumeBuilder>
          </div>
          <div className="sector-editor">
            <div>
              {this.state.currsector && (
                <SectorEditor
                  sector={this.state.currsector}
                  saveSector={(sectorid, sectorname, sectorcontent) => {
                    this.saveSector(sectorid, sectorname, sectorcontent);
                  }}
                ></SectorEditor>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Resume.propTypes = {};

function mapStateToProps(state) {
  return {
    userID: state.loginReducer.uid,
    email: state.loginReducer.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSector: (sectorID, proposalId) => {
      dispatch({
        type: "DELETE_SECTOR",
        sectorID: sectorID,
        proposalId: proposalId,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Resume);
